import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'about', end: true },
  { to: '/itineraries', label: 'itineraries' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <NavLink to="/" className="font-display text-3xl text-ink sm:text-4xl">
          Sandhya Kollath
        </NavLink>
        <div className="flex items-center gap-6 font-semibold text-base text-ink sm:gap-10 sm:text-lg">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative pb-1 transition-colors hover:text-lavender-deep ${
                  isActive ? 'text-ink' : 'text-ink/60'
                } after:absolute after:left-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-lavender-deep after:transition-all after:content-[''] ${
                  isActive ? 'after:w-full' : 'after:w-0'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
