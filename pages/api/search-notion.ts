import type { NextApiRequest, NextApiResponse } from 'next'

import * as types from '../../lib/types'
import { search } from '../../lib/notion'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  const searchParams: types.SearchParams = req.body
  const q = (searchParams as any)?.query ?? ''
  if (typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({ error: 'query is required' })
  }
  if (q.length > 256) {
    return res.status(400).json({ error: 'query too long' })
  }

  try {
    const results = await search(searchParams)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
    )
    return res.status(200).json(results)
  } catch (err) {
    console.error('api/search-notion error', err)
    return res.status(500).json({ error: 'internal error' })
  }
}
