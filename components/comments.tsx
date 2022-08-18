import React from 'react'
import { CommentData } from '../models/comment'
import Comment from './comment'

function Comments({ comments }: { comments: CommentData[] }) {
  return (
    <section className="relative mx-auto mt-16  px-6  md:mt-24 md:max-w-2xl md:px-2  xl:max-w-7xl ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
        <div className="block  space-y-4 md:space-y-6 lg:space-y-8">
          <GetComments comments={comments} index={0} />
        </div>
        <div className="hidden space-y-4 md:block md:space-y-6 lg:space-y-8 ">
          <GetComments comments={comments} index={1} />
        </div>
        <div className="hidden space-y-4 md:space-y-6 lg:space-y-8 xl:block ">
          <GetComments comments={comments} index={2} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 dark:from-black "></div>
    </section>
  )
}

const GetComments = ({
  index,
  comments,
}: {
  index: number
  comments: CommentData[]
}) => (
  <>
    <Comment comment={comments[index]} />
    <Comment comment={comments[index + 3]} />
    <Comment comment={comments[index + 6]} />
  </>
)

export default Comments
