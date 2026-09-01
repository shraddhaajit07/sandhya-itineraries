const PALETTE = ['#b99368', '#7f9187', '#c1683e', '#93a17c', '#a17f52', '#8a9a8f']

function Placeholder({ label, i }) {
  return (
    <div
      className="flex aspect-[4/5] w-full items-center justify-center rounded-lg text-center font-medium text-sm text-ink/50"
      style={{ background: PALETTE[i % PALETTE.length] + '80' }}
    >
      {label}
    </div>
  )
}

function Tile({ photo, i }) {
  if (!photo) return <Placeholder label="add a photo!" i={i} />
  return (
    <img
      src={photo.src}
      alt={photo.alt ?? ''}
      className="aspect-[4/5] w-full rounded-lg object-cover shadow-sm"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

// Only trips' `featured` photos show up here — mark a photo
// `{ src, alt, featured: true }` in trips.js to put it in the strip.
// Everything else (featured or not) still shows on the full /gallery page.
export default function PhotoStrip({ trips }) {
  const featured = trips.flatMap((t) => t.photos.filter((p) => p.featured).map((p) => ({ photo: p, label: t.name })))

  const slots = featured.length ? featured : trips.map((t) => ({ photo: null, label: t.name }))
  const loop = [...slots, ...slots]

  // fixed-length loops feel jarring — a 6-photo strip and a 60-photo strip
  // shouldn't scroll at the same speed, so pace it by how much content there is
  const duration = Math.max(20, slots.length * 4)

  return (
    <div className="relative mx-auto h-[520px] w-40 overflow-hidden rounded-2xl bg-lavender/30 sm:w-48 md:h-[620px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-paper to-transparent" />
      <div className="animate-scroll-up flex flex-col gap-3 p-3" style={{ animationDuration: `${duration}s` }}>
        {loop.map((slot, i) => (
          <Tile key={i} photo={slot.photo} i={i} />
        ))}
      </div>
    </div>
  )
}
