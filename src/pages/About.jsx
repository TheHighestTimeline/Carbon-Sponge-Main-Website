import { useLayoutEffect, useRef } from 'react'
import Layout from '../components/Layout'
import HubDiagram from '../components/HubDiagram'
import { CtaBand, Eyebrow, PageHero } from '../components/Blocks'
import { FULL, gsap } from '../lib/motion'
import river from '../assets/img/river.webp'
import sphere from '../assets/img/sphere.webp'

const MISSION =
  'To help every business, in every industry, work toward carbon neutral with a plan that makes sense for how they operate.'

const BELIEFS = [
  { title: 'Practical over perfect', body: 'Real progress beats a perfect plan that never starts.' },
  { title: 'Every footprint counts', body: "There's no business too small or too complex to improve." },
  { title: 'Long-term partners', body: 'We measure success by where you are years from now, not at the end of one project.' },
]

function Mission() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const mm = gsap.matchMedia()
    // Words fill from muted gray to full color as the section scrolls through.
    mm.add(FULL, () => {
      el.classList.add('is-scrubbed')
      gsap.to(el.querySelectorAll('.word'), {
        color: '#ffffff',
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true },
      })
      return () => el.classList.remove('is-scrubbed')
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="section">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Eyebrow>Our mission</Eyebrow>
        <p ref={ref} className="mission mt-6 font-display text-3xl font-medium leading-[1.25] md:text-5xl">
          {MISSION.split(' ').map((w, i) => (
            <span key={i} className="word">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <Layout current="/about/">
      <PageHero
        title="Why Carbon Sponge exists."
        subhead="Most firms want to do right by the planet. Few know where to start, and fewer have the team to pull it off. We built Carbon Sponge to close that gap."
        image={river}
        imageAlt="Aerial view of a river through forest under morning mist"
      />

      <Mission />

      <section className="section border-y border-hairline bg-ink-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr]">
          <div data-reveal>
            <Eyebrow>The consortium model</Eyebrow>
            <h2 data-reveal-child className="display-lg mt-4">Why a consortium?</h2>
            <p data-reveal-child className="mt-5 text-lg leading-relaxed text-muted">
              No single firm has every answer on carbon. So we built a network instead. Advisors, engineers,
              builders and industry partners work together under one roof, and you get the right expertise at
              each stage without managing a dozen vendors yourself.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[400px]">
            <HubDiagram compact />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <Eyebrow>What we believe</Eyebrow>
          </div>
          <div data-reveal className="mt-8 grid gap-5 md:grid-cols-3">
            {BELIEFS.map((b) => (
              <div key={b.title} data-reveal-child className="card card-bar p-8">
                <h3 className="font-display text-2xl font-medium text-paper">{b.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-hairline">
        <img
          src={sphere}
          alt="Glass sphere resting on rippling water lit in blue"
          loading="lazy"
          width="1600"
          height="900"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" aria-hidden="true" />
        <div data-reveal className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
            <Eyebrow>Innovation</Eyebrow>
            <h2 data-reveal-child className="display-lg mt-4">Building for the future.</h2>
            <p data-reveal-child className="mt-5 text-lg leading-relaxed text-muted">
              Carbon Sponge is also developing carbon sequestration technology. It is in early-stage development,
              and we&apos;ll share more as the work moves forward.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership placeholder: replace each card with a real name, title and photo before launch. */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <Eyebrow>Leadership</Eyebrow>
            <h2 data-reveal-child className="display-lg mt-4">The team behind Carbon Sponge.</h2>
            <p data-reveal-child className="mt-4 text-muted">Team profiles are coming soon.</p>
          </div>
          <div data-reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} data-reveal-child className="card-static team-placeholder p-6">
                <div className="aspect-[4/5] w-full rounded-xl bg-white/[0.04]" />
                <div className="mt-5 h-4 w-2/3 rounded bg-white/[0.08]" />
                <div className="mt-3 h-3 w-1/3 rounded bg-white/[0.05]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </Layout>
  )
}
