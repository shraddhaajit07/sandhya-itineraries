// Add a new trip by copying an object below. `countryCodes` are ISO 3166-1
// numeric codes (used to draw the country outline) — see
// https://en.wikipedia.org/wiki/ISO_3166-1_numeric for lookups.
//
// `docUrl` is the doc's preview-embed link: take the normal share/edit URL
// (docs.google.com/document/d/THE_ID/edit...) and swap the ending for
// `/preview`, e.g. https://docs.google.com/document/d/THE_ID/preview
// The doc's sharing setting must be "Anyone with the link" (Viewer is fine)
// or the embed will show a permission screen instead of the doc.

export const continents = [
  'Africa',
  'Europe',
  'South America',
  'Asia',
  'Oceania',
  'North America',
]

export const trips = [
  {
    id: 'morocco',
    name: 'Morocco',
    continent: 'Africa',
    countryCodes: [504],
    season: 'December',
    days: 10,
    costPerPerson: 1800,
    partySize: 4,
    flyInOut: 'Marrakech → Marrakech',
    climate: 'Warm days, freezing desert nights',
    terrain: 'Desert, mountains, coastal medinas',
    vibe: 'Adventurous, cultural, off-road',
    regions: ['Marrakech', 'Atlas Mountains', 'Dades Gorge', 'Erg Chebbi / Sahara', 'Ouarzazate'],
    docUrl: 'https://docs.google.com/document/d/1fDWkxiM6Rr5Iu9AQ4ZLnCWNWOg5bqW0r/preview',
    photos: [],
  },
  {
    id: 'spain',
    name: 'Spain',
    continent: 'Europe',
    countryCodes: [724],
    season: 'June',
    days: 12,
    costPerPerson: 2400,
    partySize: 4,
    flyInOut: 'Madrid → Barcelona',
    climate: 'Hot, dry summer days',
    terrain: 'Cities, coastline, countryside',
    vibe: 'Food-focused, walkable, lively',
    regions: ['Madrid', 'Seville', 'Granada', 'Barcelona'],
    docUrl: 'https://docs.google.com/document/d/1aXb5Hh9h2XTUCfgqZozLPcF8pvQz1AZW/preview',
    photos: [],
  },
  {
    id: 'peru',
    name: 'Peru',
    continent: 'South America',
    countryCodes: [604],
    season: 'July',
    days: 9,
    costPerPerson: 2100,
    partySize: 4,
    flyInOut: 'Lima → Lima',
    climate: 'Cool, dry highlands; humid Amazon edge',
    terrain: 'Andes mountains, high desert, jungle edge',
    vibe: 'Bucket-list hiking, high altitude, historic',
    regions: ['Lima', 'Sacred Valley', 'Machu Picchu', 'Cusco'],
    docUrl: '',
    photos: [],
  },
  {
    id: 'iceland',
    name: 'Iceland',
    continent: 'Europe',
    countryCodes: [352],
    season: 'September',
    days: 7,
    costPerPerson: 2600,
    partySize: 2,
    flyInOut: 'Reykjavík → Reykjavík',
    climate: 'Cold, windy, ever-changing',
    terrain: 'Glaciers, volcanoes, waterfalls, black sand',
    vibe: 'Self-drive, remote, dramatic scenery',
    regions: ['Reykjavík', 'Golden Circle', 'South Coast', 'Snaefellsnes'],
    docUrl: '',
    photos: [],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    continent: 'Africa',
    countryCodes: [834],
    season: 'August',
    days: 8,
    costPerPerson: 3200,
    partySize: 4,
    flyInOut: 'Kilimanjaro → Zanzibar',
    climate: 'Dry season, warm days, cool nights',
    terrain: 'Savanna, crater highlands, beach',
    vibe: 'Safari, once-in-a-lifetime, relaxed finish',
    regions: ['Serengeti', 'Ngorongoro Crater', 'Lake Manyara', 'Zanzibar'],
    docUrl: '',
    photos: [],
  },
  {
    id: 'scotland-ireland',
    name: 'Scotland & Ireland',
    continent: 'Europe',
    countryCodes: [826, 372],
    season: 'May',
    days: 14,
    costPerPerson: 2900,
    partySize: 4,
    flyInOut: 'Edinburgh → Dublin',
    climate: 'Mild, rainy, layers required',
    terrain: 'Highlands, coastline, cliffs, castles',
    vibe: 'Scenic road trip, castles, cozy pubs',
    regions: ['Edinburgh', 'Isle of Skye', 'Belfast', 'Cliffs of Moher', 'Dublin'],
    docUrl: '',
    photos: [],
  },
]

export function getTrip(id) {
  return trips.find((t) => t.id === id)
}
