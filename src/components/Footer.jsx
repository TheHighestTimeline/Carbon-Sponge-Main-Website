const SOCIALS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-faint sm:flex-row">
        <p>© {new Date().getFullYear()} Carbon Sponge</p>
        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="transition-colors hover:text-paper">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
