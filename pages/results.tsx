import { GetServerSideProps, NextPage } from 'next'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/globalContext'
import { Results } from '../types'
import QuestionResult from '../components/QuestionResult'
import TopList from '../components/TopList'
import resultStyles from '../styles/results.module.css'
import Heading from '../components/Heading'
import { gsap } from 'gsap'

interface Props {
  results: Results[]
  quiz: string
  user: Results
}

const Results: NextPage<Props> = ({ results, quiz, user }) => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false)
  const [showTopList, setShowTopList] = useState<boolean>(false)

  const { questions } = useAppContext()

  const scrollDiv = useRef() as MutableRefObject<HTMLDivElement>
  const el = gsap.utils.selector(scrollDiv)

  console.log(user)

  useEffect(() => {
    gsap.from(el('h4, p'), { duration: 1, opacity: 0, y: 10, stagger: 0.05 })
  })

  return (
    <div className={resultStyles.container}>
      <div className={resultStyles.square}>
        <div className={resultStyles.headingDiv}>
          <Heading type="h2">Du fick</Heading>
          <Heading type="h1">{user.points} poäng!</Heading>
          <Heading type="h2">
            {user.correctAnswers}/{questions.length} rätt
          </Heading>
        </div>
        <p
          className={resultStyles.dropDown}
          onClick={() => setShowQuestions(!showQuestions)}
        >
          Frågor
          <span className={resultStyles.arrow}>▼</span>
        </p>
        {showQuestions ? (
          <div className={resultStyles.scrollDiv} ref={scrollDiv}>
            {questions.map((question, index) => (
              <div key={question._uid}>
                <QuestionResult question={question} number={index + 1} />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        <p
          className={resultStyles.dropDown}
          onClick={() => setShowTopList(!showTopList)}
        >
          Topplista {quiz}
          <span className={resultStyles.arrow}>▼</span>
        </p>
        {showTopList ? (
          <div className={resultStyles.scrollDiv} ref={scrollDiv}>
            <TopList list={results} id={user.id} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={resultStyles.square2}></div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${query.quiz}`)
    const results: Results[] = await response.json()
    const userResponse = await fetch(
      `http://localhost:3000/api/${query.quiz}/${query.id}/`
    )
    const user = await userResponse.json()

    return { props: { results, quiz: query.quiz, user } }
  } catch {
    return { props: {} }
  }
}

export default Results
