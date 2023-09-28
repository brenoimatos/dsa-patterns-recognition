import { NextApiRequest, NextApiResponse } from "next";
import { getQuestions } from "../../lib/api/question";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await getQuestions()
        res.status(200).json({ results })
    } catch(e: any) {
        res.status(500).json({ error: e.message })
    }
}