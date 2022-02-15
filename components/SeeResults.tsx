import { FunctionComponent } from 'react'
import Heading from './Heading'
import Link from 'next/link'
import SeeResultsStyles from './SeeResults.module.css'

interface Props {
  storySlug: string
}

const SeeResults: FunctionComponent<Props> = ({ storySlug }) => {
  return (
    <div className={SeeResultsStyles.container}>
      <Heading type="h2">Okej... det gick ju sådär.</Heading>
      <Link href={{ pathname: '/results', query: { quiz: storySlug } }}>
        <p>SE RESULTAT</p>
      </Link>
    </div>
  )
}

export default SeeResults
