// The photographs of the demo: which Wikimedia Commons file, which series, and the words around it.
// Technical data (camera, lens settings, date) comes from the files' own EXIF via sources.json; credits from Commons.
// Fields: key (see sources.json), series, title, alt (what is in the frame), excerpt (one line), note (the paragraph),
// place, cam (camera label), plus optional featured / visibility / credit overrides.

export const SERIES = [
    {
        slug: 'white-season',
        name: 'White Season',
        cover: 'A7',
        description:
            'Winter in the northern hemisphere: fog, frost and the particular quiet of snow. Six photographs from Austria, Germany, Slovakia, Sweden, Poland and Canada.',
    },
    {
        slug: 'still-water',
        name: 'Still Water',
        cover: 'A47',
        description: 'Lakes at the edges of the day. Reflections, fog and the long exposures that smooth them.',
    },
    {
        slug: 'salt-and-stone',
        name: 'Salt & Stone',
        cover: 'B4',
        description: 'Coasts, cliffs and the lighthouses that mark them, from Normandy to Lake Baikal.',
    },
    {
        slug: 'after-dark',
        name: 'After Dark',
        cover: 'C41',
        description: 'Cities after sunset: blue hour, long exposures and neon.',
    },
    {
        slug: 'quiet-rooms',
        name: 'Quiet Rooms',
        cover: 'D23',
        description: 'Staircases, doors and the geometry of interiors, looking up and looking down.',
    },
    {
        slug: 'wild-hours',
        name: 'Wild Hours',
        cover: 'E3',
        description: 'Dawn mist, desert silence and the animals that share them.',
    },
];

