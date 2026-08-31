import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getCountryOutlines } from '../lib/countryShape'

export default function CountryShapeButton({ trip, align = 'left' }) {
  const outlines = useMemo(() => getCountryOutlines(trip.countryCodes, 56), [trip.countryCodes])

  return (
    <Link
      to={`/itineraries/${trip.id}`}
      className={`group flex items-center gap-4 rounded-xl px-2 py-2 transition-colors hover:bg-lavender/40 ${
        align === 'right' ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <svg
        viewBox="0 0 56 56"
        className="h-14 w-14 shrink-0 text-ink/70 transition-colors group-hover:text-lavender-deep"
      >
        {outlines.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        ))}
      </svg>
      <span className="font-semibold text-xl text-ink lowercase transition-transform group-hover:translate-x-0.5 sm:text-2xl">
        {trip.name}
      </span>
    </Link>
  )
}
