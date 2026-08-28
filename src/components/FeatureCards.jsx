import { motion } from 'framer-motion'

const FEATURES = [
  {
    title: 'Beautifully minimal',
    body: 'Experience a design that elegantly conveys impact without overwhelming complexity. Every element is purposeful.',
  },
  {
    title: 'Human first',
    body: 'Our design puts people at the forefront, offering straightforward actions and transparent results. Always clear, never cold.',
  },
  {
    title: 'Ready to scale',
    body: 'From a single brand to a vast network, our platform maintains its elegance and effectiveness. Designed to grow with you.',
  },
]

export default function FeatureCards() {
  return (
    <section className="border-y border-hairline bg-ink-soft py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-3xl font-medium tracking-tight text-paper md:text-4xl"
        >
          Less carbon. More future.
        </motion.h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-hairline bg-white/[0.03] p-8"
            >
              <h3 className="font-display text-xl text-paper">{feature.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
