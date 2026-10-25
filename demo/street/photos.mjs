// The photographs of the "Adriano Amalfi" demo: urban photography from adrianoamalfi.com/photos. The files are
// downloaded when the demo is built (never committed). Fields as in demo/mara/photos.mjs.

export const SERIES = [
    {
        slug: 'rome',
        name: 'Rome',
        cover: 'CAS',
        description: 'Stations, bridges, streets and museums of one city.',
    },
    {
        slug: 'away',
        name: 'Away',
        cover: 'AMS',
        description: 'Squares, stations and bridges in Milan, Amsterdam and Copenhagen.',
    },
    {
        slug: 'after-dark',
        name: 'After Dark',
        cover: 'TWR',
        description: 'Lights after sunset, from L’Aquila to London and Berlin.',
    },
];

export const PHOTOS = [
    // ---- Rome
    {
        key: 'CAS', series: 'rome', title: 'Castel Sant’Angelo', slug: 'castel-santangelo', place: 'Rome', featured: true,
        alt: 'Rooftops of Rome seen from Castel Sant’Angelo at sunset, a large dome rising above them',
        excerpt: 'Rome’s rooftops at sunset, seen from the castle.',
        note: 'The view from the top of the castle, with the sun low over the rooftops and a dome standing out against the sky.',
    },
    {
        key: 'PON', series: 'rome', title: 'Ponte Sant’Angelo', slug: 'ponte-santangelo', place: 'Rome',
        alt: 'Ponte Sant’Angelo across the Tiber, a dome rising behind the buildings',
        excerpt: 'The bridge, the river and the buildings behind it.',
        note: 'The bridge seen from the riverside, with the stone arches doubling in the water.',
    },
    {
        key: 'NAZ', series: 'rome', title: 'Via Nazionale', slug: 'via-nazionale', place: 'Rome',
        alt: 'A double exposure of an arched building on Via Nazionale, in muted sepia tones',
        excerpt: 'A double exposure on one of Rome’s main streets.',
        note: 'Two exposures layered into one frame, so the arches of the building and the street dissolve into each other.',
    },
    {
        key: 'TER', series: 'rome', title: 'Roma Termini', slug: 'roma-termini', place: 'Rome',
        alt: 'The long roof over the tracks at Roma Termini, the station name on a wall and an orange sky at dusk',
        excerpt: 'The roof over the tracks, at the end of the day.',
        note: 'The station roof and its name at dusk, with the sky turning orange behind the city.',
    },
    {
        key: 'MAX', series: 'rome', title: 'MAXXI', slug: 'maxxi', place: 'Rome',
        alt: 'The angular concrete and glass front of the MAXXI museum under a blue sky, bare trees beside it',
        excerpt: 'Concrete, glass and a clear winter sky.',
        note: 'The long, angular volumes of the museum against a blue sky, with bare trees at the edge of the frame.',
    },

    // ---- Away
    {
        key: 'GAE', series: 'away', title: 'Piazza Gae Aulenti', slug: 'piazza-gae-aulenti', place: 'Milan',
        alt: 'Glass towers rising above Piazza Gae Aulenti, with a building under scaffolding at the right',
        excerpt: 'Glass towers, and a building still under scaffolding.',
        note: 'Looking up from the square: glass towers on one side, a building still wrapped in scaffolding on the other.',
    },
    {
        key: 'AMS', series: 'away', title: 'Amsterdam Centraal', slug: 'amsterdam-centraal', place: 'Amsterdam', featured: true,
        alt: 'A steel and glass canopy along the water at Amsterdam Centraal, its walkway striped with light and shadow',
        excerpt: 'A glass canopy by the water, striped with light.',
        note: 'The canopy along the waterfront side of the station, with the walkway cut into stripes of light and shadow.',
    },
    {
        key: 'CPH', series: 'away', title: 'Copenhagen Airport', slug: 'copenhagen-airport', place: 'Copenhagen',
        alt: 'A parked airliner on the apron at Copenhagen Airport, in high-contrast, washed-out tones',
        excerpt: 'An airliner on the apron, in washed-out tones.',
        note: 'A parked aircraft on the apron, printed in high-contrast, desaturated tones.',
    },
    {
        key: 'ORE', series: 'away', title: 'Øresund Bridge', slug: 'oresund-bridge', place: 'Between Copenhagen and Malmö',
        alt: 'Looking out through the dark steel girders of a bridge toward a grey sea and sky',
        excerpt: 'Grey sea, grey sky, and a girder crossing the frame.',
        note: 'A dark girder cutting across a window view of the sea and the sky from the bridge.',
    },

    // ---- After Dark
    {
        key: 'AQU', series: 'after-dark', title: 'L’Aquila at Night', slug: 'laquila-at-night', place: 'L’Aquila',
        alt: 'A square in L’Aquila at night, strings of lights over wet cobblestones and trees',
        excerpt: 'Strings of lights over a wet square.',
        note: 'A square after dark, with strings of lights over the trees and wet cobblestones reflecting them.',
    },
    {
        key: 'TWR', series: 'after-dark', title: 'Tower Bridge', slug: 'tower-bridge', place: 'London', featured: true,
        alt: 'Tower Bridge lit at night, reflected in the Thames',
        excerpt: 'The bridge and its reflection in the Thames.',
        note: 'Tower Bridge lit against the night sky, with its reflection broken up by the current.',
    },
    {
        key: 'BRA', series: 'after-dark', title: 'Brandenburg Gate', slug: 'brandenburg-gate', place: 'Berlin',
        alt: 'The Brandenburg Gate at night, with red and white light trails in the foreground',
        excerpt: 'The gate at night, with traffic as light trails.',
        note: 'The gate lit at night, with the traffic in front of it drawn out into red and white trails.',
    },
    {
        key: 'PIS', series: 'after-dark', title: 'Sphere of Newspapers', slug: 'sphere-of-newspapers', place: 'Chiostro del Bramante, Rome',
        alt: 'A large sphere covered in newspaper pages, glowing in a dark room, a visitor’s silhouette at its edge',
        excerpt: 'Michelangelo Pistoletto’s sphere, glowing in a dark room.',
        note: 'Michelangelo Pistoletto’s sphere of newspapers, lit in a dark room, with a visitor’s silhouette at the edge of the frame.',
    },
];

// The portrait is the About page's picture, the author's avatar and the home hero's portrait
export const EXTRA = { about: 'AVATAR', avatar: 'AVATAR' };
