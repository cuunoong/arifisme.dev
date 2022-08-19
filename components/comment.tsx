import { useRouter } from 'next/router'
import React from 'react'
import { CommentData } from '../models/comment'

function Comment({ comment }: { comment?: CommentData }) {
  const router = useRouter()
  return (
    <div className="z-0 flex flex-col space-y-6 rounded-3xl border border-dashed border-[#E5E5E5] bg-white p-6 dark:border-white/25 dark:bg-black">
      <div className="flex items-center space-x-4">
        {comment?.user && (
          <img
            src={comment?.user?.avatar}
            alt={comment?.user?.name}
            className="h-14 w-14 rounded-full"
          />
        )}
        <div>
          <p>{comment?.user?.name}</p>
          <p className="text-sm text-brand">{comment?.user?.job}</p>
        </div>
      </div>
      <p>
        {router.locale === 'en' ? comment?.message?.en : comment?.message?.id}
      </p>
    </div>
  )
}

export default Comment
