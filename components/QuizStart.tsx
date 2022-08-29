import Heading from './Heading'
import NameForm from './NameForm'
import { FunctionComponent } from 'react'
import styles from './quizStart.module.css'

interface Props {
  setInputName: (inputName: string) => void
  inputName: string
  startQuiz: (event: React.FormEvent) => void
}

const QuizStart: FunctionComponent<Props> = ({
  setInputName,
  inputName,
  startQuiz,
}) => {
  return (
    <div className={styles.container}>
      <Heading type="h2">Sveriges tråkigaste frågesport</Heading>
      <Heading type="h1"></Heading>

      <NameForm
        setInputName={setInputName}
        inputName={inputName}
        startQuiz={startQuiz}
      />
    </div>
  )
}

export default QuizStart
