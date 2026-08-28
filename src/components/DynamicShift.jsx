import { motion } from 'framer-motion'

const TAGLINES = [
  'Leading the way in sustainable innovation.',
  'Join us on the path to impactful change.',
  "Harnessing the potential of tomorrow's technology.",
  'Empowering businesses to embrace a greener future.',
  'Where vision meets real-world impact.',
]

const TRACK = [...TAGLINES, ...TAGLINES, ...TAGLINES]

export default function DynamicShift() {
  return (
    <section id="momentum" className="border-y border-hairline bg-ink-soft py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl"
        >
          A dynamic shift
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-muted"
        >
          A rebalancing is underway — where carbon moves from excess to
          asset, and clarity emerges through purposeful reduction.
        </motion.p>
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-soft to-transparent" />

        <motion.div
          className="flex w-max items-center gap-10 px-6"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          {TRACK.map((line, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl text-faint"
            >
              {line}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
