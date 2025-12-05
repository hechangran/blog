// import ky from 'ky'
// use global fetch available in Next.js 16 on server and client
import pMemoize from 'p-memoize'

import { api } from './config'
import * as types from './types'

export const searchNotion = pMemoize(searchNotionImpl, { maxAge: 10000 })

async function searchNotionImpl(
  params: types.SearchParams
): Promise<types.SearchResults> {
  const q: any = (params as any)?.query
  if (typeof q !== 'string' || q.trim().length === 0) {
    return { results: [] } as any
  }
  try {
    const res = await fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json'
    }
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('searchNotion error', res.status, text)
      return { results: [] } as any
    }

    return (await res.json()) as types.SearchResults
  } catch (err) {
    console.error('searchNotion fetch failed', err)
    return { results: [] } as any
  }

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
  //   .json()
}
