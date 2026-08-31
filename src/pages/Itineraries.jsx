import { useMemo, useState } from 'react'
import { continents, trips } from '../data/trips'
import CountryShapeButton from '../components/CountryShapeButton'
import PhotoStrip from '../components/PhotoStrip'
import FilterBar from '../components/FilterBar'
import { useFavorites } from '../hooks/useFavorites'

const usedContinents = continents.filter((c) => trips.some((t) => t.continent === c))

const SORTERS = {
  default: (a, b) => a.name.localeCompare(b.name),
  'days-asc': (a, b) => a.days - b.days,
  'days-desc': (a, b) => b.days - a.days,
  'cost-asc': (a, b) => a.costPerPerson - b.costPerPerson,
  'cost-desc': (a, b) => b.costPerPerson - a.costPerPerson,
}

export default function Itineraries() {
  const [activeContinent, setActiveContinent] = useState('all')
  const [sortKey, setSortKey] = useState('default')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const { favorites, isFavorite } = useFavorites()

  const filtered = useMemo(() => {
    let list = trips
    if (activeContinent !== 'all') list = list.filter((t) => t.continent === activeContinent)
    if (favoritesOnly) list = list.filter((t) => favorites.includes(t.id))
    return [...list].sort(SORTERS[sortKey])
  }, [activeContinent, sortKey, favoritesOnly, favorites])

  const left = filtered.filter((_, i) => i % 2 === 0)
  const right = filtered.filter((_, i) => i % 2 === 1)

  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-28 sm:px-10">
      <h1 className="mb-8 text-center font-bold text-3xl text-ink sm:text-4xl">itineraries</h1>

      <FilterBar
        continents={usedContinents}
        activeContinent={activeContinent}
        onContinentChange={setActiveContinent}
        sortKey={sortKey}
        onSortChange={setSortKey}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
      />

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink/50">no trips match those filters yet.</p>
      ) : (
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-3">
            {left.map((trip) => (
              <TripRow key={trip.id} trip={trip} isFavorite={isFavorite(trip.id)} align="left" />
            ))}
          </div>

          <div className="order-first hidden md:order-none md:block">
            <PhotoStrip trips={filtered} />
          </div>

          <div className="flex flex-col gap-3">
            {right.map((trip) => (
              <TripRow key={trip.id} trip={trip} isFavorite={isFavorite(trip.id)} align="right" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TripRow({ trip, isFavorite, align }) {
  return (
    <div className={`flex items-center gap-2 ${align === 'right' ? 'md:justify-end' : ''}`}>
      {align === 'right' && isFavorite && <span className="text-heart">❤</span>}
      <CountryShapeButton trip={trip} align={align} />
      {align === 'left' && isFavorite && <span className="text-heart">❤</span>}
    </div>
  )
}
