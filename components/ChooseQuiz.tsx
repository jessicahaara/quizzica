import { FunctionComponent } from 'react'
import Heading from './Heading'
import ChooseQuizStyles from './ChooseQuiz.module.css'
import Link from 'next/link'

interface Props {
  title: string
  quizStories: string[]
  text: string
}

const ChooseQuiz: FunctionComponent<Props> = ({ title, quizStories, text }) => {
  let colorNumber = -1
  const colors = ['lightBlue', 'red', 'yellow']
  const setColor = () => {
    if (colorNumber === 2) {
      colorNumber = 0
    } else {
      colorNumber++
    }
  }

  return (
    <div className={ChooseQuizStyles.content}>
      <Heading type="h1">{title}</Heading>
      <p>{text}</p>

      <div className={ChooseQuizStyles.grid}>
        {quizStories.map((story, index) => {
          setColor()

          return (
            <Link href={`/${story.toLowerCase()}`} key={index}>
              <div
                className={`${ChooseQuizStyles.container} ${
                  ChooseQuizStyles[colors[colorNumber]]
                }`}
              >
                <p>{story}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ChooseQuiz
