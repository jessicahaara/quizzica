import { NextPage, GetStaticProps } from 'next'
import HomeStyles from '../styles/Home.module.css'
import Storyblok from '../lib/storyblok'
import { GetData, Story } from '../types'
import { useAppContext } from '../context/globalContext'
import React, { useState } from 'react'
import ChooseQuiz from '../components/ChooseQuiz'
import QuizStart from '../components/QuizStart'

const Home: NextPage<{ stories: Story[] }> = ({ stories }) => {
  const [homeStory] = stories.filter((story) => story.slug === 'home')

  const [inputName, setInputName] = useState<string>('')
  const [showStart, setShowStart] = useState<boolean>(true)

  const quizStories = stories
    .filter((story) => story.name !== 'Home')
    .map((story) => story.name)

  const { setUserName } = useAppContext()

  const startQuiz = (event: React.FormEvent): void => {
    event.preventDefault()
    setShowStart(false)
    setUserName(inputName)
  }

  return (
    <div className={HomeStyles.container}>
      {showStart ? (
        <>
          <QuizStart
            title={homeStory.content.title ? homeStory.content.title : 'Quiz'}
            text={
              homeStory.content.text ? homeStory.content.text : 'Detta är ett'
            }
            setInputName={setInputName}
            inputName={inputName}
            startQuiz={startQuiz}
          />
          <div className={HomeStyles.square}></div>
        </>
      ) : (
        <>
          <ChooseQuiz
            title={homeStory.content.title ? homeStory.content.title : 'Quiz'}
            text={
              homeStory.content.text_2
                ? homeStory.content.text_2
                : 'Välj kategori'
            }
            quizStories={quizStories}
          />
          <div className={HomeStyles.square2}></div>
          <div className={HomeStyles.square3}></div>
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
