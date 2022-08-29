import { FunctionComponent } from 'react'
import Heading from './Heading'
import Link from 'next/link'
import seeResultsStyles from './seeResults.module.css'
import { useAppContext } from '../context/globalContext'

interface Props {
  storySlug: string
}

const SeeResults: FunctionComponent<Props> = ({ storySlug }) => {
  const { id } = useAppContext()
  return (
    <div className={seeResultsStyles.container}>
      <div className={seeResultsStyles.content}>
        <Heading type="h2">Okej... det gick ju sådär.</Heading>
        <Link href={{ pathname: '/results', query: { quiz: storySlug, id } }}>
          <p>SE RESULTAT</p>
        </Link>
      </div>
    </div>
  )
}

export default SeeResults
