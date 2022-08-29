import { FunctionComponent } from 'react'
import { Question } from '../types'
import questionResultStyles from './questionResult.module.css'
import Heading from './Heading'

interface Props {
  question: Question
  number: number
}

const QuestionResult: FunctionComponent<Props> = ({ question, number }) => {
  const [rightAnswer] = question.options
    .filter((option) => option.right_answer)
    .map((op) => op.option_value)

  return (
    <div className={questionResultStyles.container}>
      <Heading type="h4">
        {number}. {question.question}
      </Heading>

      <div className={questionResultStyles.grid}>
        {question.options.map((option) => (
          <p
            key={option._uid}
            className={`${
              rightAnswer === option.option_value
                ? questionResultStyles.rightAnswer
                : ''
            } ${
              question.answer === option.option_value
                ? questionResultStyles.userAnswer
                : ''
            }`}
          >
            {option.option_value}
          </p>
        ))}
      </div>
    </div>
  )
}

export default QuestionResult
