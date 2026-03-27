import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== 'seed-sos-2026-run-once') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // Force push schema to database
    const db = payload.db as Record<string, unknown>
    if (db && typeof db.push === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (db.push as any)({ forceAcceptWarning: true })
      return NextResponse.json({ success: true, message: 'Database schema pushed successfully' })
    }

    return NextResponse.json({ success: false, message: 'No push function available on db adapter' })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
