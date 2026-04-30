// ══════════════════════════════════════════════════════════════════════════════
// API Integration — Solar System OpenData (IMCCE)
// https://api.le-systeme-solaire.net/rest
// ══════════════════════════════════════════════════════════════════════════════

const SolarAPI = (() => {
    const BASE = 'https://api.le-systeme-solaire.net/rest';
    const API_KEY = document.getElementById('solar-canvas-container')?.dataset.apiKey ?? '';

    // API IMCCE es pública: omitir Authorization para evitar preflight CORS.
    // Solo enviar Accept (request "simple" → sin OPTIONS).
    const HEADERS = {
        'Accept': 'application/json'
    };

    // Map local IDs → API IDs
    const ID_MAP = {
        mercurio: 'mercure', venus: 'venus', tierra: 'terre',
        marte: 'mars', jupiter: 'jupiter', saturno: 'saturne',
        urano: 'uranus', neptuno: 'neptune'
    };

    let _allBodies = null;
    let _apiOk = false;
    let _usedLive = false;

    // ── Fallback data (NASA JPL/IMCCE) in case API key is invalid ──────
    const FALLBACK = {
        mercurio: {
            englishName:"Mercury", meanRadius:2439.7, equaRadius:2440.5,
            gravity:3.7, density:5.43, sideralOrbit:87.969,
            sideralRotation:1407.6, semimajorAxis:57909227,
            perihelion:46001200, aphelion:69816900,
            eccentricity:0.20563, inclination:7.005, axialTilt:0.034,
            avgTemp:440, escape:4300,
            mass:{massValue:3.30,massExponent:23}, moons:null
        },
        venus: {
            englishName:"Venus", meanRadius:6051.8, equaRadius:6051.8,
            gravity:8.87, density:5.24, sideralOrbit:224.701,
            sideralRotation:-5832.5, semimajorAxis:108209475,
            perihelion:107477000, aphelion:108941000,
            eccentricity:0.00677, inclination:3.3947, axialTilt:177.36,
            avgTemp:737, escape:10360,
            mass:{massValue:4.87,massExponent:24}, moons:null
        },
        tierra: {
            englishName:"Earth", meanRadius:6371.0, equaRadius:6378.1,
            gravity:9.81, density:5.51, sideralOrbit:365.256,
            sideralRotation:23.9345, semimajorAxis:149598262,
            perihelion:147092199, aphelion:152099000,
            eccentricity:0.01671, inclination:0.00005, axialTilt:23.44,
            avgTemp:288, escape:11186,
            mass:{massValue:5.97,massExponent:24},
            moons:[{moon:"La Luna"}]
        },
        marte: {
            englishName:"Mars", meanRadius:3389.5, equaRadius:3396.2,
            gravity:3.72, density:3.93, sideralOrbit:686.971,
            sideralRotation:24.6229, semimajorAxis:227943824,
            perihelion:206700000, aphelion:249200000,
            eccentricity:0.09341, inclination:1.8506, axialTilt:25.19,
            avgTemp:210, escape:5030,
            mass:{massValue:6.42,massExponent:23},
            moons:[{moon:"Fobos"},{moon:"Deimos"}]
        },
        jupiter: {
            englishName:"Jupiter", meanRadius:69911, equaRadius:71492,
            gravity:24.79, density:1.33, sideralOrbit:4332.59,
            sideralRotation:9.925, semimajorAxis:778340821,
            perihelion:740520000, aphelion:816620000,
            eccentricity:0.04839, inclination:1.3053, axialTilt:3.13,
            avgTemp:165, escape:59500,
            mass:{massValue:1.90,massExponent:27},
            moons:[{moon:"Ío"},{moon:"Europa"},{moon:"Ganímedes"},{moon:"Calisto"},
                   {moon:"Amaltea"},{moon:"Himalia"},{moon:"Elara"},{moon:"Pasífae"},
                   {moon:"Sinope"},{moon:"Lisitea"},{moon:"Carmé"},{moon:"Ananké"},
                   {moon:"Leda"},{moon:"Metis"},{moon:"Adrastea"},{moon:"Tebe"}]
        },
        saturno: {
            englishName:"Saturn", meanRadius:58232, equaRadius:60268,
            gravity:10.44, density:0.687, sideralOrbit:10759.22,
            sideralRotation:10.656, semimajorAxis:1426666422,
            perihelion:1352550000, aphelion:1514500000,
            eccentricity:0.05415, inclination:2.4845, axialTilt:26.73,
            avgTemp:134, escape:35500,
            mass:{massValue:5.68,massExponent:26},
            moons:[{moon:"Titán"},{moon:"Rea"},{moon:"Jápeto"},{moon:"Dione"},
                   {moon:"Tetis"},{moon:"Encélado"},{moon:"Mimas"},{moon:"Hiperión"},
                   {moon:"Febe"},{moon:"Jano"},{moon:"Epimeteo"},{moon:"Helena"},
                   {moon:"Telesto"},{moon:"Calipso"},{moon:"Atlas"},{moon:"Prometeo"},
                   {moon:"Pandora"},{moon:"Pan"}]
        },
        urano: {
            englishName:"Uranus", meanRadius:25362, equaRadius:25559,
            gravity:8.87, density:1.27, sideralOrbit:30688.5,
            sideralRotation:-17.24, semimajorAxis:2870658186,
            perihelion:2741300000, aphelion:3003620000,
            eccentricity:0.04717, inclination:0.7699, axialTilt:97.77,
            avgTemp:76, escape:21300,
            mass:{massValue:8.68,massExponent:25},
            moons:[{moon:"Titania"},{moon:"Oberón"},{moon:"Umbriel"},{moon:"Ariel"},
                   {moon:"Miranda"},{moon:"Cordelia"},{moon:"Ofelia"},{moon:"Bianca"},
                   {moon:"Créssida"},{moon:"Desdémona"},{moon:"Julieta"},{moon:"Porcia"},
                   {moon:"Rosalinda"},{moon:"Belinda"},{moon:"Puck"}]
        },
        neptuno: {
            englishName:"Neptune", meanRadius:24622, equaRadius:24764,
            gravity:11.15, density:1.64, sideralOrbit:60182,
            sideralRotation:16.11, semimajorAxis:4498396441,
            perihelion:4444450000, aphelion:4545670000,
            eccentricity:0.00859, inclination:1.7692, axialTilt:28.32,
            avgTemp:72, escape:23500,
            mass:{massValue:1.02,massExponent:26},
            moons:[{moon:"Tritón"},{moon:"Nereida"},{moon:"Náyade"},{moon:"Talasa"},
                   {moon:"Despina"},{moon:"Galatea"},{moon:"Larisa"},{moon:"Proteo"},
                   {moon:"Halímede"},{moon:"Psámate"},{moon:"Sao"},{moon:"Laomedeia"},
                   {moon:"Neso"},{moon:"Hipocampo"}]
        }
    };

    function updateLoadStatus(msg) {
        const el = document.getElementById('loading-status');
        if (el) el.textContent = msg;
    }
    function updateLoadBar(pct) {
        const el = document.getElementById('loading-fill');
        if (el) el.style.width = pct + '%';
    }

    // ── Fetch all planets (live API with Bearer token) ─────────────────
    async function fetchPlanets() {
        const cacheKey = 'solarAPI_v3';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (parsed && parsed.ts && (Date.now() - parsed.ts < 86400000)) {
                    _allBodies = parsed.data;
                    _apiOk = true;
                    _usedLive = true;
                    updateLoadStatus('Datos en caché (API IMCCE) ✓');
                    updateLoadBar(90);
                    return _allBodies;
                }
            } catch(e) { /* ignore */ }
        }

        updateLoadStatus('Conectando con api.le-systeme-solaire.net…');
        updateLoadBar(20);

        try {
            const url = BASE + '/bodies/?filter[]=isPlanet,eq,true';
            const res = await fetch(url, {
                headers: HEADERS,
                signal: AbortSignal.timeout(8000)
            });

            if (!res.ok) throw new Error('HTTP ' + res.status);

            const data = await res.json();
            const bodies = data.bodies || [];

            if (bodies.length > 0) {
                // Index by local id
                _allBodies = {};
                const nameMap = {
                    'Mercury':'mercurio','Venus':'venus','Earth':'tierra',
                    'Mars':'marte','Jupiter':'jupiter','Saturn':'saturno',
                    'Uranus':'urano','Neptune':'neptuno'
                };
                bodies.forEach(b => {
                    const key = nameMap[b.englishName];
                    if (key) _allBodies[key] = b;
                });

                // Cache for 24h
                localStorage.setItem(cacheKey, JSON.stringify({
                    ts: Date.now(),
                    data: _allBodies
                }));

                _usedLive = true;
                _apiOk = true;
                updateLoadStatus('Datos en vivo del IMCCE ✓');
                updateLoadBar(90);
                console.log('✅ Solar System API: datos en vivo cargados (' + bodies.length + ' planetas)');
                return _allBodies;
            }
        } catch(e) {
            console.warn('⚠️ API live falló:', e.message, '→ usando datos embebidos');
        }

        // Fallback to embedded data
        _allBodies = FALLBACK;
        _apiOk = true;
        _usedLive = false;
        updateLoadStatus('Datos científicos embebidos ✓');
        updateLoadBar(90);
        return _allBodies;
    }

    // ── Fetch known count ──────────────────────────────────────────────
    async function fetchKnownCount() {
        try {
            const res = await fetch(BASE + '/knowncount', {
                headers: HEADERS,
                signal: AbortSignal.timeout(5000)
            });
            if (!res.ok) return null;
            return await res.json();
        } catch(e) { return null; }
    }

    // ── Get planet by local ID ─────────────────────────────────────────
    function getPlanetByLocalId(localId) {
        if (!_allBodies) return FALLBACK[localId] || null;
        return _allBodies[localId] || FALLBACK[localId] || null;
    }

    // ── Format API body into display stats ─────────────────────────────
    function formatStats(body) {
        if (!body) return null;
        const s = {};
        if (body.meanRadius)      s['Radio medio']     = { value: Number(body.meanRadius).toLocaleString('es'), unit: 'km', api: true };
        if (body.equaRadius)      s['Radio ecuatorial'] = { value: Number(body.equaRadius).toLocaleString('es'), unit: 'km', api: true };
        if (body.gravity)         s['Gravedad']         = { value: body.gravity.toFixed(2), unit: 'm/s²', api: true };
        if (body.density)         s['Densidad']         = { value: body.density.toFixed(2), unit: 'g/cm³', api: true };
        if (body.sideralOrbit)    s['Órbita sideral']   = { value: Number(body.sideralOrbit.toFixed(1)).toLocaleString('es'), unit: 'días', api: true };
        if (body.sideralRotation) s['Rotación']         = { value: Math.abs(body.sideralRotation).toFixed(2), unit: 'horas', api: true };
        if (body.semimajorAxis)   s['Semi-eje mayor']   = { value: Number(body.semimajorAxis).toLocaleString('es'), unit: 'km', api: true };
        if (body.perihelion)      s['Perihelio']        = { value: Number(body.perihelion).toLocaleString('es'), unit: 'km', api: true };
        if (body.aphelion)        s['Afelio']           = { value: Number(body.aphelion).toLocaleString('es'), unit: 'km', api: true };
        if (body.eccentricity != null) s['Excentricidad'] = { value: body.eccentricity.toFixed(4), unit: '', api: true };
        if (body.inclination != null)  s['Inclinación']   = { value: body.inclination.toFixed(2), unit: '°', api: true };
        if (body.axialTilt != null)    s['Incl. axial']   = { value: body.axialTilt.toFixed(2), unit: '°', api: true };
        if (body.avgTemp)         s['Temp. media']      = { value: (body.avgTemp - 273.15).toFixed(0), unit: '°C', api: true };
        if (body.mass && body.mass.massValue)
            s['Masa'] = { value: body.mass.massValue.toFixed(2) + '×10' + body.mass.massExponent, unit: 'kg', api: true };
        if (body.escape)          s['Vel. escape']      = { value: Number(body.escape.toFixed(0)).toLocaleString('es'), unit: 'm/s', api: true };
        return s;
    }

    // ── Get moon names ─────────────────────────────────────────────────
    function getMoons(body) {
        if (!body || !body.moons) return [];
        return body.moons.map(m => m.moon).filter(Boolean);
    }

    return {
        fetchPlanets, fetchKnownCount,
        getPlanetByLocalId, formatStats, getMoons,
        get isConnected() { return _apiOk; },
        get isLive() { return _usedLive; },
        updateLoadStatus, updateLoadBar
    };
})();
