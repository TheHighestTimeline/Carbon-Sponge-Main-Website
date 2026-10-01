import { useState } from 'react'
import Layout from '../components/Layout'
import { CARBON_STAGES, CONTACT_EMAIL, INDUSTRIES } from '../site'

const FORM_NAME = 'book-a-call'

// Submissions are stored in Netlify Forms and also emailed to the team through FormSubmit.
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

const EMPTY = {
  name: '',
  company: '',
  industry: '',
  email: '',
  phone: '',
  stage: '',
  message: '',
  'bot-field': '',
}

function encode(data) {
  return new URLSearchParams(data).toString()
}

function Field({ id, label, required, value, children }) {
  return (
    <div className={`field ${value ? 'is-filled' : ''}`}>
      {children}
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
    </div>
  )
}

function Success() {
  return (
    <div className="form-success" role="status">
      <svg viewBox="0 0 52 52" className="success-check" aria-hidden="true">
        <circle cx="26" cy="26" r="24" pathLength="1" />
        <path d="M15 27 L23 34 L38 18" pathLength="1" />
      </svg>
      <p className="mt-6 font-display text-2xl font-medium text-paper">Thanks. We&apos;ll be in touch within one business day to set up your call.</p>
    </div>
  )
}

function BookingForm() {
  const [data, setData] = useState(EMPTY)
  const [status, setStatus] = useState('idle')

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (data['bot-field']) {
      setStatus('success')
      return
    }
    setStatus('loading')

    const fields = { ...data }
    delete fields['bot-field']

    const toNetlify = fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': FORM_NAME, ...data }),
    }).then((r) => r.ok)

    const toEmail = fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New call request: ${data.name} at ${data.company}`,
        _replyto: data.email,
        _template: 'table',
        _captcha: 'false',
        'Full name': data.name,
        Company: data.company,
        Industry: data.industry || 'Not given',
        Email: data.email,
        Phone: data.phone || 'Not given',
        'Where they are on carbon': data.stage,
        'Anything else': data.message || 'Nothing added',
      }),
    }).then((r) => r.ok)

    const results = await Promise.allSettled([toNetlify, toEmail])
    const ok = results.some((r) => r.status === 'fulfilled' && r.value)
    // Hold the loading state briefly so the transition never flickers.
    await new Promise((r) => setTimeout(r, 500))
    setStatus(ok ? 'success' : 'error')
  }

  if (status === 'success') return <Success />

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="booking-form"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" value={data['bot-field']} onChange={set('bot-field')} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required value={data.name}>
          <input id="name" name="name" type="text" autoComplete="name" required placeholder=" " value={data.name} onChange={set('name')} />
        </Field>
        <Field id="company" label="Company" required value={data.company}>
          <input id="company" name="company" type="text" autoComplete="organization" required placeholder=" " value={data.company} onChange={set('company')} />
        </Field>
        <Field id="email" label="Email" required value={data.email}>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder=" " value={data.email} onChange={set('email')} />
        </Field>
        <Field id="phone" label="Phone" value={data.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder=" " value={data.phone} onChange={set('phone')} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="industry" label="Industry" value={data.industry}>
            <select id="industry" name="industry" value={data.industry} onChange={set('industry')}>
              <option value="" disabled hidden />
              {[...INDUSTRIES, 'Other'].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="stage" label="Where are you on carbon today?" required value={data.stage}>
            <select id="stage" name="stage" required value={data.stage} onChange={set('stage')}>
              <option value="" disabled hidden />
              {CARBON_STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="message" label="Anything else we should know?" value={data.message}>
            <textarea id="message" name="message" rows="4" placeholder=" " value={data.message} onChange={set('message')} />
          </Field>
        </div>
      </div>

      <button type="submit" className={`btn btn-primary btn-lg mt-8 w-full justify-center sm:w-auto ${status === 'loading' ? 'is-loading' : ''}`} disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className="spinner" aria-hidden="true" /> Sending
          </>
        ) : (
          'Request a Call'
        )}
      </button>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          Something went wrong sending your request. Please try again, or email us at{' '}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}
    </form>
  )
}

export default function BookACall() {
  return (
    <Layout current="/book-a-call/">
      <section className="relative overflow-hidden">
        <div className="glow glow-hero" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-24 pt-36 sm:px-6 md:pt-44 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h1 data-split className="display-xl">Let&apos;s talk about your firm.</h1>
            <div data-reveal>
              <p data-reveal-child className="mt-6 text-lg leading-relaxed text-muted">
                Tell us a little about your business and we&apos;ll set up a short call. No pressure and no
                obligation. You&apos;ll leave knowing your next step.
              </p>
              <p data-reveal-child className="eyebrow mt-10">What to expect</p>
              <ul data-reveal-child className="check-list mt-5">
                <li>A 30 minute conversation with our team.</li>
                <li>A quick look at where you stand today.</li>
                <li>Clear options for what comes next.</li>
              </ul>
            </div>
          </div>

          <div data-reveal>
            <div data-reveal-child className="card-static p-6 sm:p-8">
              <BookingForm />
            </div>
            {/*
              Scheduling embed placeholder. Paste the Calendly or Cal.com inline embed here, for example:
              <div className="calendly-inline-widget" data-url="https://calendly.com/YOUR-LINK" style={{ minWidth: 320, height: 700 }} />
              and load https://assets.calendly.com/assets/external/widget.js on this page.
            */}
          </div>
        </div>
      </section>
    </Layout>
  )
}
