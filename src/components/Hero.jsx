import { motion } from 'framer-motion'
import heroBg from '../assets/images/brTyhGmlehAvHljGXmTJlaarUg.jpg'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-32 pt-28 text-center md:pt-40">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted"
        >
          Green Technology
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-display text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-6xl"
        >
          Your path to carbon
          <br className="hidden md:block" /> negative status starts here.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-balance text-base text-muted md:text-lg"
        >
          A new standard for climate technology — powerful, efficient, and
          endlessly scalable. We're building the canvas; the breakthroughs
          will paint themselves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#momentum"
            className="rounded-full border border-hairline px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-white/5"
          >
            Watch the vision
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-moss-bright"
          >
            Join waitlist
          </a>
        </motion.div>
      </div>
    </section>
  )
}
