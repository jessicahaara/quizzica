import Heading from './Heading'
import NameForm from './NameForm'
import { FunctionComponent } from 'react'
import QuizStartStyles from './QuizStart.module.css'

interface Props {
  title: string
  text: string
  setInputName: (inputName: string) => void
  inputName: string
  startQuiz: (event: React.FormEvent) => void
}

const QuizStart: FunctionComponent<Props> = ({
  title,
  text,
  setInputName,
  inputName,
  startQuiz,
}) => {
  return (
    <>
      <div className={QuizStartStyles.textContent}>
        <Heading type="h2">{text}</Heading>
        <Heading type="h1">{title}</Heading>
      </div>
      <NameForm
        setInputName={setInputName}
        inputName={inputName}
        startQuiz={startQuiz}
      />
    </>
  )
}

export default QuizStart
