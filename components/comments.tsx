import React from 'react'
import { CommentData } from '../models/comment'
import Comment from './comment'

function Comments({ comments }: { comments: CommentData[] }) {
  return (
    <section className="relative mx-auto mt-16  px-6  md:mt-24 md:max-w-2xl md:px-2  xl:max-w-7xl ">
      <div className="hidden grid-cols-3 gap-8 xl:grid">
        <div className="space-y-8">
          <GetComments comments={comments} index={0} />
        </div>
        <div className="space-y-8">
          <GetComments comments={comments} index={1} />
        </div>
        <div className="space-y-8">
          <GetComments comments={comments} index={2} />
        </div>
      </div>
      <div className="hidden grid-cols-2 gap-6  md:grid xl:hidden">
        <div className="space-y-6">
          <GetComments
            comments={comments}
            index={0}
            itemCount={4}
            addition={2}
          />
        </div>
        <div className="space-y-6">
          <GetComments
            comments={comments}
            index={1}
            itemCount={4}
            addition={2}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <div className="space-y-4">
          <GetComments
            comments={comments}
            index={0}
            itemCount={4}
            addition={1}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 dark:from-black "></div>
    </section>
  )
}

const GetComments = ({
  index,
  comments,
  addition = 3,
  itemCount = 3,
}: {
  index: number
  addition?: number
  itemCount?: number
  comments: CommentData[]
}) => (
  <>
    {Array.from(Array(itemCount).keys()).map((_, id) => (
      <Comment comment={comments[index + id * addition]} key={id} />
    ))}
  </>
)

export default Comments
