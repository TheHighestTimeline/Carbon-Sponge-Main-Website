import { useEffect, useLayoutEffect, useState } from 'react'
import { initGlobalMotion, initSmoothScroll, ScrollTrigger } from '../lib/motion'
import { BOOK_HREF, CONTACT_EMAIL, NAV } from '../site'
import logo from '../assets/img/logo.webp'

function Logo({ className = '' }) {
  return (
    <img
      src={logo}
      alt="Carbon Sponge logo"
      width="600"
      height="234"
      className={`h-9 w-auto ${className}`}
    />
  )
}

function Header({ current }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
  }, [open])

  return (
    <header className={`site-header ${solid || open ? 'is-solid' : ''}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="/" className="shrink-0" aria-label="Carbon Sponge home">
          <Logo className="header-logo" />
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={current === link.href ? 'page' : undefined}
                className="nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={BOOK_HREF} className="btn btn-primary btn-sm" data-magnetic>
            Book a Call
          </a>
          <button
            type="button"
            className="menu-toggle md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu md:hidden ${open ? 'is-open' : ''}`} hidden={!open}>
        <ul className="flex flex-col gap-1 px-4 pb-8 pt-4">
          {NAV.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block border-b border-hairline py-4 font-display text-2xl text-paper">
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a href={BOOK_HREF} className="btn btn-primary w-full justify-center">
              Book a Call
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink-soft">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            A carbon consortium helping firms work toward carbon neutral.
          </p>
          <a href={BOOK_HREF} className="btn btn-primary btn-sm mt-6">
            Book a Call
          </a>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="/" className="footer-link">Home</a></li>
            {NAV.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer-link">{link.label}</a>
              </li>
            ))}
            <li><a href={BOOK_HREF} className="footer-link">Book a Call</a></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link break-all">{CONTACT_EMAIL}</a>
            </li>
            <li><a href="/privacy/" className="footer-link">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-faint sm:px-6">
          © 2026 Carbon Sponge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function Layout({ current, children }) {
  useLayoutEffect(() => {
    initSmoothScroll()
    const cleanup = initGlobalMotion(document)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      cleanup()
    }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
