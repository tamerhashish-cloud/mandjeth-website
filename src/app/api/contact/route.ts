import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  inquiryType?: string
  message?: string
  website?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

const requestLog = new Map<string, number[]>()

function isRateLimited(clientKey: string): boolean {
  const now = Date.now()
  const existing = requestLog.get(clientKey) ?? []
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientKey, recent)
    return true
  }

  recent.push(now)
  requestLog.set(clientKey, recent)
  return false
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIp = forwardedFor?.split(',')[0]?.trim() || 'unknown-client'

  console.log(`[contact] POST request from IP: ${clientIp}`)

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 },
    )
  }

  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 })
  }

  if ((payload.website ?? '').trim().length > 0) {
    return NextResponse.json({ message: 'Accepted.' }, { status: 200 })
  }

  const name = (payload.name ?? '').trim()
  const email = (payload.email ?? '').trim()
  const company = (payload.company ?? '').trim()
  const inquiryType = (payload.inquiryType ?? 'Other').trim()
  const message = (payload.message ?? '').trim()

  if (!name || !email || !company || !message) {
    return NextResponse.json(
      { message: 'Name, email, company, and message are required.' },
      { status: 400 },
    )
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  if (!apiKey || !toEmail) {
    console.error('[contact] Missing env vars', {
      hasApiKey: !!apiKey,
      hasToEmail: !!toEmail,
    })
    return NextResponse.json(
      { message: 'Email delivery is not configured. Please try again later.' },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `MANDJETH contract request — ${inquiryType} | ${name}, ${company}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Interest type:</strong> ${inquiryType}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  })

  if (error) {
    console.error('[contact] Resend API error:', error)
    return NextResponse.json(
      { message: 'Your inquiry could not be delivered. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ message: 'Inquiry submitted successfully.' }, { status: 200 })
}
