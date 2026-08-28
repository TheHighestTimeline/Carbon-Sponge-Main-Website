import { motion } from 'framer-motion'
import serviceImg from '../assets/images/YjBb2lv98OssLICbUhm6OrXhYA.jpeg'
import iconOne from '../assets/images/VCivQexHseFnsK3qKo6pNOAPrk.svg'
import iconTwo from '../assets/images/Ro9jV4dja1QXSw6BC2DzMIAHKY.svg'

const TRAITS = [
  { title: 'Frictionless', icon: iconOne },
  { title: 'Verified', icon: iconTwo },
  { title: 'Scalable', icon: iconOne },
]

export default function ClimateAction() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-paper md:text-4xl">
            A single place to take
            <br /> climate action.
          </h2>
          <p className="mt-6 text-muted">
            No specs, no jargon. Carbon Sponge is built to make your
            footprint smaller and your story bigger. The details evolve. The
            promise stays the same.
          </p>

          <div className="mt-10 flex flex-wrap gap-8">
            {TRAITS.map((trait) => (
              <div key={trait.title} className="flex items-center gap-3">
                <img src={trait.icon} alt="" className="h-6 w-6" />
                <span className="text-sm font-medium text-paper">{trait.title}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm leading-relaxed text-faint">
            What begins as a small step quickly becomes movement. With
            barriers softened and complexity distilled, every action compounds
            — turning individual intent into collective, measurable change.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-3xl border border-hairline"
        >
          <img src={serviceImg} alt="Carbon Sponge service" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </section>
  )
}
