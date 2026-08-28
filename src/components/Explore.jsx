import { motion } from 'framer-motion'
import stepOne from '../assets/images/COt7xUvr951aSlkuMsJ3LKN5K4.jpg'
import stepTwo from '../assets/images/TI5NGjbJusPDRkKNyuQETf4shk.jpg'
import stepThree from '../assets/images/ELofRVwjhAwFJV37p3AE3PuzIxI.jpg'

const STEPS = [
  { title: 'Growing demand', tag: 'Carbon credits', img: stepOne },
  { title: 'Stronger baselines', tag: 'Verification', img: stepTwo },
  { title: 'Shareable impact', tag: 'Engagement', img: stepThree },
]

export default function Explore() {
  return (
    <section id="explore" className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="overflow-hidden rounded-2xl border border-hairline"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img src={step.img} alt={step.title} className="h-full w-full object-cover" />
            </div>
            <div className="bg-ink-soft p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-faint">{step.tag}</p>
              <h3 className="mt-2 font-display text-lg text-paper">{step.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mt-24 text-center"
      >
        <h2 className="font-display text-3xl font-medium tracking-tight text-paper md:text-5xl">
          The moment is bigger than any one company.
        </h2>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-moss px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-moss-bright"
        >
          Join waitlist
        </a>
      </motion.div>
    </section>
  )
}
