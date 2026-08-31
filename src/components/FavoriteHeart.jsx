export default function FavoriteHeart({ active, onToggle, size = 'md' }) {
  const dims = size === 'lg' ? 'h-10 w-10 text-4xl' : 'h-8 w-8 text-2xl'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={active ? 'remove from favorites' : 'save to favorites'}
      aria-pressed={active}
      className={`flex ${dims} items-center justify-center leading-none transition-transform hover:scale-110 active:scale-95`}
    >
      <span
        className={`transition-colors ${active ? 'text-heart' : 'text-ink/25 hover:text-heart/60'}`}
        style={{ WebkitTextStroke: active ? '0' : '1.5px currentColor' }}
      >
        {active ? '❤' : '♡'}
      </span>
    </button>
  )
}
