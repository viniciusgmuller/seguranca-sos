/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== 'seed-sos-2026-run-once') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sql = await request.text()
    if (!sql || sql.length < 10) {
      return NextResponse.json({ error: 'No SQL provided in body' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const db = payload.db as any
    const pool = db.pool || db.client

    if (!pool) {
      return NextResponse.json({ error: 'No database pool found' }, { status: 500 })
    }

    await pool.query(sql)

    return NextResponse.json({ success: true, message: 'SQL executed successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || String(error) },
      { status: 500 },
    )
  }
}
