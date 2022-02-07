import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useState } from "react"
import Storyblok from "../lib/storyblok"
import { GetData, QuizStory, Params } from "../types"
import Question from "../components/Question"
import { useAppContext } from "../context/global-context"
import Link from "next/link"

const Quiz: NextPage<{ story: QuizStory }> = ({ story }) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [showResults, setShowResults] = useState<boolean>(false)

  const questions = story.content.question

  const { name, setQuizQuestions, setUserId } = useAppContext()

  const countPoints = (): number => {
    let points = 0
    questions.forEach((question) => {
      const rightOption = question.options.filter(
        (option) => option.right_answer
      )
      const rightAnswer = rightOption[0].option_value
      if (question.answer === rightAnswer) {
        points++
      }
    })

    return points
  }

  const answerQuestion = async (chosenOption: string): Promise<void> => {
    questions[questionIndex].answer = chosenOption

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setShowResults(true)
      setQuizQuestions(questions)
      const id = await postResult()
      setUserId(id)
    }
  }

  const postResult = async (): Promise<string> => {
    try {
      const response = await fetch(`http://localhost:3000/api/${story.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          send: { name, points: countPoints() },
        }),
      })

      const { id } = await response.json()
      return id
    } catch (error) {
      return (error as Error).message
    }
  }

  return (
    <div>
      {!showResults ? (
        <Question
          question={questions[questionIndex]}
          answerQuestion={answerQuestion}
          number={questionIndex + 1}
        />
      ) : (
        <Link href={{ pathname: "/results", query: { quiz: story.slug } }}>
          <button>Se resultat</button>
        </Link>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params

  let { data } = await Storyblok.get(`cdn/stories/${slug}`)

  return {
    props: {
      story: data ? data.story : null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let { data }: GetData = await Storyblok.get("cdn/stories/")
  console.log(data)

  const stories = data.stories.filter((story) => story.slug !== "home")

  return {
    paths: stories.map((story) => {
      return { params: { slug: story.slug } }
    }),
    fallback: false,
  }
}

export default Quiz
