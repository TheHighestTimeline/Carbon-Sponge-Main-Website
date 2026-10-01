import { useLayoutEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { ArrowLink, CtaBand, PageHero } from '../components/Blocks'
import { FULL, gsap, ScrollTrigger, scrollToElement } from '../lib/motion'
import { BOOK_HREF } from '../site'
import network from '../assets/img/network.webp'
import facility from '../assets/img/facility.webp'
import construction from '../assets/img/construction.webp'
import sunrise from '../assets/img/sunrise.webp'
import river from '../assets/img/river.webp'
import sapling from '../assets/img/sapling.webp'
import leaf from '../assets/img/leaf.webp'

const SERVICES = [
  {
    id: 'strategy',
    title: 'Carbon Strategy and Roadmapping',
    body: 'We look at where you are, where you want to be and what it will take. You get a practical plan with priorities, phases and clear next steps, built around how your business actually operates.',
    img: network,
    alt: 'Illustration of connected buildings, solar panels and green spaces',
  },
  {
    id: 'procurement',
    title: 'Procurement',
    body: "Finding the right partners and equipment is half the work. We source, compare and vet options across our network so you're not starting from scratch or guessing who to trust.",
    img: facility,
    alt: 'Modern industrial building with glass entry lit at dusk',
  },
  {
    id: 'engineering',
    title: 'Engineering, Design and Construction',
    body: 'From site layout to final build, we manage the technical side. Our partners handle planning, engineering and construction, and we keep the project on track and on budget.',
    img: construction,
    alt: 'Crane lowering a building module onto a site foundation',
  },
  {
    id: 'energy',
    title: 'Energy Conservation and Community Impact',
    body: 'For firms taking their first steps, small changes add up. We help you cut energy waste, lower your footprint and turn that work into something you can share with your community.',
    img: sunrise,
    alt: 'Sun rising behind a lone tree over green hills',
  },
  {
    id: 'partnerships',
    title: 'Partnerships and Deal Support',
    body: 'For firms already active in carbon, we open doors. Our network connects you with the partners, projects and opportunities that move your work forward.',
    img: river,
    alt: 'River winding through a forest seen from above',
  },
  {
    id: 'advisory',
    title: 'Ongoing Advisory',
    body: "Carbon work doesn't end at launch. We stay on as an advisor to track progress, adjust the plan and keep you ahead of what's coming next.",
    img: sapling,
    alt: 'Young plant growing in soft green light',
  },
]

function ServiceStack() {
  const ref = useRef(null)
  const [active, setActive] = useState(SERVICES[0].id)

  useLayoutEffect(() => {
    const el = ref.current
    const cards = gsap.utils.toArray(el.querySelectorAll('.stack-card'))
    const triggers = cards.map((card) =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(card.id),
      }),
    )

    // Each card eases back slightly as the next one slides over it.
    const mm = gsap.matchMedia()
    mm.add(`(min-width: 1024px) and ${FULL}`, () => {
      cards.slice(0, -1).forEach((card, i) => {
        const scrollTrigger = { trigger: cards[i + 1], start: 'top bottom', end: 'top 120px', scrub: true }
        gsap.to(card.querySelector('.stack-card-inner'), { scale: 0.94, ease: 'none', scrollTrigger })
        gsap.to(card.querySelector('.stack-shade'), { opacity: 0.7, ease: 'none', scrollTrigger })
      })
    })

    return () => {
      triggers.forEach((t) => t.kill())
      mm.revert()
    }
  }, [])

  return (
    <section ref={ref} className="section pt-8">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[240px_1fr]">
        <nav className="service-index hidden lg:block" aria-label="Services">
          <ul>
            {SERVICES.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'is-active' : ''}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToElement(document.getElementById(s.id))
                  }}
                >
                  <span>0{i + 1}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="stack">
          {SERVICES.map((s, i) => (
            <article key={s.id} id={s.id} className="stack-card" style={{ '--i': i }}>
              <div className={`stack-card-inner card-static grid overflow-hidden md:grid-cols-2 ${i % 2 ? 'is-flipped' : ''}`} data-reveal>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p data-reveal-child className="text-sm text-faint">0{i + 1}</p>
                  <h2 data-reveal-child className="mt-4 font-display text-3xl font-medium leading-tight text-paper">{s.title}</h2>
                  <p data-reveal-child className="mt-5 leading-relaxed text-muted">{s.body}</p>
                  <div data-reveal-child className="mt-8">
                    <ArrowLink href={BOOK_HREF}>Talk to us about this</ArrowLink>
                  </div>
                </div>
                <div className="stack-shade" aria-hidden="true" />
                <div className="stack-media">
                  <img src={s.img} alt={s.alt} loading="lazy" width="1000" height="800" className="h-full w-full object-cover" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <Layout current="/services/">
      <PageHero
        title="Everything it takes to get there."
        subhead="Strategy, procurement, engineering and the partnerships to back it all up. Use one service or all of them."
        image={leaf}
        imageAlt="Leaf shape cut into a forest canopy seen from above"
      />
      <ServiceStack />
      <CtaBand heading="Not sure which service fits?" body="That's what the first call is for." />
    </Layout>
  )
}
