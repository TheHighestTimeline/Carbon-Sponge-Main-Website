import { useEffect, useLayoutEffect, useRef } from 'react'
import Layout from '../components/Layout'
import HubDiagram from '../components/HubDiagram'
import { ArrowLink, CtaBand, Eyebrow } from '../components/Blocks'
import { FULL, gsap, prefersReduced, REDUCED } from '../lib/motion'
import { BOOK_HREF, INDUSTRIES } from '../site'
import construction from '../assets/img/construction.webp'
import facility from '../assets/img/facility.webp'
import river from '../assets/img/river.webp'

const STAGES = [
  {
    title: 'Just getting started.',
    body: "You know carbon matters to your customers, your investors and your community, but you're not sure where to begin. We give you a clear starting point and a plan you can act on.",
  },
  {
    title: 'Already moving, ready for more.',
    body: "You've made changes, but you think there's more on the table. We look at what you're doing now and find the next steps worth taking.",
  },
  {
    title: 'Deep in the carbon space.',
    body: 'Carbon is already part of your business and you want to go further. We bring the partners, the connections and the deal support to help you get there.',
  },
]

const SERVICES = [
  {
    title: 'Strategy',
    body: 'A roadmap built around your operations, your budget and your timeline.',
    icon: (
      <>
        <path d="M6 38 L18 26 L26 32 L42 12" />
        <path d="M32 12 H42 V22" />
        <path d="M6 44 H44" />
      </>
    ),
  },
  {
    title: 'Procurement',
    body: 'The right partners, equipment and programs, sourced and vetted for you.',
    icon: (
      <>
        <circle cx="21" cy="21" r="12" />
        <path d="M30 30 L42 42" />
        <path d="M15 21 L19.5 25.5 L27 17" />
      </>
    ),
  },
  {
    title: 'Engineering and Build',
    body: 'Plans, site layout and construction, managed start to finish.',
    icon: (
      <>
        <path d="M6 42 H44" />
        <path d="M10 42 V20 L24 10 L38 20 V42" />
        <path d="M19 42 V30 H29 V42" />
        <path d="M16 22 H32" />
      </>
    ),
  },
  {
    title: 'Ongoing Guidance',
    body: 'Reporting, adjustments and support long after the first project is done.',
    icon: (
      <>
        <path d="M40 25 A15 15 0 1 1 33 12" />
        <path d="M33 5 V12 H40" />
        <path d="M25 17 V25 L30 29" />
      </>
    ),
  },
]

const STEPS = ['Assess', 'Plan', 'Build', 'Sustain']

