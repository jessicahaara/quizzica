import { FunctionComponent, MutableRefObject, useEffect, useRef } from 'react'
import Heading from './Heading'
import styles from './chooseQuiz.module.css'
import Link from 'next/link'
import { gsap } from 'gsap'

interface Props {
  quizTopics: string[]
}

const ChooseQuiz: FunctionComponent<Props> = ({ quizTopics }) => {
  const categoryGrid = useRef() as MutableRefObject<HTMLDivElement>
  const categoryBox = gsap.utils.selector(categoryGrid)

  useEffect(() => {
    gsap.from(categoryBox('div'), { duration: 1, scale: 0, stagger: 0.3 })
  })

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
    <div className={styles.container}>
      <Heading type="h1">QUIZZICA</Heading>
      <Heading type="h3">Välj kategori</Heading>
      <p className={styles.text}>
        Kommer förmodligen gå lika dåligt vilken du än väljer
      </p>

      <div className={styles.grid} ref={categoryGrid}>
        {quizTopics.map((topic, index) => {
          setColor()

          return (
            <Link href={`/${topic.toLowerCase()}`} key={index}>
              <div
                className={`${styles.gridBox} ${styles[colors[colorNumber]]}`}
              >
                <p>{topic}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ChooseQuiz
