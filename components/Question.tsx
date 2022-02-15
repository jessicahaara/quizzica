import { FunctionComponent, useState, useEffect } from 'react'
import { Question } from '../types'
import Heading from './Heading'
import QuestionStyles from './Question.module.css'
import SeeResults from './SeeResults'

interface Props {
  question: Question
  answerQuestion: (chosenOption: string, seconds: number) => void
  index: number
  questionAmount: number
  storySlug: string
}

const Question: FunctionComponent<Props> = ({
  question,
  answerQuestion,
  index,
  questionAmount,
  storySlug,
}) => {
  const [seeResults, setSeeResults] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(20)

  useEffect(() => {
    if (!timeLeft) {
      answerQuestion('inget svar', timeLeft)
      if (index + 1 === questionAmount) {
        setSeeResults(true)
        return
      }
      setTimeLeft(20)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  const percent = !seeResults ? (index / questionAmount) * 100 : 100

  const sendResult = (option: string): void => {
    answerQuestion(option, timeLeft)
    setTimeLeft(20)
    if (index + 1 === questionAmount) {
      setSeeResults(true)
    }
  }

  let timerColor = 'lightBlue'

  switch (true) {
    case timeLeft <= 10 && timeLeft > 5:
      timerColor = 'yellow'
      break
    case timeLeft <= 5:
      timerColor = 'red'
      break
    default:
      break
  }

  return (
    <div className={QuestionStyles.container}>
      {!seeResults ? (
        <>
          <Heading type="h2">{question.question}</Heading>
          <div className={QuestionStyles.grid}>
            {question.options.map((option) => (
              <div
                className={QuestionStyles.option}
                key={option._uid}
                onClick={() => sendResult(option.option_value)}
              >
                <p>{option.option_value}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <SeeResults storySlug={storySlug} />
      )}
      <div className={QuestionStyles.border}>
        <div
          className={QuestionStyles.progress}
          style={{ transform: `translateX(${percent}%)` }}
          role="progressbar"
        ></div>
      </div>
      <div className={QuestionStyles.square}>
        {!seeResults && (
          <>
            <div
              className={`${QuestionStyles.timer} ${QuestionStyles[timerColor]}`}
            >
              <p>{timeLeft}</p>
            </div>
            <Heading type="h3">Fråga {index + 1}</Heading>
          </>
        )}
      </div>
      <div className={QuestionStyles.square2}></div>
    </div>
  )
}

export default Question
