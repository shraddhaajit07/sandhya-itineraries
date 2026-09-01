import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldTopology from 'world-atlas/countries-110m.json'
import { islands } from '../data/islands'

const world = feature(worldTopology, worldTopology.objects.countries)

const featureCache = new Map()

// Countries whose geometry bundles in small, far-flung territory (e.g.
// Norway + Svalbard, ~1000km further north than the mainland) get squashed
// into an unrecognizable sliver once framed together. For icon purposes we
// only want the main landmass, so keep just the ring with the most points
// — a reasonable proxy for "the part of this country people mean" at this
// size, same reasoning as the UK/Ireland split.
function mainLandmass(geometry) {
  if (geometry.type !== 'MultiPolygon') return geometry
  const rings = geometry.coordinates
  const biggest = rings.reduce((a, b) => (b[0].length > a[0].length ? b : a))
  return { type: 'Polygon', coordinates: biggest }
}

// `id` is either an ISO 3166-1 numeric country code, or a string key from
// islands.js for places (like individual Hawaiian islands) too small to
// have their own country code.
function getFeature(id) {
  const key = String(id)
  if (featureCache.has(key)) return featureCache.get(key)

  let found = null
  if (islands[key]) {
    found = { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [islands[key]] } }
  } else {
    const raw = world.features.find((f) => f.id === key) ?? null
    found = raw && { ...raw, geometry: mainLandmass(raw.geometry) }
  }

  featureCache.set(key, found)
  return found
}

const pathCache = new Map()

/**
 * Returns an array of SVG path `d` strings, one per country. A single
 * country fills the whole size x size box. Multiple countries each get
 * their own side-by-side cell instead of sharing one true-to-scale
 * projection — neighbors like the UK and Ireland sit close enough in
 * real life that a shared projection makes their outlines overlap and
 * read as a single blob at icon size, so legibility wins over accurate
 * relative scale/position here.
 */
export function getCountryOutlines(numericIds, size = 64, padding = 4) {
  const key = `${numericIds.join(',')}:${size}:${padding}`
  if (pathCache.has(key)) return pathCache.get(key)

  const features = numericIds.map(getFeature).filter(Boolean)
  if (!features.length) {
    pathCache.set(key, [])
    return []
  }

  const cellWidth = size / features.length
  const result = features
    .map((f, i) => {
      const projection = geoMercator().fitExtent(
        [
          [i * cellWidth + padding, padding],
          [(i + 1) * cellWidth - padding, size - padding],
        ],
        f,
      )
      return geoPath(projection)(f)
    })
    .filter(Boolean)

  pathCache.set(key, result)
  return result
}
