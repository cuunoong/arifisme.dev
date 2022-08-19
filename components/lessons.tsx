import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import Lesson, { LessonData } from '../models/lesson'
import translate from '../utils/translate'
import Button from './button'
import Card from './card'

function Lessons({
  lessons,
  addMoreLesson,
}: {
  lessons: LessonData[]
  addMoreLesson: (lessons: LessonData[]) => void
}) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const loadMore = useCallback(() => {
    Lesson.getInstance()
      .getAll({
        page: page + 3,
        limit: 1,
        latest: lessons.at(-1)?.totalCloned as number,
      })
      .then((newLessonDatas) => {
        if (newLessonDatas.length == 0) setPage(-1)
        else {
          addMoreLesson(newLessonDatas)
          setPage((p) => p + 1)
        }
      })
  }, [lessons])
  return (
    <section
      className="mb-9 flex flex-col items-center space-y-9 py-12"
      id="lessons"
    >
      <div className="mx-auto grid w-full gap-3 px-6 py-8 md:max-w-2xl md:grid-cols-2 md:px-2  lg:grid-cols-3 xl:max-w-7xl xl:gap-9">
        {lessons.map((lesson, index) => (
          <Card key={index} lesson={lesson} />
        ))}
      </div>
      <Button disabled={page == -1} className="mx-auto" onClick={loadMore}>
        {translate(router.locale).more}
      </Button>
    </section>
  )
}

export default Lessons
