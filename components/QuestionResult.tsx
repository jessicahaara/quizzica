import { FunctionComponent } from "react"
import { Question } from "../types"
import ResultStyles from "../styles/Results.module.css"

interface Props {
  question: Question
}

const QuestionResult: FunctionComponent<Props> = ({ question }) => {
  const [rightAnswer] = question.options
    .filter((option) => option.right_answer)
    .map((op) => op.option_value)

  return (
    <div>
      <h4>{question.question}</h4>

      {question.options.map((option) => (
        <p
          key={option._uid}
          className={`${
            rightAnswer === option.option_value ? ResultStyles.rightAnswer : ""
          } ${
            question.answer === option.option_value
              ? ResultStyles.UserAnswer
              : ""
          }`}
        >
          {option.option_value}
        </p>
      ))}
    </div>
  )
}

export default QuestionResult
