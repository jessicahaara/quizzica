import { FunctionComponent } from 'react'
import topListStyles from './topList.module.css'
import { Results } from '../types'

interface Props {
  list: Results[]
  id: string
}

const TopList: FunctionComponent<Props> = ({ list, id }) => {
  return (
    <div className={topListStyles.container}>
      {list.map((listItem, index) => (
        <p
          className={id === listItem.id ? topListStyles.current : ''}
          key={listItem.id}
        >
          {index + 1}. {listItem.name}, {listItem.points} poäng.
        </p>
      ))}
    </div>
  )
}

export default TopList
