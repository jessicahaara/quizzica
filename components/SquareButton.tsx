import { FunctionComponent, ReactNode } from 'react'
import SquareButtonStyles from './SquareButton.module.css'

interface Props {
  children: ReactNode
}

const SquareButton: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <button className={SquareButtonStyles.lightBlue} {...props}>
      {children}
    </button>
  )
}

export default SquareButton
