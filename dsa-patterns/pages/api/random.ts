import { NextApiRequest, NextApiResponse } from "next";
import { getRandomQuestion } from "../../lib/api/question";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await getRandomQuestion()
        res.status(200).json({ results })
    } catch(e: any) {
        res.status(500).json({ error: e.message })
    }
}