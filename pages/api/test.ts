import { NextApiRequest, NextApiResponse } from 'next'
import Notion from '../../api/notion'
import moment from 'moment'
const XLSX = require('xlsx')
export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = moment(`2023-08-01`)
  const firstDay = date.clone()
  const lastDay = date.clone().add(1, 'M').add(-1, 'day')

  const notion = new Notion()

  const response = await notion.query({
    startDate: firstDay.format('YYYY-MM-DD'),
    endDate: lastDay.format('YYYY-MM-DD'),
  })

  if (response.length == 0) return res.json([])

  var firstDayActivityDate = moment(
    response[0]['Tanggal pengerjaan']['start']
  ).isBefore(firstDay)
    ? firstDay
    : moment(response[0]['Tanggal pengerjaan']['start'])

  var lastDayActivityDate: moment.Moment | null = null

  for (let activity of response) {
    let startActivityDate = moment(activity['Tanggal pengerjaan']['start'])
    let endActivityDate = activity['Tanggal pengerjaan']['end']

    if (lastDayActivityDate == null) {
      if (endActivityDate != null)
        if (moment(endActivityDate).isBefore(lastDay))
          lastDayActivityDate = moment(endActivityDate)
      if (startActivityDate.isBefore(lastDay) && lastDayActivityDate == null)
        lastDayActivityDate = startActivityDate
    } else {
      if (endActivityDate != null)
        if (
          moment(endActivityDate).isBefore(lastDay) &&
          moment(endActivityDate).isAfter(lastDayActivityDate)
        )
          lastDayActivityDate = moment(endActivityDate)
      if (
        startActivityDate.isBefore(lastDay) &&
        startActivityDate.isAfter(lastDayActivityDate)
      )
        lastDayActivityDate = startActivityDate
    }
  }

  var activityListPerDate = []

  for (
    let index = 0;
    index <= lastDayActivityDate!.diff(firstDayActivityDate, 'day');
    index++
  ) {
    const today = firstDayActivityDate.clone().add(index, 'd')
    if (today.weekday() == 6 || today.weekday() == 0) continue
    const activity = response
      .filter(({ 'Tanggal pengerjaan': { start, end } }) => {
        return end == null
          ? today.isSame(moment(start))
          : today.isBetween(
              moment(start).clone().add(-1, 'd'),
              moment(end).clone().add(1, 'd')
            )
      })
      .map(({ 'Action/Pekerjaan': activities, Project: project }) => ({
        activities,
        project,
      }))

    activityListPerDate.push({
      date: today.format('DD-MMM-YYYY'),
      activity,
    })
  }

  return res.json(activityListPerDate)

  // const activityList = []

  // for (const { activity: activities, date } of activityListPerDate) {
  //   if (activities.length == 0) continue

  //   for (const activity of activities) {
  //     activityList.push({
  //       date,
  //       startTime: '08.00',
  //       endTime: '17.00',
  //       hours: '8 hours',
  //       description: activity.activities,
  //       project: activity.project,
  //     })
  //   }
  // }

  // const worksheet = XLSX.utils.json_to_sheet(activityList)
  // const workbook = XLSX.utils.book_new()

  // XLSX.utils.book_append_sheet(workbook, worksheet, date.format('MMMM YYYY'))
  // XLSX.utils.sheet_add_aoa(
  //   worksheet,
  //   [
  //     [
  //       'DATE',
  //       'START TIME',
  //       'END TIME',
  //       'HOURS',
  //       'DESCRIPTIONS / ACTIVITIES',
  //       'PROJECT',
  //     ],
  //   ],
  //   { origin: 'A1' }
  // )

  // const buff = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
  // res.setHeader(
  //   'Content-Type',
  //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  // )
  // res.setHeader(
  //   'Content-disposition',
  //   `attachment; filename=Timesheet ${date.format('MMMM YYYY')}.xlsx`
  // )
  // res.send(buff)
}
