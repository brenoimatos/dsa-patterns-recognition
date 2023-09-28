import { NextApiRequest, NextApiResponse } from "next";
import { getUserCount } from "../../lib/api/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await getUserCount()
        res.status(200).json({ results })
    } catch(e: any) {
        res.status(500).json({ error: e.message })
    }
}