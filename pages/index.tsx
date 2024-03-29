import { GetStaticProps, NextPage, NextPageContext } from 'next'
import React, { useState } from 'react'
import About from '../components/about'
import Comments from '../components/comments'
import Container from '../components/container'
import Hero from '../components/hero'
import Lessons from '../components/lessons'
import Comment, { CommentData } from '../models/comment'
import Lesson, { LessonData } from '../models/lesson'

interface Props {
  comments: CommentData[]
  lessons: LessonData[]
}

const Index: NextPage<Props> = ({ comments, lessons }) => {
  const [currentLessons, setCurrentLessons] = useState<LessonData[]>(lessons)

  return (
    <Container>
      <Hero />
      <Lessons
        lessons={currentLessons}
        addMoreLesson={(l) => {
          setCurrentLessons((c) => [...c, ...l])
        }}
      />
      <About />
      <Comments comments={comments} />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const comments = await Comment.getInstance().getAll({ limit: 9 })
  const lessons = await Lesson.getInstance().getAll({ limit: 3 })

  return {
    props: { comments, lessons },
  }
}

export default Index
