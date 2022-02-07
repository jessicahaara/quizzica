import { GetServerSideProps, NextPage } from "next"
import { Results } from "../types"

interface Props {
  results: Results[]
  quiz: string
}

const Results: NextPage<Props> = ({ results, quiz }) => {
  return (
    <div>
      <h2>Results</h2>
      {JSON.stringify(results)}
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