function Hero() {
  const fieldRef = useRef(null)

  useEffect(() => {
    let stop = () => {}
    let cancelled = false
    // Load Three.js only after the hero text has painted.
    const load = () =>
      import('../lib/particles').then(({ startParticles }) => {
        if (!cancelled && fieldRef.current) stop = startParticles(fieldRef.current, { reduced: prefersReduced() })
      })
    const id = 'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 1200 }) : setTimeout(load, 400)
    return () => {
      cancelled = true
      if ('cancelIdleCallback' in window) cancelIdleCallback(id)
      else clearTimeout(id)
      stop()
    }
  }, [])

  return (
    <section className="home-hero relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="hero-fallback" aria-hidden="true" />
      <div ref={fieldRef} className="particle-field" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-36 sm:px-6 md:pt-40">
        <p data-reveal className="eyebrow">A carbon consortium</p>
        <h1 data-split className="display-xl mt-6 max-w-4xl">
          Work toward carbon neutral, with a team behind you.
        </h1>
        <div data-reveal>
          <p data-reveal-child className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            Carbon Sponge is a carbon consortium. We help firms in every industry understand their
            footprint, plan their path and build the projects that help them work toward carbon neutral.
          </p>
          <div data-reveal-child className="mt-10 flex flex-wrap items-center gap-4">
            <a href={BOOK_HREF} className="btn btn-primary btn-lg" data-magnetic>
              Book a Call
            </a>
            <a href="/how-we-work/" className="btn btn-secondary btn-lg">
              See How We Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhereAreYou() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Where are you today?</Eyebrow>
          <h2 data-reveal-child className="display-lg mt-4">
            Every firm starts somewhere different. We meet you where you are.
          </h2>
        </div>
        <div data-reveal className="mt-14 grid gap-5 md:grid-cols-3">
          {STAGES.map((s, i) => (
            <a key={s.title} href={BOOK_HREF} data-reveal-child className="card card-bar flex flex-col p-8">
              <span className="text-sm text-faint">0{i + 1}</span>
              <h3 className="mt-8 font-display text-2xl font-medium text-paper">{s.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
              <span className="arrow-link mt-8">
                Book a Call
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatWeDo() {
  return (
    <section className="section border-y border-hairline bg-ink-soft">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 data-reveal-child className="display-lg mt-4">Everything it takes to get there.</h2>
          </div>
          <div data-reveal-child>
            <ArrowLink href="/services/">All services</ArrowLink>
          </div>
        </div>
        <div data-reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <a key={s.title} href="/services/" data-reveal-child className="card flex flex-col p-7">
              <svg data-draw viewBox="0 0 50 50" className="line-icon" aria-hidden="true">
                {s.icon}
              </svg>
              <h3 className="mt-8 font-display text-xl font-medium text-paper">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const nodes = el.querySelectorAll('.step-node')
    const light = (p) => nodes.forEach((n, i) => n.classList.toggle('is-lit', p >= i / (nodes.length - 1) - 0.001))
    const mm = gsap.matchMedia()
    mm.add(
      { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', full: FULL, reduced: REDUCED },
      ({ conditions }) => {
        const line = el.querySelector(conditions.desktop ? '.track-h .track-fill' : '.track-v .track-fill')
        if (!line) return
        line.setAttribute('pathLength', '1')
        line.style.strokeDasharray = '1'
        if (conditions.reduced) {
          line.style.strokeDashoffset = '0'
          light(1)
          return
        }
        gsap.fromTo(
          line,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el.querySelector('.steps'),
              start: conditions.desktop ? 'top 75%' : 'top 70%',
              end: conditions.desktop ? 'bottom 45%' : 'bottom 55%',
              scrub: 0.6,
              onUpdate: (self) => light(self.progress),
            },
          },
        )
      },
    )
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 data-reveal-child className="display-lg mt-4">Assess. Plan. Build. Sustain.</h2>
          <p data-reveal-child className="mt-5 text-lg text-muted">One team from the first conversation to the finished project.</p>
        </div>

        <div className="steps relative mt-16">
          <svg className="track track-h" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" className="track-base" />
            <line x1="0" y1="1" x2="100" y2="1" className="track-fill" />
          </svg>
          <svg className="track track-v" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="1" y1="0" x2="1" y2="100" className="track-base" />
            <line x1="1" y1="0" x2="1" y2="100" className="track-fill" />
          </svg>
          <ol className="step-grid">
            {STEPS.map((s, i) => (
              <li key={s} className="step">
                <span className="step-node" aria-hidden="true" />
                <div>
                  <p className="text-sm text-faint">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-2xl font-medium text-paper">{s}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="mt-14">
          <ArrowLink href="/how-we-work/">See How We Work</ArrowLink>
        </div>
      </div>
    </section>
  )
}

function Industries() {
  const half = Math.ceil(INDUSTRIES.length / 2)
  const rows = [INDUSTRIES.slice(0, half), INDUSTRIES.slice(half)]
  return (
    <section className="section border-y border-hairline bg-ink-soft">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div data-reveal>
          <Eyebrow>Every industry</Eyebrow>
          <h2 data-reveal-child className="display-lg mt-4">Built for every industry.</h2>
          <p data-reveal-child className="mt-5 text-lg leading-relaxed text-muted">
            Every business has a footprint, and every footprint can be reduced. We work with firms across
            all sectors, from a single location to operations that span the country.
          </p>
        </div>
        <div data-reveal className="media-frame aspect-[16/10]">
          <img
            src={construction}
            alt="Prefabricated building module lowered onto a new site foundation at dusk"
            loading="lazy"
            width="1456"
            height="816"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="marquee-wrap mt-16" aria-label="Industries we work with">
        {rows.map((row, r) => (
          <div key={r} className={`marquee ${r === 1 ? 'marquee-reverse' : ''}`}>
            <ul className="marquee-track">
              {[...row, ...row, ...row, ...row].map((name, i) => (
                <li key={`${name}-${i}`} className="tag" aria-hidden={i >= row.length ? 'true' : undefined}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Consortium() {
  return (
    <section className="section">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 md:grid-cols-2">
        <div data-reveal>
          <Eyebrow>The consortium</Eyebrow>
          <h2 data-reveal-child className="display-lg mt-4">One call. A whole team behind it.</h2>
          <p data-reveal-child className="mt-5 text-lg leading-relaxed text-muted">
            Carbon Sponge is a consortium of advisors, engineers, builders and industry partners. You work
            with one point of contact, and the right specialists come in when your project needs them.
          </p>
          <div data-reveal-child className="media-frame mt-10 hidden aspect-[16/9] md:block">
            <img
              src={facility}
              alt="Modern industrial facility lit up at dusk after rain"
              loading="lazy"
              width="512"
              height="512"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-[520px]">
          <HubDiagram />
        </div>
      </div>
    </section>
  )
}

function LookingAhead() {
  return (
    <section className="section relative overflow-hidden border-y border-hairline">
      <div className="glow glow-breathe" aria-hidden="true" />
      <div data-reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Eyebrow>Looking ahead</Eyebrow>
        <h2 data-reveal-child className="display-lg mt-4">Investing in what&apos;s next.</h2>
        <p data-reveal-child className="mt-5 text-lg leading-relaxed text-muted">
          Alongside our advisory work, Carbon Sponge is developing carbon sequestration technology. It is in
          early-stage development, and we&apos;ll share more as it progresses.
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Layout current="/">
      <Hero />
      <WhereAreYou />
      <WhatWeDo />
      <HowItWorks />
      <Industries />
      <Consortium />
      <LookingAhead />
      <CtaBand
        heading="Find out where your firm stands."
        body="A short call with our team is the easiest way to see what's possible for your business."
        image={river}
        imageAlt="Aerial view of a river winding through dense forest in morning mist"
      />
    </Layout>
  )
}
