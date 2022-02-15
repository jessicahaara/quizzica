import { FunctionComponent } from 'react'
import { Question } from '../types'
import QuestionResultStyles from './QuestionResult.module.css'
import Heading from './Heading'

interface Props {
  question: Question
}

const QuestionResult: FunctionComponent<Props> = ({ question }) => {
  const [rightAnswer] = question.options
    .filter((option) => option.right_answer)
    .map((op) => op.option_value)

  return (
    <div className={QuestionResultStyles.container}>
      <Heading type="h4">{question.question}</Heading>

      <div className={QuestionResultStyles.grid}>
        {question.options.map((option) => (
          <p
            key={option._uid}
            className={`${
              rightAnswer === option.option_value
                ? QuestionResultStyles.rightAnswer
                : ''
            } ${
              question.answer === option.option_value
                ? QuestionResultStyles.userAnswer
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
