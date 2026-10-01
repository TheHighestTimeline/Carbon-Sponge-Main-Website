import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger }

export const REDUCED = '(prefers-reduced-motion: reduce)'
export const FULL = '(prefers-reduced-motion: no-preference)'

export const prefersReduced = () => window.matchMedia(REDUCED).matches

let lenis = null

// Lenis drives the window scroll, so sticky and pinned sections keep working.
export function initSmoothScroll() {
  if (lenis || prefersReduced()) return lenis
  lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function scrollToElement(el) {
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.2 })
  else el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
}

// Prepares a stroke so it can be drawn by animating strokeDashoffset from 1 to 0.
function prepStroke(el) {
  el.setAttribute('pathLength', '1')
  el.style.strokeDasharray = '1'
  el.style.strokeDashoffset = '1'
}

const STROKES = 'path, line, circle, polyline, polygon, rect, ellipse'

export function initGlobalMotion(root = document) {
  const mm = gsap.matchMedia()

  mm.add({ full: FULL, reduced: REDUCED }, (ctx) => {
    const { reduced } = ctx.conditions

    // Section reveals: rise 24px and fade, children stagger by 0.08s.
    root.querySelectorAll('[data-reveal]').forEach((section) => {
      const children = section.querySelectorAll('[data-reveal-child]')
      const targets = children.length ? children : [section]
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: reduced ? 0 : 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? 0.5 : 0.7,
          ease: 'power2.out',
          stagger: reduced ? 0 : 0.08,
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        },
      )
    })

    // Line icons draw themselves as they scroll into view.
    root.querySelectorAll('svg[data-draw]').forEach((svg) => {
      const strokes = svg.querySelectorAll(STROKES)
      if (reduced) {
        gsap.fromTo(svg, { autoAlpha: 0 }, {
          autoAlpha: 1, duration: 0.5,
          scrollTrigger: { trigger: svg, start: 'top 90%', once: true },
        })
        return
      }
      strokes.forEach(prepStroke)
      gsap.to(strokes, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        stagger: 0.12,
        scrollTrigger: { trigger: svg, start: 'top 88%', once: true },
      })
    })
  })

  // Headline reveal: lines slide up from a clipped mask once fonts are ready.
  const headlines = root.querySelectorAll('[data-split]')
  const splits = []
  document.fonts.ready.then(() => {
    headlines.forEach((el) => {
      if (prefersReduced()) {
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 })
        return
      }
      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 })
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.1,
          })
        },
      })
      splits.push(split)
    })
  })

  // Magnetic primary buttons on desktop pointers only.
  const magneticCleanups = []
  mm.add(`(hover: hover) and (pointer: fine) and ${FULL}`, () => {
    root.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e) => {
        const r = btn.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      btn.addEventListener('pointermove', move)
      btn.addEventListener('pointerleave', leave)
      magneticCleanups.push(() => {
        btn.removeEventListener('pointermove', move)
        btn.removeEventListener('pointerleave', leave)
      })
    })
    return () => magneticCleanups.splice(0).forEach((fn) => fn())
  })

  // On touch devices a tap gives cards the same lift as hover.
  const onTouch = (e) => {
    const card = e.target.closest('.card')
    root.querySelectorAll('.card.is-active').forEach((c) => c !== card && c.classList.remove('is-active'))
    if (card) card.classList.add('is-active')
  }
  document.addEventListener('touchstart', onTouch, { passive: true })

  return () => {
    document.removeEventListener('touchstart', onTouch)
    splits.forEach((s) => s.revert())
    mm.revert()
  }
}
