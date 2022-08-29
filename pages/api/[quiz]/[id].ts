import type { NextApiRequest, NextApiResponse } from 'next'
import { Results } from '../../../types'
import db from "../../../utils/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id  = req.query.id as string
    const quiz = req.query.quiz as string
    const resultDoc = await db.collection(quiz).doc(id).get()

    const userResult = resultDoc.data() as Results
    userResult.id = resultDoc.id

    res.send(userResult)
  } catch (e) {
    res.status(400).end()
  }
}