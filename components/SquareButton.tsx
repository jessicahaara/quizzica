import { FunctionComponent, ReactNode } from 'react'
import squareButtonStyles from './squareButton.module.css'

interface Props {
  children: ReactNode
}

const SquareButton: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <button className={squareButtonStyles.lightBlue} {...props}>
      {children}
    </button>
  )
}

export default SquareButton
