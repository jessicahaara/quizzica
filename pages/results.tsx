import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { useAppContext } from '../context/globalContext'
import { Results } from '../types'
import QuestionResult from '../components/QuestionResult'
import TopList from '../components/TopList'
import ResultStyles from '../styles/Results.module.css'
import Heading from '../components/Heading'

interface Props {
  results: Results[]
  quiz: string
}

const Results: NextPage<Props> = ({ results, quiz }) => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false)
  const [showTopList, setShowTopList] = useState<boolean>(false)

  const { id, questions } = useAppContext()

  const [activeUser] = results.filter((user) => user.id === id)

  const topList = []
  for (let i = 0; i < 10; i++) {
    if (results[i]) {
      topList.push(results[i])
    }
  }

  return (
    <div className={ResultStyles.container}>
      <div className={ResultStyles.square}>
        <Heading type="h1">
          Du fick <br />
          {activeUser.points} poäng!
        </Heading>
        <p
          className={ResultStyles.dropDown}
          onClick={() => setShowQuestions(!showQuestions)}
        >
          Frågor
          <span className={ResultStyles.arrow}>▼</span>
        </p>
        {showQuestions ? (
          <div className={ResultStyles.scrollDiv}>
            {questions.map((question, index) => (
              <div key={question._uid}>
                <QuestionResult question={question} />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        <p
          className={ResultStyles.dropDown}
          onClick={() => setShowTopList(!showTopList)}
        >
          Topplista {quiz}
          <span className={ResultStyles.arrow}>▼</span>
        </p>
        {showTopList ? (
          <div className={ResultStyles.scrollDiv}>
            <TopList list={topList} id={id} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={ResultStyles.square2}></div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${query.quiz}`)
    const results: Results[] = await response.json()

    return { props: { results, quiz: query.quiz } }
  } catch {
    return { props: {} }
  }
}

export default Results
