function Row({ label, value }) {
  if (!value) return null
  return (
    <li>
      <span className="font-semibold text-ink">{label}: </span>
      <span className="text-ink/80">{value}</span>
    </li>
  )
}

export default function QuickFacts({ trip }) {
  return (
    <div className="rounded-2xl bg-lavender/60 p-6 sm:p-7">
      <p className="mb-4 font-bold text-lg text-ink">at a glance</p>
      <ul className="space-y-2.5 text-sm leading-relaxed sm:text-base">
        <Row label="Regions visited" value={trip.regions.join(', ')} />
        <Row label="Length" value={`${trip.days} days`} />
        <Row label="Fly in / out" value={trip.flyInOut} />
        <Row
          label="Cost"
          value={
            trip.costPerPerson
              ? `~$${trip.costPerPerson.toLocaleString()} per person (party of ${trip.partySize})`
              : null
          }
        />
        <Row label="Best season" value={trip.season} />
        <Row label="Climate" value={trip.climate} />
        <Row label="Terrain" value={trip.terrain} />
        <Row label="Vibe" value={trip.vibe} />
      </ul>
    </div>
  )
}
