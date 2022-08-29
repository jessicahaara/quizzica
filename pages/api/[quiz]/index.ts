import type { NextApiRequest, NextApiResponse } from 'next'
import { Results } from '../../../types'
import db from "../../../utils/db"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const quiz = req.query.quiz as string
    const resultCollection = db.collection(quiz)

    switch (req.method) {
      case "GET":
        const results = await resultCollection.orderBy("points", "desc").limit(10).get()

        if (results.empty) {
          return 404
        }
        let items: Results[] = []

        results.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          items.push(data as Results)
        })

        res.send(items)
        break

      case "POST":
        const userObj = req.body.send
        const resultAdd = await resultCollection.add(userObj)
        res.send({ id: resultAdd.id })
        break

      default:
        console.log("Ogiltigt request")
    }
  } catch (e) {
    res.status(400).end()
  }
}
