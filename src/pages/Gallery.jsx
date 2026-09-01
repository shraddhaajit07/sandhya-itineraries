import { Link } from 'react-router-dom'
import { trips } from '../data/trips'

const withPhotos = trips.filter((t) => t.photos.length)

export default function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-28 sm:px-10">
      <h1 className="mb-8 text-center font-bold text-3xl text-ink sm:text-4xl">gallery</h1>

      {withPhotos.length === 0 ? (
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
        <div className="space-y-14">
          {withPhotos.map((trip) => (
            <section key={trip.id}>
              <Link
                to={`/itineraries/${trip.id}`}
                className="mb-4 inline-block font-bold text-xl text-ink transition-colors hover:text-lavender-deep lowercase"
              >
                {trip.name}
              </Link>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {trip.photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo.src}
                    alt={photo.alt ?? `${trip.name} photo ${i + 1}`}
                    className="aspect-square w-full rounded-lg object-cover shadow-sm"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
