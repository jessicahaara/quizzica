import { FunctionComponent } from 'react'
import TopListStyles from './TopList.module.css'
import { Results } from '../types'
import Heading from './Heading'

interface Props {
  list: Results[]
  id: string
}

const TopList: FunctionComponent<Props> = ({ list, id }) => {
  return (
    <div className={TopListStyles.container}>
      {list.map((listItem, index) => (
        <p
          className={id === listItem.id ? TopListStyles.current : ''}
          key={listItem.id}
        >
          {index + 1}. {listItem.name}, {listItem.points} poäng.
        </p>
      ))}
    </div>
  )
}

export default TopList
