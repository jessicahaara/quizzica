import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import Storyblok from '../lib/storyblok'
import { GetData, QuizStory, Params } from '../types'
import Question from '../components/Question'
import { useAppContext } from '../context/globalContext'

const Quiz: NextPage<{ story: QuizStory }> = ({ story }) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0)

  const questions = story.content.question

  const { name, setQuizQuestions, setUserId } = useAppContext()

  const countPoints = (): number => {
    let points = 0
    questions.forEach((question) => {
      points += question.points ? question.points : 0
    })

    return points
  }

  const answerQuestion = async (
    chosenOption: string,
    seconds: number
  ): Promise<void> => {
    const [rightAnswer] = questions[questionIndex].options.filter(
      (option) => option.right_answer
    )

    let points = 10
    switch (true) {
      case seconds >= 17:
        points += 5
        break
      case seconds < 17 && seconds >= 14:
        points += 4
        break
      case seconds < 14 && seconds >= 11:
        points += 3
        break
      case seconds < 11 && seconds >= 8:
        points += 2
        break
      case seconds < 8 && seconds >= 4:
        points += 1
        break
      default:
        points += 0
    }

    questions[questionIndex].points =
      rightAnswer.option_value === chosenOption ? points : 0

    questions[questionIndex].answer = chosenOption

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setQuizQuestions(questions)
      const id = await postResult()
      setUserId(id)
    }
  }

  const postResult = async (): Promise<string> => {
    try {
      const response = await fetch(`http://localhost:3000/api/${story.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <Question
        question={questions[questionIndex]}
        answerQuestion={answerQuestion}
        index={questionIndex}
        questionAmount={questions.length}
        storySlug={story.slug}
      />
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
  let { data }: GetData = await Storyblok.get('cdn/stories/')

  const stories = data.stories.filter((story) => story.slug !== 'home')

  return {
    paths: stories.map((story) => {
      return { params: { slug: story.slug } }
    }),
    fallback: false,
  }
}

export default Quiz
