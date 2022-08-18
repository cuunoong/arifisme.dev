import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React, { useEffect } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Lesson, { LessonData } from '../models/lesson'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getGithubUrl } from '../utils/github'
import dynamic from 'next/dynamic'
import TagIcon from '../components/tag-icon'
import translate from '../utils/translate'
const components = {
  img: dynamic(() => import('../components/md/image')),
}

function LessonId({
  lesson,
  datas,
  locale,
}: {
  lesson: LessonData
  datas: MDXRemoteSerializeResult
  locale: string
}) {
  useEffect(() => {
    Lesson.getInstance().update({
      id: lesson.id,
      totalCloned: (lesson.totalCloned || 0) + 1,
    })
  }, [])
  return (
    <>
      <Header title={lesson.title} description={lesson.sortDescription} />
      <main className="mx-auto px-6 pt-12 md:mt-24 md:max-w-2xl md:px-2 xl:max-w-7xl">
        <div className="prose prose-slate mx-auto pt-12 prose-a:text-brand dark:prose-invert md:pt-0 lg:prose-lg">
          <div className="flex w-full items-center justify-between">
            <div className="top-0 right-0 flex space-x-3 p-2">
              {lesson.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-lg dark:bg-slate-600"
                >
                  <TagIcon tag={tag} />
                </span>
              ))}
            </div>
            <a href={lesson.githubURL} className="text-sm" target={'_blank'}>
              {translate(locale).github}
            </a>
          </div>
          {<MDXRemote components={components} {...datas} />}
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: { ['lesson-id']: string }; locale: string }[] = []

  const lessons = await Lesson.getInstance().getAll()

  for (const locale of locales as string[]) {
    lessons.forEach((lesson) => {
      paths.push({ params: { 'lesson-id': lesson.id }, locale })
    })
  }

  return {
    paths: paths,
    fallback: true, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as { 'lesson-id': string }

  const locale = context.locale || 'id'

  const lesson = await Lesson.getInstance().get(params['lesson-id'])

  const text = await (
    await fetch(
      getGithubUrl(
        lesson?.id as string,
        `/.github/README${locale == 'id' ? '-id' : ''}.md`
      )
    )
  ).text()

  const datas = await serialize(text)

  return {
    props: {
      lesson,
      datas,
      locale,
    },
  }
}

export default LessonId
