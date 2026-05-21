import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || 'language:typescript stars:>1000'
  const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&per_page=10`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
  const data = await res.json()
  return NextResponse.json(data.items || [])
}
