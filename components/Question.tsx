import { FunctionComponent } from "react"
import { Question } from "../types"

interface Props {
  question: Question
  answerQuestion: (chosenOption: string) => void
  number: number
}

const Question: FunctionComponent<Props> = ({
  question,
  answerQuestion,
  number,
}) => {
  return (
    <div>
      <h1>Fråga {number}</h1>
      <h2>{question.question}</h2>
      {question.options.map((option) => (
        <p
          key={option._uid}
          onClick={() => answerQuestion(option.option_value)}
        >
          {option.option_value}
        </p>
      ))}
    </div>
  )
}

export default Question
