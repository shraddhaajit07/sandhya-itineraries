const SORTS = [
  { key: 'default', label: 'a–z' },
  { key: 'days-asc', label: 'shortest trip' },
  { key: 'days-desc', label: 'longest trip' },
  { key: 'cost-asc', label: 'cheapest' },
  { key: 'cost-desc', label: 'priciest' },
]

export default function FilterBar({
  continents,
  activeContinent,
  onContinentChange,
  sortKey,
  onSortChange,
  favoritesOnly,
  onToggleFavoritesOnly,
}) {
  return (
    <div className="mx-auto mb-10 flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 text-sm">
      <button
        type="button"
        onClick={() => onContinentChange('all')}
        className={`rounded-full border px-3.5 py-1.5 transition-colors ${
          activeContinent === 'all'
            ? 'border-ink bg-ink text-paper'
            : 'border-ink/15 text-ink/70 hover:border-ink/40'
        }`}
      >
        all
      </button>
      {continents.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onContinentChange(c)}
          className={`rounded-full border px-3.5 py-1.5 transition-colors ${
            activeContinent === c
              ? 'border-ink bg-ink text-paper'
              : 'border-ink/15 text-ink/70 hover:border-ink/40'
          }`}
        >
          {c.toLowerCase()}
        </button>
      ))}

      <span className="mx-1 h-5 w-px bg-ink/10" />

      <button
        type="button"
        onClick={onToggleFavoritesOnly}
        className={`rounded-full border px-3.5 py-1.5 transition-colors ${
          favoritesOnly
            ? 'border-heart bg-heart text-paper'
            : 'border-ink/15 text-ink/70 hover:border-heart/50'
        }`}
      >
        {favoritesOnly ? '❤' : '♡'} favorites
      </button>

      <span className="mx-1 h-5 w-px bg-ink/10" />

      <select
        value={sortKey}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-ink/70 outline-none hover:border-ink/40"
      >
        {SORTS.map((s) => (
          <option key={s.key} value={s.key}>
            sort: {s.label}
          </option>
        ))}
      </select>
    </div>
  )
}
