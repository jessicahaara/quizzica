import SquareButton from '../components/SquareButton'
import { FunctionComponent } from 'react'
import NameFormStyles from './NameForm.module.css'

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
    <form onSubmit={startQuiz} className={NameFormStyles.form}>
      <label htmlFor="name">DITT JÄVLA NAMN</label>
      <input
        type="text"
        id="name"
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
        required
        autoComplete="off"
      />

      {inputName.length > 0 ? (
        <SquareButton>&#8600;</SquareButton>
      ) : (
        <div className={NameFormStyles.buttonDiv}></div>
      )}
    </form>
  )
}

export default NameForm
