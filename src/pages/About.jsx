import { Link } from 'react-router-dom'
import { trips } from '../data/trips'

const countryCount = new Set(trips.flatMap((t) => t.countryCodes)).size
const continentCount = new Set(trips.map((t) => t.continent)).size

// Stars and diamonds only (planes dropped). Spread down both side margins
// plus the empty band below the button at the bottom of the page, instead
// of confined to just the two side strips — still kept clear of the
// photo/card/button columns so they read as texture, not a frame competing
// with the actual content for attention.
const MOTIFS = [
  { s: '✦', top: '5%', left: '2%', size: '60px', color: 'text-lavender', opacity: 0.55, rot: -15 },
  { s: '◈', top: '12%', right: '2%', size: '52px', color: 'text-heart', opacity: 0.5, rot: 12 },
  { s: '◈', top: '28%', left: '1.5%', size: '54px', color: 'text-lavender-deep', opacity: 0.5, rot: -25 },
  { s: '✦', top: '33%', right: '1.5%', size: '56px', color: 'text-lavender', opacity: 0.55, rot: 18 },
  { s: '◈', top: '56%', left: '2%', size: '54px', color: 'text-heart', opacity: 0.5, rot: 8 },
  { s: '✦', top: '58%', right: '2%', size: '58px', color: 'text-lavender-deep', opacity: 0.5, rot: -10 },
  { s: '✦', top: '92%', left: '18%', size: '52px', color: 'text-lavender', opacity: 0.55, rot: 20 },
  { s: '◈', top: '92%', right: '18%', size: '50px', color: 'text-heart', opacity: 0.5, rot: -14 },
]

export default function About() {
  return (
    <div className="relative overflow-hidden">
      {/* z-index:-10 here was the actual bug this whole time — negative
          z-index renders BEHIND the page's own opaque body background, so
          it was invisible in every real browser, not just my screenshot
          tool. Fix: leave this layer at the default stack level and instead
          give the real content an explicit z-10 below, so it's guaranteed
          to paint above the motifs no matter what. `absolute` (not `fixed`)
          so these scroll along with the page instead of pinning to the
          viewport. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {MOTIFS.map((m, i) => (
          <span
            key={i}
            className={`absolute leading-none ${m.color}`}
            style={{
              top: m.top,
              left: m.left,
              right: m.right,
              fontSize: m.size,
              opacity: m.opacity,
              transform: `rotate(${m.rot}deg)`,
            }}
          >
            {m.s}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-28 sm:px-10">
        <div className="grid items-start justify-center gap-16 md:grid-cols-[auto_minmax(0,32rem)]">
          {/* photo + contacts */}
          <div className="mx-auto flex w-64 shrink-0 flex-col items-center gap-6 sm:w-72">
            <div className="relative w-full">
              <span
                className="animate-float absolute -top-6 -left-8 text-3xl text-lavender-deep"
                style={{ '--rot': '-10deg' }}
              >
                ✦
              </span>
              <span
                className="animate-float absolute -right-4 top-1/3 text-2xl text-lavender-deep"
                style={{ '--rot': '8deg', animationDelay: '1.2s' }}
              >
                ✦
              </span>

              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border-4 border-paper bg-lavender/50 shadow-lg">
                <img
                  src="/photos/sandhya.jpg"
                  alt="Sandhya"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>

            {/* contacts */}
            <div className="space-y-1.5 text-center text-sm">
              <a
                href="https://instagram.com/sandhya.kollath"
                target="_blank"
                rel="noreferrer"
                className="block font-semibold text-ink/70 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-lavender-deep hover:decoration-lavender-deep"
              >
                ig: @sandhya.kollath
              </a>
              <a
                href="mailto:sandhya.ajit@gmail.com"
                className="block font-semibold text-ink/70 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-lavender-deep hover:decoration-lavender-deep"
              >
                sandhya.ajit@gmail.com
              </a>
            </div>
          </div>

          {/* intro speech bubble */}
          <div className="relative">
            <div className="relative rounded-3xl bg-lavender/20 px-8 py-9 shadow-sm sm:px-10 sm:py-10">
              <div className="absolute top-10 -left-3 hidden h-6 w-6 rotate-45 bg-lavender/20 md:block" />
              <p className="font-bold text-2xl text-ink sm:text-3xl">hi, I'm Sandhya!</p>
              <p className="mt-5 text-base leading-relaxed text-ink/85 sm:text-lg">
                I love traveling and I am type A, so here are my well thought out and
                super detailed itineraries! Every trip is planned to be practical and
                cost-efficient, while still covering everything worth seeing, eating,
                doing, and buying. From my family to yours.
              </p>
              <p className="mt-5 font-bold text-lg text-ink sm:text-xl">
                check these out, leave comments!!
              </p>
              <p className="mt-6 text-right font-italic text-lg text-ink/70">xo!</p>
            </div>

            {/* stat chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              <StatChip value={trips.length} label="trips planned" />
              <StatChip value={countryCount} label="countries" />
              <StatChip value={continentCount} label="continents" />
            </div>

            <Link
              to="/itineraries"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-lg text-paper shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              see the itineraries <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatChip({ value, label }) {
  return (
    <div className="flex items-baseline gap-2 rounded-full border border-ink/10 bg-paper px-4 py-2 shadow-sm">
      <span className="font-bold text-xl text-lavender-deep">{value}</span>
      <span className="text-sm text-ink/60">{label}</span>
    </div>
  )
}
