import { motion } from 'framer-motion'

const PILLARS = [
  { title: 'Capture', tag: 'Air', detail: 'Simplified' },
  { title: 'Amplify', tag: 'Impact', detail: 'Measured' },
  { title: 'Transform', tag: 'Value', detail: 'Unlocked' },
]

const TRACK = [...PILLARS, ...PILLARS, ...PILLARS, ...PILLARS]

export default function PillarsMarquee() {
  return (
    <section id="vision" className="border-y border-hairline bg-ink-soft py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl"
        >
          From promise to presence
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-lg text-muted"
        >
          Three quiet glimpses of what's coming. No spoilers, just signals.
        </motion.p>
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-soft to-transparent" />

        <motion.div
          className="flex w-max gap-6 px-6"
          animate={{ x: ['0%', '-25%'] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        >
          {TRACK.map((pillar, i) => (
            <div
              key={`${pillar.title}-${i}`}
              className="flex w-64 shrink-0 flex-col items-start rounded-2xl border border-hairline bg-white/[0.03] p-8"
            >
              <h3 className="font-display text-xl text-paper">{pillar.title}</h3>
              <p className="mt-3 text-sm text-muted">{pillar.tag}</p>
              <p className="text-sm text-faint">{pillar.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
