import { useRouter } from 'next/router'
import React from 'react'
import { getGithubUrl } from '../../utils/github'

function Image({ src, ...other }: { src?: string }) {
  const router = useRouter()
  let url = ''
  try {
    new URL(src as string)
    url = src as string
  } catch (error) {
    url = getGithubUrl(router.query['lesson-id'] as string, src as string)
  }
  return <img {...other} src={url} className="rounded" />
}

export default Image
