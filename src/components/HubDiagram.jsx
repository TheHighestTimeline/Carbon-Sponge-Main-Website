import { useLayoutEffect, useRef } from 'react'
import { FULL, gsap, REDUCED } from '../lib/motion'

const NODES = ['Advisors', 'Engineers', 'Builders', 'Procurement', 'Industry Partners']

const C = 300
const R = 205

const points = NODES.map((label, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / NODES.length
  return { label, x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
})

export default function HubDiagram({ compact = false }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const svg = ref.current
    const mm = gsap.matchMedia()
    mm.add({ full: FULL, reduced: REDUCED }, ({ conditions }) => {
      const lines = svg.querySelectorAll('.hub-line')
      const nodes = svg.querySelectorAll('.hub-node')
      const trigger = { trigger: svg, start: 'top 75%', once: true }
      if (conditions.reduced) {
        gsap.fromTo(svg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, scrollTrigger: trigger })
        return
      }
      lines.forEach((l) => {
        l.setAttribute('pathLength', '1')
        l.style.strokeDasharray = '1'
      })
      const tl = gsap.timeline({ scrollTrigger: trigger })
      tl.from(svg.querySelector('.hub-center'), { scale: 0.6, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.7, ease: 'power3.out' })
        .fromTo(lines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'power2.inOut' }, '-=0.2')
        .from(nodes, { scale: 0.4, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.1, ease: 'back.out(1.6)' }, '-=0.7')
        .add(() => svg.classList.add('is-live'))
    })
    return () => mm.revert()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      className={`hub ${compact ? 'hub-compact' : ''}`}
      role="img"
      aria-label="Carbon Sponge at the center of a network of advisors, engineers, builders, procurement and industry partners"
    >
      <defs>
        <radialGradient id={`hubGlow${compact ? 'S' : 'L'}`}>
          <stop offset="0%" stopColor="#1c8f70" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#10644f" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#10644f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r="230" fill={`url(#hubGlow${compact ? 'S' : 'L'})`} />
      <circle cx={C} cy={C} r={R} className="hub-orbit" />
      {points.map((p) => (
        <line key={p.label} className="hub-line" x1={C} y1={C} x2={p.x} y2={p.y} />
      ))}
      <g className="hub-center">
        <circle cx={C} cy={C} r="74" className="hub-center-disc" />
        <text x={C} y={C - 6} className="hub-center-label">Carbon</text>
        <text x={C} y={C + 22} className="hub-center-label">Sponge</text>
      </g>
      {points.map((p, i) => {
        const words = p.label.split(' ')
        return (
          <g key={p.label} className="hub-node" style={{ '--d': `${i * 0.5}s` }}>
            <circle cx={p.x} cy={p.y} r="56" className="hub-node-pulse" />
            <circle cx={p.x} cy={p.y} r="56" className="hub-node-disc" />
            {words.map((w, j) => (
              <text
                key={w}
                x={p.x}
                y={p.y + 6 + (j - (words.length - 1) / 2) * 20}
                className="hub-node-label"
              >
                {w}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
