import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"
import { useAppContext } from "../context/globalContext"
import { Results } from "../types"
import QuestionResult from "../components/QuestionResult"
import TopList from "../components/TopList"
import ResultStyles from "../styles/Results.module.css"

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
    <div>
      <h2>Resultat för {activeUser.name}</h2>
      <p>Du fick {activeUser.points} poäng!</p>

      <h2 onClick={() => setShowQuestions(!showQuestions)}>
        Frågor
        <span className={ResultStyles.arrow}>▼</span>
      </h2>
      {showQuestions ? (
        <div>
          {questions.map((question, index) => (
            <div key={question._uid}>
              <h3>Fråga {index + 1}</h3>
              <QuestionResult question={question} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      <h2 onClick={() => setShowTopList(!showTopList)}>
        Topplista {quiz}
        <span className={ResultStyles.arrow}>▼</span>
      </h2>
      {showTopList ? (
        <div>
          <TopList list={topList} id={id} />
        </div>
      ) : (
        ""
      )}
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
