import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React, { useEffect } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Lesson, { LessonData, LessonTag } from '../models/lesson'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getGithubUrl } from '../utils/github'
import dynamic from 'next/dynamic'
import TagIcon from '../components/tag-icon'
import translate from '../utils/translate'
import { increment } from 'firebase/firestore'
import hljs from '../utils/hljs'

// pligins
import emoji from 'remark-emoji'
import gfm from 'remark-gfm'
const remarkPlugins = [emoji, gfm]
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
      totalCloned: increment(1),
    })
    document
      .querySelectorAll('pre code')
      .forEach((el) => hljs.highlightElement(el as HTMLElement))
  }, [])
  return (
    <>
      <Header
        title={lesson.title as string}
        description={
          (locale == 'en'
            ? lesson.sortDescription?.en
            : lesson.sortDescription?.id) as string
        }
        image={lesson.image as string}
      />
      <main className="mx-auto px-6 pt-12 md:mt-24 md:max-w-2xl md:px-2 xl:max-w-7xl">
        <div className="prose prose-slate mx-auto pt-12  prose-a:text-brand dark:prose-invert md:pt-0 xl:prose-lg">
          <div className="flex w-full items-center justify-between">
            <div className="top-0 right-0 flex space-x-3">
              {lesson.tags?.map((tag, index) => (
                <TagIcon tag={tag as LessonTag} key={index} />
              ))}
            </div>
            <a
              href={lesson.githubURL as string}
              className="text-sm"
              target={'_blank'}
            >
              {translate(locale).github}
            </a>
          </div>
          <div className="markdown-body !bg-transparent">
            {<MDXRemote components={components} {...datas} />}
          </div>
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
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as { 'lesson-id': string }

  const locale = context.locale || 'id'

  const lesson = await Lesson.getInstance().get(params['lesson-id'])

  if (!lesson) return { notFound: true }

  const text = await (
    await fetch(
      getGithubUrl(
        lesson?.id as string,
        `/.github/README${locale == 'id' ? '-id' : ''}.md`
      )
    )
  ).text()

  const datas = await serialize(text, {
    mdxOptions: { remarkPlugins },
  })

  return {
    props: {
      lesson,
      datas,
      locale,
    },
    revalidate: 10,
  }
}

export default LessonId
