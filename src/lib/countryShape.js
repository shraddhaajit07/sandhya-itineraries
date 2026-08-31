import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldTopology from 'world-atlas/countries-110m.json'

const world = feature(worldTopology, worldTopology.objects.countries)

const featureCache = new Map()

function getFeature(numericId) {
  const key = String(numericId)
  if (featureCache.has(key)) return featureCache.get(key)
  const found = world.features.find((f) => f.id === key) ?? null
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
