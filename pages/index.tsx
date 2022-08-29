import { NextPage, GetStaticProps } from 'next'
import homeStyles from '../styles/home.module.css'
import Storyblok from '../lib/storyblok'
import { GetData, Story } from '../types'
import { useAppContext } from '../context/globalContext'
import React, { useState } from 'react'
import ChooseQuiz from '../components/ChooseQuiz'
import QuizStart from '../components/QuizStart'

const Home: NextPage<{ stories: Story[] }> = ({ stories }) => {
  const [inputName, setInputName] = useState<string>('')
  const [showStart, setShowStart] = useState<boolean>(true)

  const quizTopics = stories.map((story) => story.name)

  const { setUserName } = useAppContext()

  const startQuiz = (event: React.FormEvent): void => {
    event.preventDefault()
    setShowStart(false)
    setUserName(inputName)
  }

  return (
    <div className={homeStyles.container}>
      {showStart ? (
        <>
          <QuizStart
            setInputName={setInputName}
            inputName={inputName}
            startQuiz={startQuiz}
          />
          <div className={homeStyles.square}></div>
        </>
      ) : (
        <>
          <ChooseQuiz quizTopics={quizTopics} />
          <div className={homeStyles.square2}></div>
          <div className={homeStyles.square3}></div>
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data }: GetData = await Storyblok.get(`cdn/stories/`)

  return {
    props: {
      stories: data ? data.stories : null,
    },
  }
}

export default Home
