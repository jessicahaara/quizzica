import { FunctionComponent, ReactNode } from 'react'
import HeadingStyle from './Heading.module.css'

interface Props {
  type: 'h1' | 'h2' | 'h3' | 'h4'
  color?: string
  children: ReactNode
}

const Heading: FunctionComponent<Props> = ({
  type,
  children,
  color,
  ...props
}) => {
  const Component = type ? type : 'h2'

  return (
    <Component
      className={`${HeadingStyle[type]} ${color ? HeadingStyle[color] : ''}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Heading
