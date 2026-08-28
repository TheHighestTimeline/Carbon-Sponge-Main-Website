import { motion } from 'framer-motion'

const PRINCIPLES = [
  {
    title: 'Minimal by design',
    body: 'We reduce to the essentials — less material, less waste, less distraction — so that the environmental impact speaks for itself.',
  },
  {
    title: 'Transparent outcomes',
    body: "We don't dress it up — we show it plainly. Clear signals of environmental progress emerge without noise.",
  },
  {
    title: 'Quiet confidence',
    body: "There's no need to shout when the impact is real. The design remains quiet — minimal in presence — so the results can speak.",
  },
]

export default function Principles() {
  return (
    <section id="principles" className="mx-auto max-w-6xl px-6 py-28">
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl"
        >
          Principles, not playbooks.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-muted"
        >
          While technology continues to advance, our guiding principles
          remain steadfast: to elegantly reduce, clarify, and endure.
        </motion.p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-ink p-8"
          >
            <h3 className="font-display text-lg text-paper">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
