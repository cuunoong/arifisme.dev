import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LessonData, LessonTag } from '../models/lesson'
import TagIcon from './tag-icon'

function Card({ lesson }: { lesson: LessonData }) {
  const router = useRouter()
  return (
    <Link href={`/${lesson.id}`}>
      <a className="card flex flex-col rounded-[24px] border border-dashed bg-white p-3 transition-shadow dark:border-white/20 dark:bg-black md:p-4 xl:rounded-[32px]">
        <div className="relative w-full overflow-hidden rounded-2xl pt-[75%]">
          <img
            src={lesson.image as string}
            alt={lesson.title as string}
            className="absolute inset-0 min-h-full min-w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1 p-2 pt-4 md:space-y-2 md:p-4 md:pb-2">
            <h5 className="text-2xl font-medium leading-[1.02]">
              {lesson.title}
            </h5>
            <p className="text-sm leading-[1.6]">
              {router.locale == 'en'
                ? lesson.sortDescription?.en
                : lesson.sortDescription?.id}
            </p>
            <div className="flex space-x-3 pt-4">
              {lesson.tags?.map((tag, index) => (
                <TagIcon key={index} tag={tag as LessonTag} />
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
