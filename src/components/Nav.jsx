import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Vision', href: '#vision' },
  { label: 'Principles', href: '#principles' },
  { label: 'Momentum', href: '#momentum' },
  { label: 'Explore', href: '#explore' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-hairline' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-lg tracking-tight text-paper">
          Carbon Sponge
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-paper">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#waitlist"
          className="rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-moss-bright"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  )
}
