import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const tweetId = req.query.tweetId as string

  if (!tweetId) {
    return res
      .status(400)
      .send({ error: 'missing required parameter "tweetId"' })
  }

  // Tweets disabled in this deployment. Endpoint not implemented.
  res.status(501).json({ error: 'Tweet AST fetching disabled' })
}
