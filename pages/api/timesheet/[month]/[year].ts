import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { OK } from '../../../../api'
import moment from 'moment'

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
      const queryResponse = await notion.databases.query({
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
          description: properties['Action/Pekerjaan'].title
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

    var activityList = []

    for (
      let index = 0;
      index <= lastDayActivityDate!.diff(firstDayActivityDate, 'day');
      index++
    ) {
      activityList.push({
        date: firstDayActivityDate
          .clone()
          .add(index, 'd')
          .format('DD-MMM-YYYY'),
      })
    }

    res.json(activityList)
  } catch (error) {}
}
