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
        <div className="relative">
          <div className="relative w-full overflow-hidden rounded-2xl pt-[75%]">
            <img
              src={lesson.image as string}
              alt={lesson.title as string}
              className="absolute inset-0 min-h-full min-w-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-0 flex space-x-3 p-2">
            {lesson.tags?.map((tag, index) => (
              <span
                key={index}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white "
              >
                <TagIcon tag={tag as LessonTag} />
              </span>
            ))}
          </div>
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
          </div>
          <div className="flex -space-x-4">
            {(lesson.totalCloned || 0) > 0 && (
              <span className="flex aspect-square h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-text text-xs font-semibold text-white dark:border-black">
                {lesson.totalCloned || 0}
              </span>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
