import {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react'
import { Question } from '../types'
import Heading from './Heading'
import styles from './question.module.css'
import SeeResults from './SeeResults'
import { gsap } from 'gsap'

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
  const [animate, setAnimate] = useState<number>(0)

  const tl = gsap.timeline()

  const questionGrid = useRef() as MutableRefObject<HTMLDivElement>
  const optionBox = gsap.utils.selector(questionGrid)
  const questionDiv = useRef() as MutableRefObject<HTMLDivElement>
  const questionHeading = gsap.utils.selector(questionDiv)

  useEffect(() => {
    if (!timeLeft) {
      answerQuestion('inget svar', timeLeft)
      if (index + 1 === questionAmount) {
        setSeeResults(true)
        return
      }
      setAnimate(animate + 1)
      setTimeLeft(20)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  useEffect(() => {
    tl.from(questionHeading('h3, h2'), {
      duration: 0.3,
      y: -20,
    })
    tl.from(optionBox('div'), {
      duration: 0.3,
      opacity: 0,
      y: -10,
      stagger: 0.2,
    })
  }, [animate])

  const percent = !seeResults ? (index / questionAmount) * 100 : 100

  const sendResult = (option: string): void => {
    answerQuestion(option, timeLeft)
    setTimeLeft(20)
    setAnimate(animate + 1)
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
      timerColor = 'lightBlue'
      break
  }

  return (
    <div className={styles.container}>
      {!seeResults ? (
        <div className={styles.questionDiv}>
          <div ref={questionDiv}>
            <Heading type="h2">Fråga {index + 1}</Heading>
            <Heading type="h3">{question.question}</Heading>
          </div>
          <div className={styles.grid} ref={questionGrid}>
            {question.options.map((option) => (
              <div
                className={styles.option}
                key={option._uid}
                onClick={() => sendResult(option.option_value)}
              >
                <p>{option.option_value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SeeResults storySlug={storySlug} />
      )}
      <div className={styles.border}>
        <div
          className={styles.progress}
          style={{ transform: `translateX(${percent}%)` }}
          role="progressbar"
        ></div>
      </div>

      <div className={styles.square}>
        {!seeResults && (
          <>
            <div className={`${styles.timer} ${styles[timerColor]}`}>
              <p>{timeLeft}</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.square2}></div>
    </div>
  )
}

export default Question
