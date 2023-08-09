import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { OK } from '../../../../api'
import moment from 'moment'
const XLSX = require("xlsx");

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
const ACTION_DATABASE_ID = process.env.NOTION_ACTION_DATABASE_ID || ''
const PROJECT_DATABASE_ID = process.env.NOTION_PROJECT_DATABASE_ID || ''
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const month = req.query.month
    const year = req.query.year

    const date = moment(`${year}-${month}-01`)
    const firstDay = date.clone().add(-1, 'day').format('YYYY-MM-DD')
    const lastDay = date.clone().add(1, 'M').format('YYYY-MM-DD')

    var result = []

    var hasMore = true
    var nextCursor = undefined

    while (hasMore) {
      const queryResponse = (
				await notion.databases.query({
					start_cursor: nextCursor,
					sorts: [{ property: 'Tanggal pengerjaan', direction: 'ascending' }],
					database_id: ACTION_DATABASE_ID,
					filter: {
						and: [
							{
								property: 'Tanggal pengerjaan',
								date: {
									after: firstDay,
								},
							},
							{
								property: 'Tanggal pengerjaan',
								date: {
									before: lastDay,
								},
							},
						],
					},
				})
			) as any

      for (var data of queryResponse.results) {
        var { properties } = data as any
        var projects = []

        for (var { id } of properties.Project.relation) {
          const { properties } = (await notion.pages.retrieve({
            page_id: id,
          })) as any
          projects.push(properties.Project.title.map((t: any) => t.plain_text))
        }
        result.push({
          startDate: moment(properties['Tanggal pengerjaan'].date.start),
          endDate:
            properties['Tanggal pengerjaan'].date.end == null
              ? moment(properties['Tanggal pengerjaan'].date.start)
              : moment(properties['Tanggal pengerjaan'].date.end),
          activities: properties['Action/Pekerjaan'].title
            .map((title: any) => title.plain_text)
            .join(', '),
          project: projects.join(', '),
        })
      }

      hasMore = queryResponse.has_more
      if (hasMore) nextCursor = queryResponse.next_cursor!
      else nextCursor = undefined
    }

    if (result.length == 0) return res.json(result)

    var firstDayActivityDate = result[0].startDate

    var lastDayActivityDate: moment.Moment | null = null

    result.forEach(({ startDate, endDate }) => {
      if (lastDayActivityDate == null) {
        if (endDate == null) lastDayActivityDate = startDate
        else lastDayActivityDate = endDate
      } else {
        if (endDate !== null && lastDayActivityDate.isBefore(endDate))
          lastDayActivityDate = endDate
        else if (lastDayActivityDate.isBefore(startDate))
          lastDayActivityDate = startDate
      }
    })

    var activityListPerDate = []

    for (
			let index = 0;
			index <= lastDayActivityDate!.diff(firstDayActivityDate, 'day');
			index++
    ) {
      const today = firstDayActivityDate
				.clone()
				.add(index, 'd');

			const activity = result
				.filter(
					({startDate, endDate}) => {
						return endDate == null 
							? today.isSame(startDate)
							: today.isBetween(startDate.clone().add(-1, 'd'), endDate.clone().add(1, 'd')) 
				}).map(
					({activities, project}) => 
						(
							{	activities, project }
						)
				)
          
      activityListPerDate.push({
				date: today.format('DD-MMM-YYYY'),
				activity
      })
    }

		const activityList = []

		for( const { activity: activities, date } of activityListPerDate) {
			if(activities.length == 0)
				continue;
			
			for(const activity of activities) {
				activityList.push(
					{
						date, 
						startTime: '08.00',
						endTime: '17.00',
						hours: '8 hours',
						desctiotion: activity.activities,
						project: activity.project
					}
				)
			}
			
		}


		const worksheet = XLSX.utils.json_to_sheet(activityList);
		const workbook = XLSX.utils.book_new();
	
		XLSX.utils.book_append_sheet(workbook, worksheet, date.format('MMMM YYYY'));
		XLSX.utils.sheet_add_aoa(worksheet, [["DATE", "START TIME", "END TIME", "HOURS", "DESCRIPTIONS / ACTIVITIES", "PEOJECT" ]], { origin: "A1" });
		
		const buff = XLSX.write(workbook, { type: 'buffer', bookType: "xlsx"})
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
		res.setHeader('Content-disposition', `attachment; filename=Timesheet ${date.format('MMMM YYYY')}.xlsx`)
		res.send(buff)
    res.json(activityList)
  } catch (error) {}
}
