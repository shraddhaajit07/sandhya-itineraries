import { Link } from 'react-router-dom'
import { trips } from '../data/trips'

const countryCount = new Set(trips.flatMap((t) => t.countryCodes)).size
const continentCount = new Set(trips.map((t) => t.continent)).size

// scattered background motifs, echoing the floating stars already next to
// the photo — kept faint (opacity via /20-/25) so they read as texture,
// not decoration competing with the actual content
const MOTIFS = [
  { s: '✦', top: '8%', left: '6%', size: 'text-2xl', color: 'text-lavender/70', rot: -12 },
  { s: '✈', top: '15%', left: '90%', size: 'text-xl', color: 'text-lavender-deep/70', rot: 20 },
  { s: '✦', top: '35%', left: '95%', size: 'text-sm', color: 'text-heart/60', rot: 8 },
  { s: '◈', top: '52%', left: '3%', size: 'text-base', color: 'text-lavender-deep/60', rot: -6 },
  { s: '✦', top: '70%', left: '9%', size: 'text-lg', color: 'text-heart/50', rot: 15 },
  { s: '✈', top: '80%', left: '87%', size: 'text-lg', color: 'text-lavender/70', rot: -18 },
  { s: '✦', top: '92%', left: '48%', size: 'text-sm', color: 'text-lavender-deep/60', rot: 4 },
  { s: '◈', top: '4%', left: '46%', size: 'text-sm', color: 'text-lavender/70', rot: 10 },
]

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {MOTIFS.map((m, i) => (
          <span
            key={i}
            className={`absolute ${m.size} ${m.color}`}
            style={{ top: m.top, left: m.left, transform: `rotate(${m.rot}deg)` }}
          >
            {m.s}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-28 sm:px-10">
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
