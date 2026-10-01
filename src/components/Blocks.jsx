import { BOOK_HREF } from '../site'

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>
}

export function PageHero({ title, subhead, image, imageAlt, children }) {
  return (
    <section className="page-hero relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={imageAlt}
            width="1600"
            height="900"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 hero-fade" />
        </div>
      )}
      <div className="glow glow-hero" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 md:pb-28 md:pt-48">
        <h1 data-split className="display-xl max-w-4xl">
          {title}
        </h1>
        {subhead && (
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {subhead}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

export function CtaBand({ heading, body, image, imageAlt }) {
  return (
    <section className="cta-band relative overflow-hidden border-t border-hairline">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width="1600"
          height="900"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="glow glow-cta" aria-hidden="true" />
      <div data-reveal className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6 md:py-36">
        {heading && <h2 data-reveal-child className="display-lg">{heading}</h2>}
        {body && <p data-reveal-child className="mt-5 max-w-xl text-lg text-muted">{body}</p>}
        <div data-reveal-child className="mt-10">
          <a href={BOOK_HREF} className="btn btn-primary btn-lg" data-magnetic>
            Book a Call
          </a>
        </div>
      </div>
    </section>
  )
}

export function ArrowLink({ href, children }) {
  return (
    <a href={href} className="arrow-link">
      {children}
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
