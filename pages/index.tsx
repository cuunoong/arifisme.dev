import { GetStaticProps } from 'next'
import React from 'react'
import About from '../components/about'
import Comments from '../components/comments'
import Footer from '../components/footer'
import Header from '../components/header'
import Hero from '../components/hero'
import Lessons from '../components/lessons'
import Comment, { CommentData } from '../models/comment'
import Lesson, { LessonData } from '../models/lesson'

function Index({
  lessons = [],
  comments = [],
}: {
  lessons: LessonData[]
  comments: CommentData[]
}) {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lessons lessons={lessons} />
        <About />
        <Comments comments={comments} />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const lessons = await Lesson.getInstance().getAll()
  const comments = await Comment.getInstance().getAll({ limit: 9 })
  return {
    props: {
      lessons,
      comments,
    },
  }
}

export default Index
