import { useLayoutEffect, useRef } from 'react'
import Layout from '../components/Layout'
import { CtaBand, Eyebrow, PageHero } from '../components/Blocks'
import { FULL, gsap } from '../lib/motion'
import forestRows from '../assets/img/forest-rows.webp'
import industry from '../assets/img/industry.webp'
import network from '../assets/img/network.webp'
import construction from '../assets/img/construction.webp'
import sapling from '../assets/img/sapling.webp'

const STEPS = [
  {
    n: '01',
    title: 'Assess',
    body: 'We start by understanding how your business runs today.',
    bullets: [
      'A review of your energy use and operations.',
      'The sources of your emissions, ranked by impact.',
      'Quick wins you can act on right away.',
    ],
    img: industry,
    alt: 'Industrial site beside a lake with smoke rising from its stacks',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'We build a roadmap that fits your business, not a template.',
    bullets: [
      'Clear milestones and priorities.',
      'Budget ranges and options at each stage.',
      'A timeline your team can actually work to.',
    ],
    img: network,
    alt: 'Illustration of connected buildings and green spaces laid out like a plan',
  },
  {
    n: '03',
    title: 'Build',
    body: 'We bring in the consortium to deliver the work.',
    bullets: [
      'Procurement of partners, equipment and programs.',
      'Engineering, site layout and plans.',
      'Construction managed from start to finish.',
    ],
    img: construction,
    alt: 'Building module being placed on a prepared construction site',
  },
  {
    n: '04',
    title: 'Sustain',
    body: 'We stay with you after the work is done.',
    bullets: [
      'Progress tracking and reporting.',
      'Adjustments as your business grows.',
      'A story you can share with customers, investors and your community.',
    ],
    img: sapling,
    alt: 'Young plant growing up through moss in soft green light',
  },
]

const POINTS = [
  'One point of contact for the whole project.',
  'Straight answers on cost and timing.',
  'Specialists brought in only when you need them.',
]

function Steps() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const mm = gsap.matchMedia()
    // Pinned sequence on desktop only. Mobile and reduced motion keep the normal stacked layout.
    mm.add(`(min-width: 1024px) and ${FULL}`, () => {
      el.classList.add('is-pinned')
      const panels = gsap.utils.toArray(el.querySelectorAll('.process-step'))
      const rail = el.querySelector('.rail-fill')
      const labels = el.querySelectorAll('.rail-label')
      const setActive = (i) => labels.forEach((l, j) => l.classList.toggle('is-active', j <= i))

      gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 18 })
      setActive(0)

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * (panels.length - 1) * 0.9}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (panels.length - 1))),
        },
      })
      tl.fromTo(rail, { scaleY: 1 / panels.length }, { scaleY: 1, ease: 'none', duration: panels.length - 1 }, 0)
      panels.forEach((panel, i) => {
        if (i === 0) return
        tl.to(panels[i - 1], { autoAlpha: 0, yPercent: -12, duration: 0.5 }, i - 1 + 0.25)
        tl.to(panel, { autoAlpha: 1, yPercent: 0, duration: 0.5 }, i - 1 + 0.45)
      })

      return () => {
        el.classList.remove('is-pinned')
        labels.forEach((l) => l.classList.remove('is-active'))
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} className="process">
      <div className="process-inner mx-auto max-w-6xl px-4 sm:px-6">
        <div className="process-rail" aria-hidden="true">
          <div className="rail-track">
            <div className="rail-fill" />
          </div>
          <ol>
            {STEPS.map((s) => (
              <li key={s.n} className="rail-label">
                <span>{s.n}</span> {s.title}
              </li>
            ))}
          </ol>
        </div>

        <div className="process-stage">
          {STEPS.map((s) => (
            <article key={s.n} className="process-step" data-reveal>
              <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
                <div>
                  <p data-reveal-child className="font-display text-6xl font-medium text-moss-bright md:text-7xl">{s.n}</p>
                  <h2 data-reveal-child className="display-lg mt-4">{s.title}</h2>
                  <p data-reveal-child className="mt-4 text-lg leading-relaxed text-muted">{s.body}</p>
                  <ul data-reveal-child className="check-list mt-8">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div data-reveal-child className="media-frame aspect-[4/3]">
                  <img src={s.img} alt={s.alt} loading="lazy" width="1000" height="750" className="h-full w-full object-cover" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HowWeWork() {
  return (
    <Layout current="/how-we-work/">
      <PageHero
        title="A clear path from first call to finished project."
        subhead="Carbon neutrality isn't one decision. It's a series of smart ones. Here's how we take you through them."
        image={forestRows}
        imageAlt="Rows of young trees growing in a misty field"
      />
      <Steps />
      <section className="section border-y border-hairline bg-ink-soft">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal className="max-w-2xl">
            <Eyebrow>What working with us looks like</Eyebrow>
            <h2 data-reveal-child className="display-lg mt-4">You&apos;ll always know where things stand.</h2>
          </div>
          <div data-reveal className="mt-14 grid gap-5 md:grid-cols-3">
            {POINTS.map((p, i) => (
              <div key={p} data-reveal-child className="card p-8">
                <span className="text-sm text-faint">0{i + 1}</span>
                <p className="mt-6 font-display text-xl font-medium leading-snug text-paper">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand heading="Start with step one." />
    </Layout>
  )
}
