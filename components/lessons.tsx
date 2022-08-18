import React from 'react'
import { LessonData } from '../models/lesson'
import Button from './button'
import Card from './card'

function Lessons({ lessons }: { lessons: LessonData[] }) {
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
      <Button className="mx-auto">See more</Button>
    </section>
  )
}

export default Lessons
