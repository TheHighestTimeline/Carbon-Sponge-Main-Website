import { useState } from 'react'
import { motion } from 'framer-motion'

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'waitlist', email }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="border-t border-hairline bg-ink-soft py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-xl px-6 text-center"
      >
        <span className="rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted">
          Coming Soon
        </span>
        <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-paper md:text-4xl">
          Join the waitlist
        </h2>
        <p className="mt-4 text-muted">
          The path to becoming carbon negative starts here.
        </p>

        {status === 'success' ? (
          <p className="mt-8 rounded-full border border-moss/50 bg-moss/10 px-6 py-3 text-sm text-paper">
            You're on the list — we'll be in touch.
          </p>
        ) : (
          <form
            name="waitlist"
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input type="hidden" name="form-name" value="waitlist" />
            <label htmlFor="email" className="sr-only">
              Your email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full flex-1 rounded-full border border-hairline bg-white/5 px-5 py-3 text-sm text-paper placeholder:text-faint focus:border-moss focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0 rounded-full bg-moss px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-moss-bright disabled:opacity-60"
            >
              {status === 'loading' ? 'Joining…' : 'Join waitlist'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-400">
            Something went wrong — please try again.
          </p>
        )}
      </motion.div>
    </section>
  )
}
