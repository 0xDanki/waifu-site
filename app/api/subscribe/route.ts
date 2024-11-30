import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_API_SERVER) {
      throw new Error('Missing Mailchimp configuration')
    }

    const data = {
      email_address: email,
      status: 'subscribed',
    }

    const audienceId = MAILCHIMP_AUDIENCE_ID || await getDefaultAudienceId(MAILCHIMP_API_KEY, MAILCHIMP_API_SERVER)

    const response = await fetch(
      `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )

    if (response.status >= 400) {
      const { detail } = await response.json()
      return NextResponse.json({ error: detail }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 })
  }
}

async function getDefaultAudienceId(apiKey: string, server: string): Promise<string> {
  const response = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists`,
    {
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  )

  if (response.status >= 400) {
    throw new Error('Failed to fetch Mailchimp lists')
  }

  const data = await response.json()
  if (data.lists && data.lists.length > 0) {
    return data.lists[0].id
  }

  throw new Error('No Mailchimp lists found')
}

