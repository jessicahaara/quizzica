import SquareButton from '../components/SquareButton'
import { FunctionComponent } from 'react'
import styles from './nameForm.module.css'

interface Props {
  inputName: string
  setInputName: (inputName: string) => void
  startQuiz: (event: React.FormEvent) => void
}

const NameForm: FunctionComponent<Props> = ({
  inputName,
  setInputName,
  startQuiz,
}) => {
  return (
    <form onSubmit={startQuiz} className={styles.form}>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
        required
        autoComplete="off"
        placeholder=" "
      />
      <label htmlFor="name">DITT JÄVLA NAMN</label>

      {inputName.length > 0 ? (
        <SquareButton>↘&#xfe0e;</SquareButton>
      ) : (
        <div className={styles.buttonDiv}></div>
      )}
    </form>
  )
}

export default NameForm
