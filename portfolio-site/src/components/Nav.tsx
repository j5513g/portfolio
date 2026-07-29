import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'home', end: true },
  { to: '/journal', label: 'journal' },
  { to: '/experience', label: 'experience' },
  { to: '/contact', label: 'contact' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--dark)]/92 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="title-serif text-xl text-[var(--cream)] no-underline transition hover:text-[var(--glow)] sm:text-2xl">
          jia's world
        </NavLink>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link-hover mono rounded-full px-3 py-1.5 text-sm no-underline transition-colors ${
                  isActive
                    ? 'bg-[var(--red)] text-[var(--cream)]'
                    : 'text-[var(--muted)] hover:bg-[var(--red)]/20 hover:text-[var(--cream)]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
