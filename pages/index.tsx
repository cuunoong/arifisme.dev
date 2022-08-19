import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import About from '../components/about'
import Comments from '../components/comments'
import Footer from '../components/footer'
import Header from '../components/header'
import Hero from '../components/hero'
import Lessons from '../components/lessons'
import Comment, { CommentData } from '../models/comment'
import Lesson, { LessonData } from '../models/lesson'

interface Props {
  lessons: LessonData[]
  comments: CommentData[]
}

const Index: NextPage<Props> = ({ lessons, comments }) => {
  const [currentLessons, setCurrentLessons] = useState<LessonData[]>(lessons)
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lessons
          lessons={currentLessons}
          addMoreLesson={(l) => {
            setCurrentLessons((c) => [...c, ...l])
          }}
        />
        <About />
        <Comments comments={comments} />
      </main>
      <Footer />
    </>
  )
}

Index.getInitialProps = async () => {
  const lessons = await Lesson.getInstance().getAll({ limit: 3 })
  const comments = await Comment.getInstance().getAll({ limit: 9 })
  return {
    lessons,
    comments,
  }
}

export default Index