export const PHOTOS = [
    // ---- White Season
    {
        key: 'A3', series: 'white-season', title: 'Spruce Hush', slug: 'spruce-hush', cam: 'Nikon D4',
        alt: 'Dense spruce forest dusted with fresh snow on a hillside, seen at a distance in flat winter light',
        excerpt: 'A long lens turns a Carinthian hillside into a pattern of dark spires.',
        place: 'Saint Martin, Carinthia, Austria',
        note: 'A long lens flattens a snowy slope into a pattern of dark spires. At 250 mm and f/11 every tree stays sharp from front to back, and the overcast sky does the rest of the work: no shadows to manage, only texture.',
    },
    {
        key: 'A4', series: 'white-season', title: 'First Light, Hausdülmen', slug: 'first-light-hausdulmen', cam: 'Canon EOS 70D',
        alt: 'A bare tree silhouetted against an orange winter sunrise over a flat, snow-covered field',
        excerpt: 'One tree, one field, ten quiet minutes before the colour left the sky.',
        place: 'Dülmen, North Rhine-Westphalia, Germany',
        note: 'Flat country makes the sky the subject. I look for a single object to anchor the frame, here one bare tree, and then wait for the colour to peak. It never lasts more than a few minutes.',
    },
    {
        key: 'A7', series: 'white-season', title: 'Pink Hour, Sninský kameň', slug: 'pink-hour-sninsky-kamen', cam: 'Sony Cyber-shot RX100',
        alt: 'Rime-covered ridges glowing pink and violet at sunrise above a mist-filled valley',
        excerpt: 'Frozen ridges at sunrise, photographed with a compact camera.',
        place: 'Sninský kameň, Slovakia', featured: true,
        note: 'Not every good photograph needs a big camera. This one was made with a pocket compact, which is exactly why it exists: the heavy kit stayed at home, and the light did not care.',
    },
    {
        key: 'A16', series: 'white-season', title: 'Saint-Charles Cemetery', slug: 'saint-charles-cemetery', cam: 'Nikon Z 7II',
        alt: 'A snow-covered cemetery in fog, with bare trees and rows of gravestones in soft grey light',
        excerpt: 'Fog removes the background; what is left is rhythm.',
        place: 'Quebec City, Canada',
        note: 'Fog is a free studio backdrop. It removes the distance, separates the nearest stones from the farthest, and leaves the rhythm of the rows. I exposed to the right so the whites stayed white instead of turning grey.',
    },
    {
        key: 'A19', series: 'white-season', title: 'Walking Through Trees', slug: 'walking-through-trees', cam: 'Canon EOS 600D',
        alt: 'Vertical blurred tree trunks in a snowy forest, painted in pale blue and white by deliberate camera movement',
        excerpt: 'Intentional camera movement: a forest painted with a sixth of a second.',
        place: 'Myrstigen trail, Brastad, Sweden',
        note: 'Intentional camera movement, or ICM: a slow shutter, a steady vertical sweep, and a forest becomes a painting. At 1/6 s and f/29 the trunks smear into stripes while the light keeps its colour. Read the full how-to in the Journal.',
    },
    {
        key: 'A23', series: 'white-season', title: 'Chapel of the Snows', slug: 'chapel-of-the-snows', cam: 'Nikon D750',
        alt: 'A small chapel on a snow-covered hill under golden light, with a mountain range behind',
        excerpt: 'A small chapel, a big range, and the warm light of the last hour.',
        place: 'Kacwin, Lesser Poland, Poland',
        note: 'Scale is the whole story here. A small chapel on a white hill, the Tatra range behind it, and warm low light raking across the snow. A 400 mm lens compresses the layers so the mountains feel close enough to touch.',
    },

    // ---- Still Water
    {
        key: 'A13', series: 'still-water', title: 'Winter Mirror', slug: 'winter-mirror', cam: 'Nikon D7500',
        alt: 'A mountain lake in winter, mirroring bare reeds and dusted peaks under a clear blue sky',
        excerpt: 'Reeds, peaks and a lake with nothing to disturb it.',
        place: 'Lake Stymphalia, Peloponnese, Greece',
        note: 'Windless mornings are rare enough that I plan around them. When the surface is a mirror the composition has a hidden axis; the trick is to put the horizon where the symmetry feels deliberate rather than accidental.',
    },
    {
        key: 'A29', series: 'still-water', title: 'Grinnell Point', slug: 'grinnell-point', cam: 'Canon EOS 5D Mark III', featured: false,
        alt: 'A very wide panorama of a still lake reflecting snow-capped mountains and the sky',
        excerpt: 'A four-to-one panorama over Lake Sherburne.',
        place: 'Lake Sherburne, Montana, USA', credit: 'Glacier National Park / NPS',
        note: 'A panorama asks the viewer to walk along the picture instead of looking at it. This one is almost four times wider than it is tall, so it works best large, on a wall, where you can take your time.',
    },
    {
        key: 'A47', series: 'still-water', title: 'Receding Fog', slug: 'receding-fog', cam: 'Nikon D850',
        alt: 'Morning fog lifting from a lake, with a lone bare tree standing in the water in pale gold light',
        excerpt: 'A lone tree and the minutes when the fog decides to leave.',
        place: 'Lake Altaussee, Styria, Austria',
        note: 'Fog moves faster than you expect. I framed the lone tree, set the camera to a fast shutter, and waited for the gaps to open. The pale gold in the middle distance lasted less than two minutes.',
    },
    {
        key: 'A38', series: 'still-water', title: 'Clearwater at Dawn', slug: 'clearwater-at-dawn', cam: 'Canon EOS 6D',
        alt: 'A snow-capped mountain reflected in a calm lake, with dry branches in the foreground at dawn',
        excerpt: 'Dry branches in front, snow behind, and the whole lake held still.',
        place: 'Lake Clearwater, Canterbury, New Zealand',
        note: 'A foreground element gives a reflection somewhere to begin. The dry branches here do that job: they lead the eye into the water and across to the snow on the far side.',
    },
    {
        key: 'A26', series: 'still-water', title: 'Kinney Lake', slug: 'kinney-lake', cam: 'Nikon D7000',
        alt: 'A turquoise lake mirroring a snowy peak and forested slopes in the Canadian Rockies',
        excerpt: 'Two seconds at f/11 for the colour of glacier water.',
        place: 'Kinney Lake, Mount Robson Provincial Park, Canada',
        note: 'Glacial silt gives this lake its colour, and a two-second exposure gives the surface its calm. A polarising filter would cut the glare; here the reflection is the point, so the filter stays in the bag.',
    },
    {
        key: 'A33', series: 'still-water', title: 'Lake Mary, September', slug: 'lake-mary-september', cam: 'Nikon D7000',
        alt: 'Pine trees and a rust-coloured hillside reflected in still lake water in early autumn',
        excerpt: 'The first week of autumn, doubled by the water.',
        place: 'Lake Mary, Mono County, California, USA',
        note: 'Early autumn is a short window. The pines stay green, the hillside turns rust, and the lake holds both. Shoot at the edge of the day and the contrast between the two takes care of itself.',
    },

    // ---- Salt & Stone
    {
        key: 'B4', series: 'salt-and-stone', title: 'Rubjerg at Dusk', slug: 'rubjerg-at-dusk', cam: 'Canon EOS 5D Mark IV', featured: true,
        alt: 'A white lighthouse on a sand dune under a smooth pink and lilac sky after sunset',
        excerpt: 'Five minutes of exposure, one lighthouse, a sky like brushed silk.',
        place: 'Rubjerg Knude Fyr, Hjørring, Denmark',
        note: 'A five-minute exposure at f/11 and ISO 50 smears the clouds into a soft wash of colour while the lighthouse and the dune stay crisp. Long exposures reward patience and a tripod that does not mind the wind.',
    },
    {
        key: 'B9', series: 'salt-and-stone', title: "Falaises d'Amont", slug: 'falaises-d-amont', cam: 'Canon PowerShot G15',
        alt: 'White chalk cliffs arching over a pebble beach and a dark wave-cut platform at low tide',
        excerpt: 'Chalk, flint and the low tide that reveals the platform.',
        place: 'Étretat, Normandy, France',
        note: 'At low tide the wave-cut platform becomes a foreground the sea usually hides. The cliffs are chalk, the dark bands are flint, and the arch in the distance is why everyone comes here.',
    },
    {
        key: 'B14', series: 'salt-and-stone', title: 'Capes of Olkhon', slug: 'capes-of-olkhon', cam: 'Sony SLT-A55',
        alt: 'Golden cliffs and rocky capes along a lake coast at sunset, seen from the water',
        excerpt: 'Lake Baikal in the last hour, seen from the water.',
        place: 'Olkhon Island, Lake Baikal, Russia',
        note: 'Baikal is a lake, but at this size the horizon behaves like the sea. Low sun lifts every fold in the cliffs; a slightly faster shutter than you would think keeps the boat-borne frame sharp.',
    },
    {
        key: 'B28', series: 'salt-and-stone', title: 'Storm Over Port-la-Nouvelle', slug: 'storm-over-port-la-nouvelle', cam: 'Canon EOS 5D Mark III', featured: true,
        alt: 'Lightning forking above a long pier and a lighthouse under a violet storm sky at night',
        excerpt: 'A pier, a lighthouse and several lightning strikes in one frame.',
        place: 'Port-la-Nouvelle, Aude, France',
        note: 'Lightning photography is mostly patience and a sturdy tripod. A long exposure at a closed aperture collects every strike that happens while the shutter is open, and the pier gives them somewhere to land.',
    },
    {
        key: 'B33', series: 'salt-and-stone', title: 'Star Trails at La Hague', slug: 'star-trails-at-la-hague', cam: 'Stack of 250 frames', visibility: 'paid',
        alt: 'Concentric star trails over a lighthouse beam at blue hour on the Normandy coast',
        excerpt: 'Two hours of sky, stacked into one photograph. A Print Club photograph.',
        place: 'Cap de la Hague, Normandy, France', exposure: '250 × 30 s, light-stacked',
        note: 'Star trails like this are not one long exposure but a stack: 250 frames of 30 seconds each, combined so the sky draws circles around the pole while the lighthouse and the foreground stay clean.',
    },
    {
        key: 'B34', series: 'salt-and-stone', title: 'Punta Insua', slug: 'punta-insua', cam: 'Panasonic Lumix GX80',
        alt: 'A black-and-white view of a lighthouse and low stone buildings under dramatic clouds',
        excerpt: 'A lighthouse in black and white, because the sky was the better colour.',
        place: 'Carnota, Galicia, Spain',
        note: 'Some skies are stronger without colour. Converting this to black and white pushed the clouds forward and let the lighthouse and its low buildings sit in the middle of the frame like a stage set.',
    },

    // ---- After Dark
    {
        key: 'C13', series: 'after-dark', title: 'Dōtonbori', slug: 'dotonbori', cam: 'Canon EOS 5D Mark III', visibility: 'members',
        alt: 'A tall wall of neon signboards above a night canal, in a vertical frame',
        excerpt: 'Neon stacked to the sky. A members-only photograph.',
        place: 'Dōtonbori canal, Osaka, Japan',
        note: 'Neon this bright needs less exposure than you expect. A third of a second at f/8 and ISO 100 keeps the signs readable and lets the reflections in the canal soften.',
    },
    {
        key: 'C9', series: 'after-dark', title: 'Rocinha at Night', slug: 'rocinha-at-night', cam: 'Nikon D800',
        alt: 'A wide night panorama of a hillside neighbourhood glowing with orange lights under a mountain silhouette',
        excerpt: 'A hillside of lights in a panorama more than twice as wide as it is tall.',
        place: 'Rocinha, Rio de Janeiro, Brazil',
        note: 'A night panorama is a patience exercise: ten-second exposures, a level tripod and a slow, overlapping sweep. The result is a hillside you can read like a map, window by window.',
    },
    {
        key: 'C41', series: 'after-dark', title: 'Groenerei, Bruges', slug: 'groenerei-bruges', cam: 'Canon EOS 5D Mark IV', featured: true,
        alt: 'Medieval brick buildings reflected in a canal at blue hour, with lit windows glowing',
        excerpt: 'Blue hour on a canal built for boats, now used for photographs.',
        place: 'Groenerei, Bruges, Belgium',
        note: 'Blue hour is the sweet spot: the sky still has colour, the windows are already lit, and a thirteen-second exposure turns the canal into a second picture of the street.',
    },
    {
        key: 'C36', series: 'after-dark', title: 'Wasserschloss', slug: 'wasserschloss', cam: 'Canon EOS 70D',
        alt: 'A red-brick warehouse district reflected in a canal at night, with a moated building in the centre',
        excerpt: 'Hamburg\'s warehouse district, doubled by a canal.',
        place: 'Speicherstadt, Hamburg, Germany',
        note: 'The Speicherstadt is a gift for night work: red brick that glows under sodium light, canals for reflections, and bridges that give you a steady place to put the tripod.',
    },
    {
        key: 'C28', series: 'after-dark', title: 'Tower Bridge at Dusk', slug: 'tower-bridge-at-dusk', cam: 'Stitched mosaic', exposure: 'mosaic of about twenty frames',
        alt: 'Tower Bridge lit against a deep blue dusk sky over the River Thames',
        excerpt: 'A famous bridge made new by about twenty stitched frames.',
        place: 'Tower Bridge, London, United Kingdom',
        note: 'A single frame cannot hold a bridge this detailed at this size, so the picture is a mosaic of about twenty exposures, stitched into one very large file you can look into at print size.',
    },
    {
        key: 'C38', series: 'after-dark', title: 'Vasabron', slug: 'vasabron', cam: 'Nikon D750',
        alt: 'The Vasa Bridge and the towers of Stockholm City Hall under a pastel sky, reflected in the water',
        excerpt: 'The last pastel minutes over Stockholm.',
        place: 'Vasabron, Stockholm, Sweden',
        note: 'The best part of a city at night is often the half hour before it, when the sky is still lit and the streetlights have already come on. A sixth of a second was enough to keep the water calm.',
    },

    // ---- Quiet Rooms
    {
        key: 'D4', series: 'quiet-rooms', title: 'Art Déco Spiral', slug: 'art-deco-spiral', cam: 'Olympus OM-D E-P5',
        alt: 'A red art déco spiral staircase seen from below, curves converging at the centre',
        excerpt: 'Red curves converging from a 1930s skyscraper.',
        place: 'Nebotičnik, Ljubljana, Slovenia',
        note: 'Look straight up a spiral staircase and the architecture does the composing for you. The only decisions are how centred to be and whether to let the railing touch the frame.',
    },
    {
        key: 'D8', series: 'quiet-rooms', title: 'City Hall Spiral', slug: 'city-hall-spiral', cam: 'Sony Alpha 77 II',
        alt: 'A black-and-white view up a spiral staircase, with curves repeating toward a bright centre',
        excerpt: 'London City Hall in black and white, a staircase as a seashell.',
        place: 'City Hall, London, United Kingdom',
        note: 'Black and white strips the colour of the carpet and leaves the geometry. The staircase turns into a seashell, and the bright centre becomes the point everything else is pointing at.',
    },
    {
        key: 'D10', series: 'quiet-rooms', title: 'Wooden Spiral', slug: 'wooden-spiral', cam: 'Olympus OM-D E-P5',
        alt: 'Golden wooden spiral stairs lit from within, spinning toward the centre',
        excerpt: 'Warm wood, warmer light, one very small staircase.',
        place: 'Nebotičnik, Ljubljana, Slovenia',
        note: 'A small staircase, lit from below, and a wide lens at the centre of it. The warm light does the colour work, so the only job left is to keep the camera level and the exposure honest.',
    },
    {
        key: 'D23', series: 'quiet-rooms', title: 'Sprinkenhof Stairwell', slug: 'sprinkenhof-stairwell', cam: 'Nikon D4S',
        alt: 'Looking down a tiled spiral stairwell with blue and ochre steps',
        excerpt: 'Blue and ochre, from the top of a Hamburg stairwell.',
        place: 'Sprinkenhof, Hamburg, Germany',
        note: 'Looking down a stairwell is a different picture from looking up. The ochre and blue steps wind away from you, and a little tilt of the camera changes the whole sense of speed.',
    },
    {
        key: 'D11', series: 'quiet-rooms', title: 'The Door at the Top', slug: 'the-door-at-the-top', cam: 'Canon EOS 70D',
        alt: 'A tall wooden door with glazed panels in a brick wall, lit by warm side light',
        excerpt: 'At the top of an abbey stair, a door and a window of light.',
        place: 'Heiligengrabe Abbey, Brandenburg, Germany',
        note: 'A door is a promise. Here it is held in a plain brick wall at the top of an abbey stair, lit from the side, with enough texture in the frame to make the quiet feel tangible.',
    },
    {
        key: 'D20', series: 'quiet-rooms', title: 'Ascent to the Steeple', slug: 'ascent-to-the-steeple', cam: 'Canon EOS 5D Mark IV',
        alt: 'A narrow, tall stone stairwell rising inside a church tower, in black and white',
        excerpt: 'A narrow vertical frame for a narrow vertical climb.',
        place: 'St. Viktor, Dülmen, Germany',
        note: 'The frame is almost twice as tall as it is wide, because the staircase is. It is a quiet picture about effort: stone worn by feet, light arriving from above, and a long way still to go.',
    },

    // ---- Wild Hours
    {
        key: 'E3', series: 'wild-hours', title: 'Pink Morning, Tolkuse Bog', slug: 'pink-morning-tolkuse-bog', cam: 'Canon EOS 5D Mark III', featured: true,
        alt: 'Pink and orange mist hanging over a bog with scattered pines at sunrise',
        excerpt: 'Mist over an Estonian bog, just after the sun cleared the horizon.',
        place: 'Tolkuse bog, Estonia',
        note: 'A 400 mm lens at sunrise compresses the mist into layers. The bog was almost silent, and the only movement was the light climbing the pines.',
    },
    {
        key: 'E8', series: 'wild-hours', title: 'Trees in Fog', slug: 'trees-in-fog', cam: 'Canon EOS 5D Mark IV',
        alt: 'A black-and-white country road with a lone bare tree emerging from heavy fog',
        excerpt: 'A lone tree, a road, and nothing else.',
        place: 'Leuste, Dülmen, Germany',
        note: 'In heavy fog you do not photograph a place, you photograph the few things the fog allows. A single tree, a road leading nowhere, and the grey in between make a complete picture.',
    },
    {
        key: 'E1', series: 'wild-hours', title: 'Light on the Road', slug: 'light-on-the-road', cam: 'Canon EOS 600D',
        alt: 'Rays of morning light filtering through trees along a country road in mist',
        excerpt: 'Morning mist and the shafts of light it catches.',
        place: 'Dülmen, Germany',
        note: 'Light rays only appear where there is something to scatter them. Mist is that something. Shooting into the sun, with a small aperture and the sun just behind a trunk, gives the shafts their shape.',
    },
    {
        key: 'E13', series: 'wild-hours', title: 'Great Blue Heron', slug: 'great-blue-heron', cam: 'Canon EOS 40D',
        alt: 'A close portrait of a great blue heron against dark water, its long beak in profile',
        excerpt: 'A heron at 400 mm, from a boardwalk at the edge of a wetland.',
        place: 'Wakodahatchee Wetlands, Florida, USA',
        note: 'Wildlife work is mostly distance and patience. A boardwalk and a 400 mm lens gave me a heron close enough to see the plumage on its neck and far enough that it kept fishing.',
    },
    {
        key: 'E25', series: 'wild-hours', title: 'Egret, Reflected', slug: 'egret-reflected', cam: 'Olympus OM-D E-M5 Mark II',
        alt: 'A great egret dipping its head into green water, its reflection mirrored below',
        excerpt: 'The moment after the strike, and its reflection.',
        place: null,
        note: 'A fast shutter is the whole technique here: 1/1250 s freezes the water leaving the bird\'s beak. The reflection is the part you cannot plan, only be ready for.',
    },
    {
        key: 'E39', series: 'wild-hours', title: 'Deadvlei', slug: 'deadvlei', cam: 'Canon EOS 5DS R',
        alt: 'A dead camel thorn tree against a red dune and a pale clay pan',
        excerpt: 'A dead tree, a red dune and a clay pan baked white.',
        place: 'Deadvlei, Namib-Naukluft Park, Namibia',
        note: 'The trees at Deadvlei have been dead for centuries but have not decayed; the desert is too dry for it. Against the red dune they look more like a drawing than a place, which is exactly why they are so photographed.',
    },
];

// Not part of a series: the About portrait and the author's avatar.
export const EXTRA = { about: 'D2', avatar: 'D1' };
