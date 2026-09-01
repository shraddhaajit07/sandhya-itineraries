import { useMemo } from 'react'
import { trips } from '../data/trips'

function shuffled(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// shuffled once per page load, not per render — otherwise every re-render
// (a favorite toggle elsewhere, a filter change) would reshuffle mid-scroll
const allPhotos = shuffled(
  trips.flatMap((t) => t.photos.map((p) => ({ country: t.name, ...p, tripId: t.id }))),
)

export default function Gallery() {
  const photos = useMemo(() => allPhotos, [])

  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-28 sm:px-10">
      <h1 className="mb-8 text-center font-bold text-3xl text-ink sm:text-4xl">gallery</h1>

      {photos.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-ink/15 bg-lavender/20 p-8 text-center">
          <p className="font-bold text-xl text-ink/60">no photos yet</p>
          <p className="mt-3 text-sm text-ink/40">
            add photos to a trip in{' '}
            <code className="rounded bg-ink/5 px-1">src/data/trips.js</code>, e.g.{' '}
            <code className="rounded bg-ink/5 px-1">
              {'{ src: \'/photos/morocco/1.jpg\', alt: \'...\' }'}
            </code>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-lg shadow-sm">
              <img
                src={photo.src}
                alt={photo.alt ?? photo.country}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.closest('.group').style.display = 'none'
                }}
              />
              <span className="absolute right-1.5 bottom-1.5 rounded bg-ink/60 px-1.5 py-0.5 text-[11px] leading-none text-paper lowercase backdrop-blur-sm">
                {photo.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
