import { FunctionComponent, LegacyRef, ReactNode } from 'react'
import style from './heading.module.css'

interface Props {
  type: 'h1' | 'h2' | 'h3' | 'h4'
  children?: ReactNode
}

const Heading: FunctionComponent<Props> = ({ type, children, ...props }) => {
  const Component = type ? type : 'h2'

  return (
    <Component className={style[type]} {...props}>
      {children}
    </Component>
  )
}

export default Heading
