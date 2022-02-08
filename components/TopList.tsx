import { FunctionComponent } from "react"
import ResultsStyles from "../styles/Results.module.css"
import { Results } from "../types"

interface Props {
  list: Results[]
  id: string
}

const TopList: FunctionComponent<Props> = ({ list, id }) => {
  return (
    <div>
      {list.map((listItem, index) => (
        <p
          className={id === listItem.id ? ResultsStyles.current : ""}
          key={listItem.id}
        >
          {index + 1}. {listItem.name}, {listItem.points} poäng.
        </p>
      ))}
    </div>
  )
}

export default TopList
