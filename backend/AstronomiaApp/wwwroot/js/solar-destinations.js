// ══════════════════════════════════════════════════════════════════════════════
// Destinations — Sistema de Navegación Interestelar
// Constelaciones, sistemas estelares y galaxias
// ══════════════════════════════════════════════════════════════════════════════

const Destinations = (() => {

    const CATEGORIES = {
        constellations: { label: 'CONSTELACIONES', icon: '✦' },
        stars: { label: 'ESTRELLAS NOTABLES', icon: '⭐' },
        galaxies: { label: 'GALAXIAS', icon: '🌌' },
        black_holes: { label: 'AGUJEROS NEGROS', icon: '⚫' },
        exoplanets: { label: 'EXOPLANETAS', icon: '🪐' },
        asteroids: { label: 'ASTEROIDES Y COMETAS', icon: '☄️' },
    };

    const ALL = [
        // ── Constelaciones ─────────────────────────────────────────────
        {
            id: 'orion', cat: 'constellations',
            name: 'Orión', subtitle: 'EL CAZADOR',
            color: '#7eb8ff',
            desc: 'Una de las constelaciones más reconocibles. Contiene las estrellas Betelgeuse (supergigante roja) y Rigel (supergigante azul), además de la famosa Nebulosa de Orión (M42) en su "espada".',
            stats: {
                'Estrellas principales': { value: '7', unit: '' },
                'Estrella más brillante': { value: 'Rigel', unit: 'β Ori' },
                'Distancia media': { value: '1,344', unit: 'años luz' },
                'Mejor visibilidad': { value: 'Dic-Mar', unit: '' },
                'Ascensión recta': { value: '5h 30m', unit: '' },
                'Declinación': { value: '-1°', unit: '' },
            },
            // Posiciones relativas de estrellas (x, y, z, brightness, name)
            starPositions: [
                { x: -80, y: 120, z: 0, mag: 0.5, name: 'Betelgeuse', color: '#ff6633' },
                { x: 70, y: -100, z: 0, mag: 0.1, name: 'Rigel', color: '#aaccff' },
                { x: -30, y: 30, z: 0, mag: 1.6, name: 'Bellatrix', color: '#bbddff' },
                { x: 40, y: 30, z: 0, mag: 2.2, name: 'Saiph', color: '#aabbff' },
                { x: -5, y: 0, z: 0, mag: 1.7, name: 'Alnilam', color: '#ccddff' },
                { x: -20, y: -5, z: 0, mag: 1.8, name: 'Alnitak', color: '#bbccff' },
                { x: 12, y: 5, z: 0, mag: 2.2, name: 'Mintaka', color: '#ccddff' },
            ],
            lines: [[0,2],[1,3],[2,4],[4,5],[5,6],[4,6],[3,6],[0,4],[1,5]],
        },
        {
            id: 'osa_mayor', cat: 'constellations',
            name: 'Osa Mayor', subtitle: 'EL GRAN CARRO',
            color: '#88aaff',
            desc: 'La constelación más conocida del hemisferio norte. Sus siete estrellas principales forman el "Gran Carro" o "Big Dipper". Dubhe y Merak apuntan hacia la Estrella Polar.',
            stats: {
                'Estrellas principales': { value: '7', unit: '' },
                'Estrella más brillante': { value: 'Alioth', unit: 'ε UMa' },
                'Distancia media': { value: '83', unit: 'años luz' },
                'Mejor visibilidad': { value: 'Todo el año', unit: 'N' },
                'Ascensión recta': { value: '11h 00m', unit: '' },
                'Declinación': { value: '+55°', unit: '' },
            },
            starPositions: [
                { x: -100, y: 60, z: 0, mag: 1.8, name: 'Dubhe', color: '#ffd599' },
                { x: -60, y: 50, z: 0, mag: 2.3, name: 'Merak', color: '#ccddff' },
                { x: -20, y: 30, z: 0, mag: 2.4, name: 'Phecda', color: '#ccddff' },
                { x: 10, y: 50, z: 0, mag: 3.3, name: 'Megrez', color: '#ccddff' },
                { x: 40, y: 40, z: 0, mag: 1.8, name: 'Alioth', color: '#ccddff' },
                { x: 80, y: 30, z: 0, mag: 2.3, name: 'Mizar', color: '#ccddff' },
                { x: 110, y: 15, z: 0, mag: 1.9, name: 'Alkaid', color: '#aabbff' },
            ],
            lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,0]],
        },
        {
            id: 'scorpius', cat: 'constellations',
            name: 'Escorpio', subtitle: 'EL ESCORPIÓN CELESTE',
            color: '#ff6655',
            desc: 'Constelación zodiacal que domina el cielo de verano. Su corazón es Antares, una supergigante roja 700 veces más grande que el Sol. Su cola curva es inconfundible.',
            stats: {
                'Estrellas principales': { value: '18', unit: '' },
                'Estrella más brillante': { value: 'Antares', unit: 'α Sco' },
                'Distancia Antares': { value: '550', unit: 'años luz' },
                'Mejor visibilidad': { value: 'Jun-Ago', unit: '' },
                'Ascensión recta': { value: '16h 30m', unit: '' },
                'Declinación': { value: '-30°', unit: '' },
            },
            starPositions: [
                { x: -20, y: 60, z: 0, mag: 2.6, name: 'Dschubba', color: '#aabbff' },
                { x: -10, y: 40, z: 0, mag: 2.3, name: 'Acrab', color: '#bbccff' },
                { x: 0, y: 10, z: 0, mag: 1.0, name: 'Antares', color: '#ff4422' },
                { x: 20, y: -20, z: 0, mag: 2.8, name: 'Tau Sco', color: '#aabbff' },
                { x: 40, y: -50, z: 0, mag: 2.7, name: 'Epsilon Sco', color: '#ffd599' },
                { x: 60, y: -70, z: 0, mag: 3.0, name: 'Kappa Sco', color: '#aabbff' },
                { x: 50, y: -90, z: 0, mag: 1.6, name: 'Shaula', color: '#aabbff' },
                { x: 40, y: -95, z: 0, mag: 2.7, name: 'Lesath', color: '#aabbff' },
            ],
            lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
        },
        {
            id: 'crux', cat: 'constellations',
            name: 'Cruz del Sur', subtitle: 'CRUX — GUÍA DEL HEMISFERIO SUR',
            color: '#77ccff',
            desc: 'La constelación más pequeña pero más reconocible del hemisferio sur. Usada por siglos para la navegación. Contiene el Joyero, uno de los cúmulos abiertos más bellos.',
            stats: {
                'Estrellas principales': { value: '4', unit: '' },
                'Estrella más brillante': { value: 'Acrux', unit: 'α Cru' },
                'Distancia media': { value: '280', unit: 'años luz' },
                'Mejor visibilidad': { value: 'Abr-Jun', unit: 'Sur' },
                'Ascensión recta': { value: '12h 30m', unit: '' },
                'Declinación': { value: '-60°', unit: '' },
            },
            starPositions: [
                { x: 0, y: -60, z: 0, mag: 0.8, name: 'Acrux', color: '#aabbff' },
                { x: 0, y: 60, z: 0, mag: 1.3, name: 'Gacrux', color: '#ff8855' },
                { x: -40, y: 0, z: 0, mag: 1.6, name: 'Beta Crucis', color: '#aabbff' },
                { x: 40, y: 5, z: 0, mag: 2.8, name: 'Delta Crucis', color: '#aabbff' },
            ],
            lines: [[0,1],[2,3]],
        },

        // ── Estrellas notables ─────────────────────────────────────────
        {
            id: 'alpha_centauri', cat: 'stars',
            name: 'Alpha Centauri', subtitle: 'EL SISTEMA ESTELAR MÁS CERCANO',
            color: '#ffdd55',
            desc: 'El sistema estelar más cercano al Sol, a solo 4.37 años luz. Es un sistema triple: Alpha Centauri A (tipo G), Alpha Centauri B (tipo K), y Proxima Centauri (enana roja), que posee el exoplaneta más cercano: Proxima b.',
            stats: {
                'Distancia': { value: '4.37', unit: 'años luz' },
                'Tipo A': { value: 'G2V', unit: 'como el Sol' },
                'Tipo B': { value: 'K1V', unit: 'naranja' },
                'Proxima': { value: 'M5.5Ve', unit: 'enana roja' },
                'Magnitud': { value: '-0.27', unit: 'app' },
                'Exoplanetas': { value: '1+', unit: 'Proxima b' },
            },
            starPositions: [
                { x: -30, y: 10, z: 0, mag: -0.3, name: 'α Cen A', color: '#ffee66' },
                { x: 30, y: -10, z: 0, mag: 1.3, name: 'α Cen B', color: '#ffbb44' },
                { x: 120, y: -60, z: 0, mag: 5.0, name: 'Proxima', color: '#ff4422' },
            ],
            lines: [[0,1]],
            isStar: true,
        },
        {
            id: 'sirius', cat: 'stars',
            name: 'Sirio', subtitle: 'LA ESTRELLA MÁS BRILLANTE DEL CIELO',
            color: '#ccddff',
            desc: 'La estrella más brillante del cielo nocturno, en Canis Major. Es un sistema binario: Sirio A (estrella blanca tipo A, el doble de masiva que el Sol) y Sirio B (enana blanca del tamaño de la Tierra pero masa del Sol).',
            stats: {
                'Distancia': { value: '8.6', unit: 'años luz' },
                'Magnitud': { value: '-1.46', unit: 'app' },
                'Tipo espectral': { value: 'A1V', unit: '' },
                'Masa': { value: '2.02', unit: 'M☉' },
                'Radio': { value: '1.71', unit: 'R☉' },
                'Luminosidad': { value: '25.4', unit: 'L☉' },
            },
            starPositions: [
                { x: 0, y: 0, z: 0, mag: -1.5, name: 'Sirio A', color: '#ddeeff' },
                { x: 50, y: -20, z: 0, mag: 4.0, name: 'Sirio B', color: '#ffffff' },
            ],
            lines: [],
            isStar: true,
        },
        {
            id: 'betelgeuse', cat: 'stars',
            name: 'Betelgeuse', subtitle: 'SUPERGIGANTE ROJA — FUTURA SUPERNOVA',
            color: '#ff5533',
            desc: 'Una de las estrellas más grandes conocidas. Si estuviera en el centro del sistema solar, su superficie llegaría más allá de la órbita de Júpiter. Se espera que explote como supernova en los próximos 100,000 años.',
            stats: {
                'Distancia': { value: '700', unit: 'años luz' },
                'Tipo espectral': { value: 'M1-2', unit: 'Ia-ab' },
                'Radio': { value: '887', unit: 'R☉' },
                'Masa': { value: '16.5', unit: 'M☉' },
                'Luminosidad': { value: '126,000', unit: 'L☉' },
                'Temperatura': { value: '3,600', unit: 'K' },
            },
            starPositions: [
                { x: 0, y: 0, z: 0, mag: 0.5, name: 'Betelgeuse', color: '#ff5533' },
            ],
            lines: [],
            isStar: true,
        },
        {
            id: 'polaris', cat: 'stars',
            name: 'Polaris', subtitle: 'LA ESTRELLA DEL NORTE',
            color: '#fff8dd',
            desc: 'Estrella Polar, la guía de navegantes por milenios. Es un sistema triple y una estrella variable cefeida. Se encuentra casi exactamente en el polo norte celeste, lo que la hace parecer inmóvil mientras todo gira a su alrededor.',
            stats: {
                'Distancia': { value: '433', unit: 'años luz' },
                'Tipo espectral': { value: 'F7', unit: 'Ib' },
                'Masa': { value: '5.4', unit: 'M☉' },
                'Radio': { value: '37.5', unit: 'R☉' },
                'Luminosidad': { value: '1,260', unit: 'L☉' },
                'Sistema': { value: 'Triple', unit: '' },
            },
            starPositions: [
                { x: 0, y: 0, z: 0, mag: 2.0, name: 'Polaris Aa', color: '#fff8dd' },
                { x: 40, y: 15, z: 0, mag: 4.5, name: 'Polaris Ab', color: '#ffeebb' },
                { x: -80, y: -30, z: 0, mag: 5.0, name: 'Polaris B', color: '#ffeebb' },
            ],
            lines: [[0,1]],
            isStar: true,
        },

        // ── Galaxias ───────────────────────────────────────────────────
        {
            id: 'milky_way', cat: 'galaxies',
            name: 'Vía Láctea', subtitle: 'NUESTRA GALAXIA — ESPIRAL BARRADA',
            color: '#ffddaa',
            desc: 'Nuestra galaxia hogar, una espiral barrada de 100,000 años luz de diámetro con 200-400 mil millones de estrellas. El Sol se encuentra a 26,000 años luz del centro, en el Brazo de Orión.',
            stats: {
                'Tipo': { value: 'SBbc', unit: 'espiral barrada' },
                'Diámetro': { value: '100,000', unit: 'años luz' },
                'Estrellas': { value: '200-400', unit: 'mil millones' },
                'Edad': { value: '13.6', unit: 'mil millones años' },
                'Masa': { value: '1.5×10¹²', unit: 'M☉' },
                'Agujero negro': { value: 'Sgr A*', unit: '4M M☉' },
            },
            isGalaxy: true,
            spiralArms: 4,
            spiralColor: '#ffddaa',
        },
        {
            id: 'andromeda', cat: 'galaxies',
            name: 'Andrómeda', subtitle: 'M31 — LA GALAXIA MÁS CERCANA',
            color: '#aabbff',
            desc: 'La galaxia espiral más cercana a la Vía Láctea, a 2.5 millones de años luz. Visible a simple vista, es más grande que nuestra galaxia. Colisionará con la Vía Láctea en unos 4,500 millones de años formando "Milkomeda".',
            stats: {
                'Tipo': { value: 'SA(s)b', unit: 'espiral' },
                'Distancia': { value: '2.537', unit: 'mill. años luz' },
                'Diámetro': { value: '220,000', unit: 'años luz' },
                'Estrellas': { value: '~1 billón', unit: '' },
                'Magnitud': { value: '3.44', unit: 'app' },
                'Colisión': { value: '~4,500', unit: 'mill. años' },
            },
            isGalaxy: true,
            spiralArms: 2,
            spiralColor: '#aabbff',
        },
        {
            id: 'triangulum', cat: 'galaxies',
            name: 'Triángulo', subtitle: 'M33 — LA ESPIRAL DEL GRUPO LOCAL',
            color: '#88aadd',
            desc: 'La tercera galaxia más grande del Grupo Local. Contiene la nebulosa NGC 604, una de las regiones de formación estelar más grandes conocidas, 40 veces el tamaño de la Nebulosa de Orión.',
            stats: {
                'Tipo': { value: 'SA(s)cd', unit: 'espiral' },
                'Distancia': { value: '2.73', unit: 'mill. años luz' },
                'Diámetro': { value: '60,000', unit: 'años luz' },
                'Estrellas': { value: '~40', unit: 'mil millones' },
                'Magnitud': { value: '5.72', unit: 'app' },
                'NGC 604': { value: '1,500', unit: 'años luz' },
            },
            isGalaxy: true,
            spiralArms: 3,
            spiralColor: '#88aadd',
        },
        // ── Agujeros Negros ────────────────────────────────────────────
        {
            id: 'sagittarius_a', cat: 'black_holes',
            name: 'Sagittarius A*', subtitle: 'EL CORAZÓN DE LA VÍA LÁCTEA',
            color: '#ff8844',
            desc: 'Agujero negro supermasivo en el centro gravitacional de nuestra galaxia. Tiene una masa equivalente a 4 millones de soles concentrada en una región muy pequeña.',
            stats: {
                'Masa': { value: '4.1M', unit: 'M☉' },
                'Distancia': { value: '26,670', unit: 'años luz' },
                'Diámetro del horizonte': { value: '24', unit: 'mill. km' },
            },
            isBlackHole: true,
        },
        {
            id: 'cygnus_x1', cat: 'black_holes',
            name: 'Cygnus X-1', subtitle: 'PRIMER AGUJERO NEGRO CONFIRMADO',
            color: '#44bbff',
            desc: 'Un sistema binario que contiene uno de los primeros agujeros negros descubiertos. Roba material de su estrella compañera (una supergigante azul), creando un brillante disco de acreción.',
            stats: {
                'Masa': { value: '21.2', unit: 'M☉' },
                'Distancia': { value: '7,200', unit: 'años luz' },
                'Compañera': { value: 'HDE 226868', unit: 'supergigante' },
            },
            isBlackHole: true,
        },
        // ── Exoplanetas ────────────────────────────────────────────────
        {
            id: 'proxima_b', cat: 'exoplanets',
            name: 'Proxima Centauri b', subtitle: 'NUESTRO VECINO ROCOSO',
            color: '#cc5533',
            desc: 'El exoplaneta más cercano a la Tierra. Órbita en la zona habitable de su estrella enana roja, Proxima Centauri. Podría tener agua líquida en su superficie.',
            stats: {
                'Masa': { value: '1.17', unit: 'M⊕' },
                'Distancia': { value: '4.24', unit: 'años luz' },
                'Periodo orbital': { value: '11.2', unit: 'días' },
                'Tipo': { value: 'Super-Tierra', unit: '' },
            },
            isStar: false,
        },
        {
            id: 'kepler_186f', cat: 'exoplanets',
            name: 'Kepler-186f', subtitle: 'EL PRIMER PRIMO DE LA TIERRA',
            color: '#33aa77',
            desc: 'El primer planeta del tamaño de la Tierra descubierto en la zona habitable de otra estrella. Su sistema solar en miniatura está dominado por una enana roja.',
            stats: {
                'Masa': { value: '~1.4', unit: 'M⊕' },
                'Distancia': { value: '582', unit: 'años luz' },
                'Periodo orbital': { value: '130', unit: 'días' },
                'Tipo': { value: 'Rocoso', unit: '' },
            },
            isStar: false,
        },
        // ── Asteroides y Cometas ───────────────────────────────────────
        {
            id: 'ceres', cat: 'asteroids',
            name: 'Ceres', subtitle: 'PLANETA ENANO DEL CINTURÓN',
            color: '#aaaaaa',
            desc: 'El objeto más grande del cinturón de asteroides entre Marte y Júpiter. Es el único planeta enano en el sistema solar interior y contiene grandes cantidades de hielo de agua.',
            stats: {
                'Diámetro': { value: '939', unit: 'km' },
                'Dist. al Sol': { value: '413', unit: 'mill. km' },
                'Órbita': { value: '4.6', unit: 'años' },
                'Clasificación': { value: 'Planeta Enano', unit: '' },
            },
            isStar: false,
        },
        {
            id: 'halley', cat: 'asteroids',
            name: 'Cometa Halley', subtitle: 'EL VIAJERO PERIÓDICO',
            color: '#ffffff',
            desc: 'El cometa más famoso de período corto. Es visible desde la Tierra cada 75-76 años. Ha sido observado a lo largo de la historia humana desde al menos el año 240 a.C.',
            stats: {
                'Dimensiones': { value: '15 x 8', unit: 'km' },
                'Órbita': { value: '75.3', unit: 'años' },
                'Próximo paso': { value: '2061', unit: 'año' },
                'Tipo': { value: 'Cometa', unit: '' },
            },
            isStar: false,
        },
    ];

    function getByCategory(cat) {
        return ALL.filter(d => d.cat === cat);
    }

    function getById(id) {
        return ALL.find(d => d.id === id);
    }

    return { ALL, CATEGORIES, getByCategory, getById };
})();
