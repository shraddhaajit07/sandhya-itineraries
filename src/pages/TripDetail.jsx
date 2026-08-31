import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { trips, getTrip } from '../data/trips'
import CountryShapeButton from '../components/CountryShapeButton'
import { getCountryOutlines } from '../lib/countryShape'
import QuickFacts from '../components/QuickFacts'
import CommentSection from '../components/CommentSection'
import FavoriteHeart from '../components/FavoriteHeart'
import { useFavorites } from '../hooks/useFavorites'

export default function TripDetail() {
  const { id } = useParams()
  const trip = getTrip(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const outlines = useMemo(() => (trip ? getCountryOutlines(trip.countryCodes, 72) : []), [trip])

  const index = trips.findIndex((t) => t.id === id)
  const prev = index > 0 ? trips[index - 1] : trips[trips.length - 1]
  const next = index >= 0 && index < trips.length - 1 ? trips[index + 1] : trips[0]

  if (!trip) return <Navigate to="/itineraries" replace />

  return (
    <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-28 sm:px-10">
      <Link
        to="/itineraries"
        className="mb-8 inline-flex items-center gap-1 text-sm text-ink/50 transition-colors hover:text-ink"
      >
        ← all itineraries
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <svg viewBox="0 0 72 72" className="h-16 w-16 shrink-0 text-ink/70">
          {outlines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          ))}
        </svg>
        <h1 className="font-bold text-3xl tracking-wide text-ink uppercase sm:text-4xl">{trip.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <DocEmbed trip={trip} />
          <div className="mt-4 flex items-center justify-between">
            <FavoriteHeart active={isFavorite(trip.id)} onToggle={() => toggleFavorite(trip.id)} size="lg" />
            {trip.docUrl && (
              <a
                href={trip.docUrl.replace('/preview', '/edit')}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink/50 underline decoration-ink/20 underline-offset-2 hover:text-ink"
              >
                open full doc ↗
              </a>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <QuickFacts trip={trip} />
          <CommentSection tripId={trip.id} />
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
        <NavTrip trip={prev} label="prev" />
        <NavTrip trip={next} label="next" align="right" />
      </div>
    </div>
  )
}

function DocEmbed({ trip }) {
  if (!trip.docUrl) {
    return (
      <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink/15 bg-lavender/20 p-8 text-center sm:aspect-[3/4]">
        <p className="font-bold text-xl text-ink/60">itinerary coming soon</p>
        <p className="max-w-xs text-sm text-ink/40">
          add this trip's Google Doc "publish to web" embed link as{' '}
          <code className="rounded bg-ink/5 px-1">docUrl</code> in{' '}
          <code className="rounded bg-ink/5 px-1">src/data/trips.js</code>
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
      <iframe
        src={trip.docUrl}
        title={`${trip.name} itinerary`}
        className="h-[75vh] w-full min-h-[480px]"
        loading="lazy"
      />
    </div>
  )
}

function NavTrip({ trip, label, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : ''}>
      <p className="mb-1 text-xs tracking-wide text-ink/40 uppercase">{label}</p>
      <CountryShapeButton trip={trip} align={align === 'right' ? 'right' : 'left'} />
    </div>
  )
}
