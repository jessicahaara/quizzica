import type { NextPage, GetStaticProps } from "next"
import styles from "../styles/Home.module.css"
import Storyblok from "../lib/storyblok"
import { GetData, Story } from "../types"
import Link from "next/link"
import { useAppContext } from "../context/global-context"
import React, { useState } from "react"

const Home: NextPage<{ stories: Story[] }> = ({ stories }) => {
  const [homeStory] = stories.filter((story) => story.slug === "home")

  const [inputName, setInputName] = useState<string>("")
  const [showStart, setShowStart] = useState<boolean>(false)

  const quizStories = stories
    .filter((story) => story.name !== "Home")
    .map((story) => story.name)

  const { setUserName } = useAppContext()

  const startQuiz = (event: React.FormEvent): void => {
    event.preventDefault()
    setShowStart(true)
    setUserName(inputName)
  }

  return (
    <div className={styles.container}>
      {!showStart ? (
        <>
          <h1>{homeStory.content.title}</h1>
          <h2>{homeStory.content.text}</h2>
          <form onSubmit={startQuiz} className={styles.form}>
            <label htmlFor='name'>Vad heter du?</label>
            <input
              type='text'
              id='name'
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              required
              autoComplete='off'
            />
            {inputName.length > 0 ? <input type='submit'></input> : ""}
          </form>
        </>
      ) : (
        <>
          <h1>Hej {inputName}!</h1>
          <p>{homeStory.content.text_2}</p>
          {quizStories.map((story, index) => (
            <Link href={`/${story.toLowerCase()}`} key={index}>
              <p>{story}</p>
            </Link>
          ))}
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
