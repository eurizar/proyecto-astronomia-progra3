// ── Datos de planetas ─────────────────────────────────────────────────────────

const planetsData = {
    sol: {
        name: "Sol", type: "ESTRELLA · ENANA AMARILLA",
        color: "#ff8800",
        gradient: "radial-gradient(circle at 35% 35%, #fff 0%, #ffee00 15%, #ff8800 50%, #ff4400 80%, #aa2200 100%)",
        size: 100,
        desc: "El Sol es la estrella central de nuestro sistema solar. Es una esfera casi perfecta de plasma caliente, calentada hasta la incandescencia por reacciones de fusión nuclear en su núcleo. Contiene el 99.86% de la masa total del sistema solar.",
        stats: {
            "Diámetro":      { value: "1,392,700", unit: "km" },
            "Temperatura":   { value: "5,500",     unit: "°C superficie" },
            "Edad":          { value: "4,600",     unit: "millones años" },
            "Masa":          { value: "1.989 × 10³⁰", unit: "kg" },
            "Composición":   { value: "73%",       unit: "Hidrógeno" },
            "Tipo espectral":{ value: "G2V",       unit: "" }
        }
    },
    mercurio: {
        name: "Mercurio", type: "PLANETA ROCOSO · EL MÁS PEQUEÑO",
        color: "#b0b0b0",
        gradient: "radial-gradient(circle at 35% 35%, #d4d4d4 0%, #a0a0a0 40%, #707070 70%, #505050 100%)",
        size: 12,
        desc: "Mercurio es el planeta más pequeño y cercano al Sol. Su superficie está cubierta de cráteres, parecida a nuestra Luna. No tiene atmósfera significativa, lo que provoca temperaturas extremas entre el día y la noche.",
        stats: {
            "Diámetro":    { value: "4,879",    unit: "km" },
            "Dist. al Sol":{ value: "57.9",     unit: "mill. km" },
            "Órbita":      { value: "88",       unit: "días" },
            "Temperatura": { value: "-180/430", unit: "°C" },
            "Gravedad":    { value: "3.7",      unit: "m/s²" },
            "Lunas":       { value: "0",        unit: "" }
        }
    },
    venus: {
        name: "Venus", type: "PLANETA ROCOSO · EL GEMELO INFERNAL",
        color: "#e8a735",
        gradient: "radial-gradient(circle at 35% 35%, #f5d89a 0%, #e8a735 40%, #c47820 70%, #8a5010 100%)",
        size: 20,
        desc: "Venus es el planeta más caliente del sistema solar debido a su denso efecto invernadero. Gira en dirección opuesta a la mayoría de los planetas. Su superficie está oculta bajo gruesas nubes de ácido sulfúrico.",
        stats: {
            "Diámetro":    { value: "12,104", unit: "km" },
            "Dist. al Sol":{ value: "108.2",  unit: "mill. km" },
            "Órbita":      { value: "225",    unit: "días" },
            "Temperatura": { value: "462",    unit: "°C" },
            "Gravedad":    { value: "8.87",   unit: "m/s²" },
            "Lunas":       { value: "0",      unit: "" }
        }
    },
    tierra: {
        name: "Tierra", type: "PLANETA ROCOSO · NUESTRO HOGAR",
        color: "#4488cc",
        gradient: "radial-gradient(circle at 35% 35%, #88ccff 0%, #4488cc 30%, #336699 50%, #225577 70%, #1a3344 100%)",
        size: 22,
        desc: "La Tierra es el único planeta conocido que alberga vida. Con agua líquida en su superficie, una atmósfera protectora y un campo magnético, es un oasis en el vasto vacío del espacio. Su luna estabiliza su inclinación axial.",
        stats: {
            "Diámetro":    { value: "12,742",  unit: "km" },
            "Dist. al Sol":{ value: "149.6",   unit: "mill. km" },
            "Órbita":      { value: "365.25",  unit: "días" },
            "Temperatura": { value: "15",      unit: "°C media" },
            "Gravedad":    { value: "9.81",    unit: "m/s²" },
            "Lunas":       { value: "1",       unit: "" }
        }
    },
    marte: {
        name: "Marte", type: "PLANETA ROCOSO · EL PLANETA ROJO",
        color: "#cc4422",
        gradient: "radial-gradient(circle at 35% 35%, #ee8866 0%, #cc4422 40%, #aa3311 70%, #772200 100%)",
        size: 16,
        desc: "Marte, el Planeta Rojo, debe su color al óxido de hierro en su superficie. Alberga el volcán más grande del sistema solar (Olympus Mons) y un enorme cañón (Valles Marineris). Es el principal candidato para la colonización humana.",
        stats: {
            "Diámetro":    { value: "6,779",  unit: "km" },
            "Dist. al Sol":{ value: "227.9",  unit: "mill. km" },
            "Órbita":      { value: "687",    unit: "días" },
            "Temperatura": { value: "-65",    unit: "°C media" },
            "Gravedad":    { value: "3.72",   unit: "m/s²" },
            "Lunas":       { value: "2",      unit: "" }
        }
    },
    jupiter: {
        name: "Júpiter", type: "GIGANTE GASEOSO · EL REY DE LOS PLANETAS",
        color: "#d4a06a",
        gradient: "radial-gradient(circle at 35% 35%, #f0d0a0 0%, #d4a06a 30%, #c08040 50%, #a06030 70%, #804020 100%)",
        size: 50,
        desc: "Júpiter es el planeta más grande del sistema solar, tan masivo que podría contener a todos los demás planetas combinados. Su Gran Mancha Roja es una tormenta que ha durado siglos. Posee al menos 95 lunas conocidas.",
        stats: {
            "Diámetro":    { value: "139,820", unit: "km" },
            "Dist. al Sol":{ value: "778.5",   unit: "mill. km" },
            "Órbita":      { value: "11.86",   unit: "años" },
            "Temperatura": { value: "-110",    unit: "°C nubes" },
            "Gravedad":    { value: "24.79",   unit: "m/s²" },
            "Lunas":       { value: "95",      unit: "" }
        }
    },
    saturno: {
        name: "Saturno", type: "GIGANTE GASEOSO · EL SEÑOR DE LOS ANILLOS",
        color: "#e8d088",
        gradient: "radial-gradient(circle at 35% 35%, #f5e8b8 0%, #e8d088 35%, #d4b870 55%, #c0a050 75%, #a08030 100%)",
        size: 42, hasRing: true,
        desc: "Saturno es famoso por su espectacular sistema de anillos, compuestos principalmente de partículas de hielo y roca. Es tan ligero que flotaría en agua si existiera un océano lo suficientemente grande. Su luna Titán tiene una atmósfera densa.",
        stats: {
            "Diámetro":    { value: "116,460", unit: "km" },
            "Dist. al Sol":{ value: "1,434",   unit: "mill. km" },
            "Órbita":      { value: "29.46",   unit: "años" },
            "Temperatura": { value: "-140",    unit: "°C nubes" },
            "Gravedad":    { value: "10.44",   unit: "m/s²" },
            "Lunas":       { value: "146",     unit: "" }
        }
    },
    urano: {
        name: "Urano", type: "GIGANTE DE HIELO · EL PLANETA INCLINADO",
        color: "#72b5c4",
        gradient: "radial-gradient(circle at 35% 35%, #a8dde8 0%, #72b5c4 40%, #5090a0 70%, #307080 100%)",
        size: 30,
        desc: "Urano es único porque gira de lado, con una inclinación axial de 98°. Su color azul verdoso se debe al metano en su atmósfera. Es el planeta más frío del sistema solar, incluso más frío que Neptuno.",
        stats: {
            "Diámetro":    { value: "50,724", unit: "km" },
            "Dist. al Sol":{ value: "2,871",  unit: "mill. km" },
            "Órbita":      { value: "84",     unit: "años" },
            "Temperatura": { value: "-224",   unit: "°C" },
            "Gravedad":    { value: "8.87",   unit: "m/s²" },
            "Lunas":       { value: "28",     unit: "" }
        }
    },
    neptuno: {
        name: "Neptuno", type: "GIGANTE DE HIELO · EL PLANETA DEL VIENTO",
        color: "#3355cc",
        gradient: "radial-gradient(circle at 35% 35%, #6688ee 0%, #3355cc 40%, #2244aa 70%, #113388 100%)",
        size: 28,
        desc: "Neptuno posee los vientos más fuertes del sistema solar, alcanzando 2,100 km/h. Su intenso color azul se debe al metano. Su luna Tritón orbita en dirección retrógrada y podría ser un objeto del cinturón de Kuiper capturado.",
        stats: {
            "Diámetro":    { value: "49,244", unit: "km" },
            "Dist. al Sol":{ value: "4,495",  unit: "mill. km" },
            "Órbita":      { value: "164.8",  unit: "años" },
            "Temperatura": { value: "-214",   unit: "°C" },
            "Gravedad":    { value: "11.15",  unit: "m/s²" },
            "Lunas":       { value: "16",     unit: "" }
        }
    }
};

// Radio, velocidad angular (rad/s a velocidad normal), tamaño en unidades Three.js
const orbitConfig = [
    { id: 'mercurio', radius: 160,  speed: 0.80,  size: 8  },
    { id: 'venus',    radius: 240,  speed: 0.50,  size: 14 },
    { id: 'tierra',   radius: 330,  speed: 0.35,  size: 15 },
    { id: 'marte',    radius: 430,  speed: 0.22,  size: 10 },
    { id: 'jupiter',  radius: 610,  speed: 0.10,  size: 44 },
    { id: 'saturno',  radius: 790,  speed: 0.07,  size: 36, hasRing: true },
    { id: 'urano',    radius: 960,  speed: 0.04,  size: 24 },
    { id: 'neptuno',  radius: 1120, speed: 0.02,  size: 22 },
];

// ── Three.js: escena, cámara, renderer ───────────────────────────────────────

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000005, 0.000002); // Fog mucho más tenue para ver lejos

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000000);
camera.position.set(0, 900, 1400);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000008);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping  = true;
controls.dampingFactor  = 0.06;
controls.minDistance    = 80;
controls.maxDistance    = 800000; // Permitir zoom hiper-lejano
controls.target.set(0, 0, 0);
controls.update();

// ── Iluminación ───────────────────────────────────────────────────────────────

// Ambient — suficiente para ver planetas incluso sin textura
scene.add(new THREE.AmbientLight(0x556688, 0.6));

// Luz del sol: sin decay (distance=0, decay=0) → intensidad constante a cualquier distancia
const sunLight = new THREE.PointLight(0xfff0cc, 2.2, 0, 0);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Rim light azul tenue (simula starlight rebotado)
const fillLight = new THREE.DirectionalLight(0x223355, 0.25);
fillLight.position.set(-1, 0.3, -1);
scene.add(fillLight);

// ── Campo de estrellas ────────────────────────────────────────────────────────

(function buildStarfield() {
    // Estrellas cercanas (fondo normal)
    const positions = new Float32Array(15000 * 3);
    const colors    = new Float32Array(15000 * 3);
    for (let i = 0; i < 15000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        // Distribuir entre 10,000 y 900,000 para efecto de profundidad extrema
        const r     = 10000 + Math.pow(Math.random(), 2) * 890000;
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const t = Math.random();
        colors[i * 3]     = t < 0.3 ? 0.8 : 1;
        colors[i * 3 + 1] = t < 0.3 ? 0.8 : (t < 0.6 ? 1 : 0.9);
        colors[i * 3 + 2] = t < 0.3 ? 1   : (t < 0.6 ? 1 : 0.7);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    // sizeAttenuation: false mantiene las estrellas del mismo tamaño en píxeles sin importar la distancia
    const mat = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, sizeAttenuation: false, transparent: true, opacity: 0.8 });
    scene.add(new THREE.Points(geo, mat));
})();

// ── Macro Universo (Galaxias y Constelaciones) ────────────────────────────────

const macroDestinations = [];
const macroGroup = new THREE.Group();
scene.add(macroGroup);

(function buildMacroUniverse() {
    if (typeof Destinations === 'undefined') return;

    const labelContainer = document.getElementById('macro-labels');

    // Función para crear texturas procedurales
    function createMacroTexture(colorStr, dest) {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const cx = 128, cy = 128;

        // Core glow
        if (dest && dest.isBlackHole) {
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 128);
            grad.addColorStop(0, 'rgba(0,0,0,1)'); // Centro negro
            grad.addColorStop(0.15, 'rgba(0,0,0,1)'); // Horizonte de sucesos
            grad.addColorStop(0.18, colorStr); // Disco de acreción brillante
            grad.addColorStop(0.4, colorStr.replace(')', ', 0.5)').replace('rgb', 'rgba'));
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 256);
        } else {
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 128);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.15, colorStr);
            grad.addColorStop(0.5, colorStr.replace(')', ', 0.3)').replace('rgb', 'rgba'));
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 256);
        }

        if (dest && dest.isGalaxy) {
            // Dibujar brazos en espiral
            const arms = 2;
            for (let arm = 0; arm < arms; arm++) {
                for (let i = 0; i < 400; i++) {
                    const angle = (arm * Math.PI) + (i * 0.04);
                    const r = i * 0.28;
                    const x = cx + r * Math.cos(angle);
                    const y = cy + r * Math.sin(angle);
                    ctx.fillStyle = `rgba(255,255,255,${1 - i/400})`;
                    ctx.beginPath();
                    ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        } else if (!dest || (!dest.isBlackHole && dest.cat !== 'asteroids' && dest.cat !== 'exoplanets')) {
            // Estrellas: dibujar picos de luz
            ctx.strokeStyle = `rgba(255,255,255,0.4)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, 0); ctx.lineTo(cx, 256);
            ctx.moveTo(0, cy); ctx.lineTo(256, cy);
            ctx.stroke();
        }

        return new THREE.CanvasTexture(canvas);
    }

    let idx = 0;
    Object.keys(Destinations.CATEGORIES).forEach(catId => {
        Destinations.getByCategory(catId).forEach(dest => {
            if (dest.id === 'sol') return;
            
            const tex = createMacroTexture(dest.color || 'rgb(255,255,255)', dest);
            
            let obj3D;
            if (dest.id === 'milky_way') {
                // Via Lactea en el centro, como un disco sutil de fondo
                const mat = new THREE.MeshBasicMaterial({
                    map: tex, color: 0xffffff, transparent: true, opacity: 0,
                    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
                });
                obj3D = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
                obj3D.rotation.x = Math.PI / 2;
                obj3D.position.set(0, -3000, 0); // Debajo del sistema solar
                obj3D.userData.baseScale = 120000;
                obj3D.userData.maxOpacity = 0.25; // Nunca será completamente opaca
            } else {
                const mat = new THREE.SpriteMaterial({ 
                    map: tex, color: 0xffffff, transparent: true, opacity: 0,
                    blending: THREE.AdditiveBlending, depthWrite: false
                });
                obj3D = new THREE.Sprite(mat);
                
                let r;
                let scaleFactor = 0.15;
                if (dest.cat === 'asteroids') {
                    r = 500 + Math.random() * 1000; // Dentro o cerca del sistema solar (ej. Marte-Júpiter o cinturón Kuiper)
                    scaleFactor = 0.02; // Más pequeños
                } else if (dest.cat === 'exoplanets' || dest.cat === 'stars') {
                    r = 8000 + Math.random() * 15000; // Vecindario estelar
                    scaleFactor = 0.08;
                } else if (dest.cat === 'constellations') {
                    r = 25000 + Math.random() * 20000; // Fondo de constelaciones
                    scaleFactor = 0.1;
                } else if (dest.cat === 'black_holes') {
                    r = 60000 + Math.random() * 40000; // Agujeros negros a distancia intermedia
                    scaleFactor = 0.06;
                } else {
                    r = 200000 + (idx * 80000) % 500000 + Math.random() * 30000; // Galaxias lejanas
                }

                const theta = Math.random() * Math.PI * 2;
                // Para el sistema solar y vecinos, mantenerlos más cerca del plano orbital
                const phiRange = dest.cat === 'asteroids' ? 0.2 : 1.0; 
                const phi = Math.PI/2 + (Math.random() * phiRange * 2 - phiRange);
                
                obj3D.position.set(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.cos(phi), 
                    r * Math.sin(phi) * Math.sin(theta)
                );
                obj3D.userData.baseScale = dest.cat === 'asteroids' ? 30 : r * scaleFactor;
            }
            
            obj3D.scale.set(obj3D.userData.baseScale, obj3D.userData.baseScale, 1);
            obj3D.userData = { ...obj3D.userData, isMacro: true, destId: dest.id, name: dest.name, cat: dest.cat };
            
            macroDestinations.push(obj3D);
            macroGroup.add(obj3D);

            // Crear HTML Label
            const label = document.createElement('div');
            label.className = 'macro-label';
            label.textContent = dest.name;
            label.style.setProperty('--macro-color', dest.color);
            label.onclick = () => {
                if (window.travelToDest) window.travelToDest(dest.id);
            };
            if (labelContainer) labelContainer.appendChild(label);
            obj3D.userData.label = label;

            idx++;
        });
    });
})();

// ── Texture loader (texturas reales 2K — solarsystemscope.com) ────────────────

const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = 'anonymous';

const TEXTURE_URLS = {
    sol:      '/img/textures/2k_sun.jpg',
    mercurio: '/img/textures/2k_mercury.jpg',
    venus:    '/img/textures/2k_venus_surface.jpg',
    tierra:   '/img/textures/2k_earth_daymap.jpg',
    marte:    '/img/textures/2k_mars.jpg',
    jupiter:  '/img/textures/2k_jupiter.jpg',
    saturno:  '/img/textures/2k_saturn.jpg',
    urano:    '/img/textures/2k_uranus.jpg',
    neptuno:  '/img/textures/2k_neptune.jpg',
};

const TEXTURE_EXTRAS = {
    tierra_night:  '/img/textures/2k_earth_nightmap.jpg',
    tierra_clouds: '/img/textures/2k_earth_clouds.jpg',
    saturn_ring:   '/img/textures/2k_saturn_ring_alpha.png',
    stars:         '/img/textures/2k_stars_milky_way.jpg',
};

// Textura procedural como fallback
function makePlanetTexture(id) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    const ctx  = canvas.getContext('2d');
    const data = planetsData[id];
    ctx.fillStyle = data.color;
    ctx.fillRect(0, 0, 512, 512);
    const bands = { jupiter: 22, saturno: 14, urano: 6, neptuno: 8, tierra: 4, marte: 5 };
    const n = bands[id] ?? 4;
    for (let i = 0; i < n; i++) {
        const y = Math.random() * 512;
        const h = Math.random() * (id === 'jupiter' || id === 'saturno' ? 18 : 10) + 3;
        const alpha = Math.random() * 0.22 + 0.04;
        ctx.fillStyle = Math.random() > 0.5
            ? `rgba(255,255,255,${alpha})`
            : `rgba(0,0,0,${alpha})`;
        ctx.fillRect(0, y, 512, h);
    }
    if (id === 'jupiter') {
        ctx.save(); ctx.translate(180, 260); ctx.scale(1, 0.5);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 38);
        grad.addColorStop(0, 'rgba(180,60,30,0.85)');
        grad.addColorStop(1, 'rgba(180,60,30,0)');
        ctx.fillStyle = grad; ctx.beginPath();
        ctx.arc(0, 0, 38, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    return new THREE.CanvasTexture(canvas);
}

// Cargar textura real con fallback a procedural
function loadPlanetTexture(id) {
    const url = TEXTURE_URLS[id];
    if (!url) return makePlanetTexture(id);

    // Empezar con procedural (inmediato), swap a real cuando cargue
    const fallbackTex = makePlanetTexture(id);

    textureLoader.load(
        url,
        (realTex) => {
            // Buscar el mesh y actualizar su material
            const obj = planetObjects[id];
            if (obj && obj.mesh && obj.mesh.material) {
                obj.mesh.material.map = realTex;
                obj.mesh.material.needsUpdate = true;
            }
            console.log('✅ Textura cargada:', id);
        },
        undefined,
        (err) => { console.warn('⚠️ Textura falló:', id, '→ usando procedural'); }
    );

    return fallbackTex;
}

// ── Línea de órbita ───────────────────────────────────────────────────────────

function makeOrbitLine(radius) {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0x2244aa, transparent: true, opacity: 0.25 });
    return new THREE.Line(geo, mat);
}

// ── Sol (con textura real) ────────────────────────────────────────────────────

const sunMesh = (() => {
    const geo = new THREE.SphereGeometry(82, 64, 64);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
    // Intentar cargar textura real del Sol
    textureLoader.load(TEXTURE_URLS.sol, (tex) => {
        mat.map = tex;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.planetId = 'sol';
    scene.add(mesh);

    // Capas de corona
    [[110, 0xff8800, 0.10], [150, 0xff5500, 0.06], [220, 0xff2200, 0.03]].forEach(([r, c, o]) => {
        const cMat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, side: THREE.BackSide });
        mesh.add(new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), cMat));
    });

    return mesh;
})();

// ── Construir planetas (con texturas reales) ──────────────────────────────────

const planetMeshes  = [sunMesh];
const pivotGroups   = {};
const planetObjects = { sol: { mesh: sunMesh, size: 82 } };

orbitConfig.forEach(cfg => {
    scene.add(makeOrbitLine(cfg.radius));

    // Grupo pivote: rotarlo = planeta orbita
    const pivot = new THREE.Group();
    pivot.rotation.y = Math.random() * Math.PI * 2;
    scene.add(pivot);
    pivotGroups[cfg.id] = pivot;

    // Material con textura real
    const matConfig = {
        map:               loadPlanetTexture(cfg.id),
        roughness:         0.9,
        metalness:         0.0,
        emissive:          new THREE.Color(planetsData[cfg.id].color),
        emissiveIntensity: 0.04,
    };

    // Tierra: agregar mapa de noche como emissive
    if (cfg.id === 'tierra') {
        matConfig.emissiveMap = textureLoader.load(TEXTURE_EXTRAS.tierra_night);
        matConfig.emissive = new THREE.Color(0xffaa44);
        matConfig.emissiveIntensity = 0.8;
        matConfig.roughness = 0.7;
    }

    const geo  = new THREE.SphereGeometry(cfg.size, 48, 48);
    const mat  = new THREE.MeshStandardMaterial(matConfig);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x   = cfg.radius;
    mesh.userData.planetId = cfg.id;
    pivot.add(mesh);
    planetMeshes.push(mesh);
    planetObjects[cfg.id] = { mesh, pivot, size: cfg.size };

    // Tierra: capa de nubes independiente
    if (cfg.id === 'tierra') {
        const cloudTex = textureLoader.load(TEXTURE_EXTRAS.tierra_clouds);
        const cloudMesh = new THREE.Mesh(
            new THREE.SphereGeometry(cfg.size * 1.01, 48, 48),
            new THREE.MeshStandardMaterial({
                map: cloudTex,
                transparent: true,
                opacity: 0.45,
                depthWrite: false,
            })
        );
        cloudMesh.userData.isCloud = true;
        mesh.add(cloudMesh);
    }

    // Anillos de Saturno (con textura real alpha)
    if (cfg.hasRing) {
        const innerR = cfg.size * 1.4;
        const outerR = cfg.size * 2.5;
        const rGeo = new THREE.RingGeometry(innerR, outerR, 128);

        // Remap UVs: la textura es una franja horizontal (inner→outer)
        const pos = rGeo.attributes.position;
        const uv  = rGeo.attributes.uv;
        const v3  = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            const dist = v3.length();
            const u = (dist - innerR) / (outerR - innerR);
            uv.setXY(i, u, u);  // map both U and V to radial distance
        }
        uv.needsUpdate = true;

        // Intentar cargar textura real, con color fallback
        const rMat = new THREE.MeshBasicMaterial({
            color: 0xc8a85a,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
        });

        textureLoader.load(TEXTURE_EXTRAS.saturn_ring, (ringTex) => {
            rMat.map = ringTex;
            rMat.needsUpdate = true;
            console.log('✅ Textura anillos cargada');
        });

        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);

        // Resplandor exterior sutil
        const glowGeo = new THREE.RingGeometry(innerR * 0.95, outerR * 1.08, 128);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0xf0d888, side: THREE.DoubleSide,
            transparent: true, opacity: 0.08,
            depthWrite: false,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = Math.PI / 2;
        mesh.add(glow);
    }

    // Atmósfera
    if (['jupiter','saturno','urano','neptuno','tierra'].includes(cfg.id)) {
        const aColor = new THREE.Color(planetsData[cfg.id].color);
        const aMat   = new THREE.MeshBasicMaterial({
            color: aColor, side: THREE.BackSide,
            transparent: true, opacity: cfg.id === 'tierra' ? 0.15 : 0.08,
        });
        mesh.add(new THREE.Mesh(new THREE.SphereGeometry(cfg.size * 1.04, 32, 32), aMat));
    }
});

// ── Lunas de los planetas ──────────────────────────────────────────────────────

const moonsData = {
    tierra: [
        { name: 'Luna', size: 4, dist: 28, speed: 0.8, color: '#cccccc' },
    ],
    marte: [
        { name: 'Fobos', size: 1.5, dist: 16, speed: 1.8, color: '#aa9988' },
        { name: 'Deimos', size: 1, dist: 22, speed: 1.0, color: '#998877' },
    ],
    jupiter: [
        { name: 'Ío', size: 4, dist: 60, speed: 1.5, color: '#ddcc44' },
        { name: 'Europa', size: 3.5, dist: 70, speed: 1.2, color: '#ccbbaa' },
        { name: 'Ganímedes', size: 5, dist: 82, speed: 0.9, color: '#aabbcc' },
        { name: 'Calisto', size: 4.5, dist: 96, speed: 0.6, color: '#887766' },
    ],
    saturno: [
        { name: 'Titán', size: 5, dist: 100, speed: 0.7, color: '#ddaa55' },
        { name: 'Encélado', size: 2, dist: 70, speed: 1.5, color: '#ffffff' },
        { name: 'Rea', size: 3, dist: 85, speed: 1.0, color: '#cccccc' },
    ],
    urano: [
        { name: 'Titania', size: 3, dist: 42, speed: 1.0, color: '#aabbcc' },
        { name: 'Oberón', size: 2.8, dist: 52, speed: 0.7, color: '#99aabb' },
    ],
    neptuno: [
        { name: 'Tritón', size: 3.5, dist: 38, speed: -1.0, color: '#aaddff' }, // Órbita retrógrada
    ],
};

const moonPivots = []; // Para animar en el loop

Object.entries(moonsData).forEach(([planetId, moons]) => {
    const pObj = planetObjects[planetId];
    if (!pObj) return;

    moons.forEach(moonDef => {
        // Pivote de la luna se añade al mesh del planeta → orbita con él
        const moonPivot = new THREE.Group();
        moonPivot.rotation.y = Math.random() * Math.PI * 2;
        pObj.mesh.add(moonPivot);

        // Geometría de la luna
        const moonGeo = new THREE.SphereGeometry(moonDef.size, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(moonDef.color),
            roughness: 0.9,
            metalness: 0.0,
            emissive: new THREE.Color(moonDef.color),
            emissiveIntensity: 0.05,
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.x = moonDef.dist;
        moonPivot.add(moonMesh);

        // Línea de órbita de la luna (sutil)
        const pts = [];
        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * moonDef.dist, 0, Math.sin(a) * moonDef.dist));
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const orbitMat = new THREE.LineBasicMaterial({ color: 0x445566, transparent: true, opacity: 0.15 });
        moonPivot.add(new THREE.Line(orbitGeo, orbitMat));

        moonPivots.push({ pivot: moonPivot, speed: moonDef.speed });
    });
});

// ── Estado ────────────────────────────────────────────────────────────────────

let currentView     = 'system';
let speedMultiplier = 1;
let savedSpeed      = 1;

// GSAP anima camera.position + este vector → llamamos camera.lookAt(lookAtTarget) cada frame
const lookAtTarget = new THREE.Vector3(0, 0, 0);

// ── Loop de renderizado ───────────────────────────────────────────────────────

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Orbitar planetas: rotar cada pivote
    orbitConfig.forEach(cfg => {
        pivotGroups[cfg.id].rotation.y += delta * cfg.speed * speedMultiplier;
    });

    // Rotar planetas sobre sí mismos
    planetMeshes.forEach(m => {
        if (m !== sunMesh) m.rotation.y += delta * 0.15;
    });

    // Rotar nubes de la Tierra independientemente
    if (planetObjects.tierra) {
        planetObjects.tierra.mesh.children.forEach(child => {
            if (child.userData.isCloud) child.rotation.y += delta * 0.03;
        });
    }

    // Orbitar lunas alrededor de sus planetas
    moonPivots.forEach(m => {
        m.pivot.rotation.y += delta * m.speed * speedMultiplier;
    });

    // Pulso del sol
    const p = 1 + Math.sin(performance.now() * 0.002) * 0.04;
    sunMesh.scale.set(p, p, p);
    sunMesh.rotation.y += delta * 0.05;

    // Macro Universe fade & labels logic
    const camDist = camera.position.length();
    const wW = window.innerWidth / 2;
    const wH = window.innerHeight / 2;

    macroDestinations.forEach(obj3D => {
        let opacity = 0;
        const cat = obj3D.userData.cat;
        
        if (cat === 'asteroids') {
            opacity = 1; // Siempre visibles en el sistema solar
        } else if (cat === 'exoplanets' || cat === 'stars') {
            opacity = camDist > 1500 ? Math.min(1, (camDist - 1500) / 4000) : 0;
        } else if (cat === 'constellations') {
            opacity = camDist > 4000 ? Math.min(1, (camDist - 4000) / 8000) : 0;
        } else if (cat === 'black_holes') {
            opacity = camDist > 8000 ? Math.min(1, (camDist - 8000) / 15000) : 0;
        } else {
            // Galaxias y Milky Way
            opacity = camDist > 10000 ? Math.min(1, (camDist - 10000) / 20000) : 0;
        }

        // Respetar opacidad máxima si existe (ej: Vía Láctea sutil)
        if (obj3D.userData.maxOpacity) {
            opacity = Math.min(opacity, obj3D.userData.maxOpacity);
        }

        obj3D.material.opacity = opacity;
        
        if (opacity > 0) {
            const t = performance.now() * 0.001;
            const pulse = 1 + Math.sin(t + obj3D.id) * 0.1;
            const scale = obj3D.userData.baseScale * pulse;
            obj3D.scale.set(scale, scale, 1);

            // Update HTML label position
            if (obj3D.userData.label) {
                const pos = obj3D.position.clone().project(camera);
                if (pos.z < 1) { // Está delante de la cámara
                    obj3D.userData.label.style.left = (pos.x * wW + wW) + 'px';
                    obj3D.userData.label.style.top = (-pos.y * wH + wH) + 'px';
                    obj3D.userData.label.classList.add('visible');
                    obj3D.userData.label.style.opacity = opacity;
                } else {
                    obj3D.userData.label.classList.remove('visible');
                }
            }
        } else {
            if (obj3D.userData.label) obj3D.userData.label.classList.remove('visible');
        }
    });

    if (!controls.enabled) {
        camera.lookAt(lookAtTarget);
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();

// ── Raycasting: hover y clic ──────────────────────────────────────────────────

const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();
let   hoveredId = null;
let   mouseDownPos = { x: 0, y: 0 };
let   didDrag      = false;

renderer.domElement.addEventListener('mousedown', e => {
    mouseDownPos = { x: e.clientX, y: e.clientY };
    didDrag = false;
});

renderer.domElement.addEventListener('mousemove', e => {
    if (Math.abs(e.clientX - mouseDownPos.x) > 4 || Math.abs(e.clientY - mouseDownPos.y) > 4) {
        didDrag = true;
    }
    if (currentView !== 'system') return;

    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    // Solo permitir raycast a las galaxias si la cámara está lejos, o a los asteroides si están cerca
    const camDist = camera.position.length();
    const visibleMacros = macroDestinations.filter(m => m.material.opacity > 0.1);
    const allTargets = [...planetMeshes, ...visibleMacros];
    const hits = raycaster.intersectObjects(allTargets, false);

    if (hits.length > 0) {
        const obj = hits[0].object;
        if (obj.userData.isMacro) {
            // Ya no mostramos tooltip para macros, el HTML label ya lo hace.
            // Solo cambiamos el cursor.
            if (hoveredId !== null) { hoveredId = null; hideTooltip(); }
            renderer.domElement.style.cursor = 'pointer';
        } else {
            const id = obj.userData.planetId;
            if (id !== hoveredId) {
                hoveredId = id;
                showTooltip(e, id);
            } else {
                moveTooltip(e);
            }
            renderer.domElement.style.cursor = 'pointer';
        }
    } else {
        if (hoveredId !== null) { hoveredId = null; hideTooltip(); }
        renderer.domElement.style.cursor = '';
    }
});

renderer.domElement.addEventListener('click', e => {
    if (didDrag || currentView !== 'system') return;
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    const visibleMacros = macroDestinations.filter(m => m.material.opacity > 0.1);
    const allTargets = [...planetMeshes, ...visibleMacros];
    const hits = raycaster.intersectObjects(allTargets, false);
    
    if (hits.length > 0) {
        const obj = hits[0].object;
        if (obj.userData.isMacro) {
            if (window.travelToDest) window.travelToDest(obj.userData.destId);
        } else {
            travelTo(obj.userData.planetId);
        }
    }
});

// ── Warp effect (salto al hiperespacio) ───────────────────────────────────────

function createWarpEffect() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        z-index:450; pointer-events:none; overflow:hidden;
    `;
    document.body.appendChild(overlay);

    // Create warp lines
    for (let i = 0; i < 80; i++) {
        const line = document.createElement('div');
        const angle = Math.random() * 360;
        const delay = Math.random() * 200;
        const cx = 50 + (Math.random() - 0.5) * 10;
        const cy = 50 + (Math.random() - 0.5) * 10;
        const len = Math.random() * 150 + 80;
        const color = Math.random() > 0.5 ? '#aaccff' : '#ffffff';
        line.style.cssText = `
            position:absolute;
            top:${cy}%; left:${cx}%;
            width:2px; height:0px;
            background:linear-gradient(to bottom, transparent, ${color}, transparent);
            transform:rotate(${angle}deg);
            transform-origin: top center;
            animation: warpLine 0.6s ${delay}ms ease-in forwards;
            opacity:0;
        `;
        overlay.appendChild(line);
    }

    // White flash
    const flash = document.createElement('div');
    flash.style.cssText = `
        position:absolute; top:0; left:0; width:100%; height:100%;
        background:white; opacity:0;
        animation: warpFlash 0.8s 0.4s ease-out forwards;
    `;
    overlay.appendChild(flash);

    setTimeout(() => overlay.remove(), 1500);
}

// Inject warp keyframes
const warpStyle = document.createElement('style');
warpStyle.textContent = `
@keyframes warpLine {
    0%   { height: 0; opacity: 0; }
    30%  { height: 10px; opacity: 1; }
    100% { height: 300px; opacity: 0; }
}
@keyframes warpFlash {
    0%   { opacity: 0; }
    40%  { opacity: 0.8; }
    100% { opacity: 0; }
}
`;
document.head.appendChild(warpStyle);

// ── Estrellas fugaces (CSS) ───────────────────────────────────────────────────

setInterval(() => {
    const s = document.createElement('div');
    s.className = 'shooting-star';
    s.style.top  = Math.random() * 50 + '%';
    s.style.left = (Math.random() * 50 + 50) + '%';
    s.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2000);
}, 3000);

// ── Velocidad ─────────────────────────────────────────────────────────────────

function setSpeed(s) {
    speedMultiplier = s;
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.speed) === s);
    });
}
document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => setSpeed(parseInt(btn.dataset.speed)));
});

// ── Tooltip ───────────────────────────────────────────────────────────────────

function showTooltip(e, id) {
    const tt = document.getElementById('tooltip');
    tt.querySelector('.tt-name').textContent = planetsData[id].name;
    tt.style.setProperty('--tt-color', planetsData[id].color);
    moveTooltip(e);
    tt.classList.add('visible');
}
function moveTooltip(e) {
    const tt = document.getElementById('tooltip');
    tt.style.left = (e.clientX + 15) + 'px';
    tt.style.top  = (e.clientY - 10) + 'px';
}
function hideTooltip() {
    document.getElementById('tooltip').classList.remove('visible');
}

// ── Mini nav ──────────────────────────────────────────────────────────────────

(function buildMiniNav() {
    const nav = document.getElementById('mini-nav');
    Object.keys(planetsData).forEach(id => {
        const btn = document.createElement('div');
        btn.className = 'mini-planet-btn';
        btn.setAttribute('data-name', planetsData[id].name);
        btn.style.background = planetsData[id].gradient;
        btn.onclick = () => travelTo(id);
        nav.appendChild(btn);
    });
})();

// ── Efecto warp (CSS) ─────────────────────────────────────────────────────────

function createWarpEffect() {
    const ov = document.getElementById('zoom-overlay');
    ov.classList.add('active');
    ov.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const r = document.createElement('div');
        r.className = 'warp-tunnel';
        r.style.animationDelay = (i * 0.15) + 's';
        r.style.borderColor    = `rgba(0,212,255,${0.3 - i * 0.03})`;
        ov.appendChild(r);
    }
    for (let i = 0; i < 40; i++) {
        const s = document.createElement('div');
        s.className = 'warp-stars';
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 600 + 200;
        s.style.setProperty('--tx', Math.cos(a) * d + 'px');
        s.style.setProperty('--ty', Math.sin(a) * d + 'px');
        s.style.animationDelay = Math.random() * 0.5 + 's';
        ov.appendChild(s);
    }
    setTimeout(() => { ov.classList.remove('active'); ov.innerHTML = ''; }, 2000);
}

// ── Viajar a planeta (GSAP camera animation) ──────────────────────────────────

function travelTo(id) {
    if (currentView !== 'system') return;
    currentView = 'traveling';

    hideTooltip();
    createWarpEffect();

    savedSpeed      = speedMultiplier;
    speedMultiplier = 0;          // pausa órbitas durante viaje
    controls.enabled = false;

    document.getElementById('coords').textContent =
        `SECTOR: ${planetsData[id].name.toUpperCase()} · VIAJANDO...`;

    // Posición mundial actual del planeta
    const targetPos = new THREE.Vector3();
    if (id === 'sol') {
        targetPos.set(0, 0, 0);
    } else {
        planetObjects[id].mesh.getWorldPosition(targetPos);
    }

    const sz  = planetObjects[id].size;
    const cam = {
        x: targetPos.x + sz * 0.3,
        y: targetPos.y + sz * 2.5,
        z: targetPos.z + sz * 7,
    };

    // Animar cámara con GSAP (2.5 s, ease tipo nave espacial)
    gsap.to(camera.position, { ...cam, duration: 2.5, ease: 'power3.inOut' });
    gsap.to(lookAtTarget,    {
        x: targetPos.x, y: targetPos.y, z: targetPos.z,
        duration: 2.5,
        ease: 'power3.inOut',
        onComplete: () => showPlanetDetail(id),
    });
}

// ── Panel detalle (HTML) ──────────────────────────────────────────────────────

function addRingsHTML(parent, bigSize) {
    [
        { m: 1.3, op: 0.18, bw: 3 }, { m: 1.5,  op: 0.38, bw: 7 },
        { m: 1.68, op: 0.52, bw: 6 },{ m: 1.85, op: 0.35, bw: 4 },
        { m: 2.0,  op: 0.2,  bw: 2 },
    ].forEach(r => {
        const el = document.createElement('div');
        el.className = 'saturn-ring';
        el.style.width       = (bigSize * r.m) + 'px';
        el.style.height      = (bigSize * r.m) + 'px';
        el.style.borderColor = `rgba(210,180,140,${r.op})`;
        el.style.borderWidth = r.bw + 'px';
        parent.appendChild(el);
    });
}

function showPlanetDetail(id) {
    const data   = planetsData[id];
    const detail = document.getElementById('planet-detail');

    document.getElementById('detail-name').textContent = data.name;
    document.getElementById('detail-type').textContent = data.type;
    document.getElementById('detail-desc').textContent = data.desc;

    const visual  = document.getElementById('detail-planet-visual');
    const bigSize = Math.min(Math.max(data.size * 4, 120), 280);

    // Usar textura real como imagen del planeta en detalle
    const texUrl = TEXTURE_URLS[id];
    const bgImage = texUrl
        ? `url('${texUrl}')`
        : data.gradient;
    const bgStyle = texUrl
        ? `background-image:${bgImage}; background-size:cover; background-position:center;`
        : `background:${data.gradient};`;

    visual.style.cssText = `
        width:${bigSize}px; height:${bigSize}px;
        ${bgStyle}
        border-radius: 50%;
        box-shadow:
            0 0 ${bigSize}px ${data.color}66,
            0 0 ${bigSize*2}px ${data.color}22,
            inset -${bigSize/5}px -${bigSize/5}px ${bigSize/2.5}px rgba(0,0,0,0.7),
            inset ${bigSize/10}px ${bigSize/10}px ${bigSize/4}px rgba(255,255,255,0.12);
    `;

    const glow = document.getElementById('detail-glow');
    glow.style.width      = (bigSize * 1.6) + 'px';
    glow.style.height     = (bigSize * 1.6) + 'px';
    glow.style.background = data.color;

    visual.querySelectorAll('.saturn-ring').forEach(r => r.remove());
    if (data.hasRing) addRingsHTML(visual, bigSize);

    // ── Build stats grid: merge hardcoded + API real data ──────────────
    const grid = document.getElementById('detail-stats');
    grid.innerHTML = '';

    // Try to get API data for this planet
    let apiBody = null;
    let apiStats = null;
    if (typeof SolarAPI !== 'undefined') {
        apiBody = SolarAPI.getPlanetByLocalId(id);
        apiStats = SolarAPI.formatStats(apiBody);
    }

    // Use API stats if available, fallback to hardcoded
    const statsToShow = apiStats || data.stats;
    Object.entries(statsToShow).forEach(([label, info]) => {
        const card = document.createElement('div');
        card.className = 'stat-card' + (info.api ? ' api-data' : '');
        card.style.setProperty('--planet-color', data.color);
        card.innerHTML = `
            <div class="stat-label">${label}</div>
            <div class="stat-value">${info.value}<span class="stat-unit">${info.unit}</span></div>
        `;
        grid.appendChild(card);
    });

    // ── Show moons from API ────────────────────────────────────────────
    const moonsSection = document.getElementById('moons-section');
    const moonsList = document.getElementById('moons-list');
    if (moonsSection && moonsList) {
        const moons = apiBody ? SolarAPI.getMoons(apiBody) : [];
        if (moons.length > 0) {
            moonsList.innerHTML = '';
            moons.forEach(name => {
                const chip = document.createElement('span');
                chip.className = 'moon-chip';
                chip.textContent = name;
                moonsList.appendChild(chip);
            });
            moonsSection.style.display = 'block';
        } else {
            moonsSection.style.display = 'none';
        }
    }

    document.documentElement.style.setProperty('--planet-color', data.color);
    detail.classList.add('visible');
    document.getElementById('btn-back').classList.add('visible');
    document.getElementById('mini-nav').classList.add('visible');

    const dist = apiStats && apiStats['Semi-eje mayor']
        ? apiStats['Semi-eje mayor']
        : data.stats['Dist. al Sol'];
    document.getElementById('coords').textContent = dist
        ? `SECTOR: ${data.name.toUpperCase()} · DISTANCIA: ${dist.value} ${dist.unit}`
        : `SECTOR: ${data.name.toUpperCase()} · CENTRO DEL SISTEMA`;

    currentView = 'detail';
}

// ── Volver ────────────────────────────────────────────────────────────────────

function goBack() {
    if (currentView !== 'detail') return;

    document.getElementById('planet-detail').classList.remove('visible');
    document.getElementById('btn-back').classList.remove('visible');
    document.getElementById('mini-nav').classList.remove('visible');

    createWarpEffect();

    // GSAP devuelve la cámara a vista general
    gsap.to(camera.position, { x: 0, y: 900, z: 1400, duration: 2.2, ease: 'power2.inOut' });
    gsap.to(lookAtTarget, {
        x: 0, y: 0, z: 0,
        duration: 2.2,
        ease: 'power2.inOut',
        onComplete: () => {
            controls.target.set(0, 0, 0);
            controls.update();
            controls.enabled = true;
            speedMultiplier  = savedSpeed;
            document.getElementById('coords').textContent = 'SECTOR: BRAZO DE ORIÓN · DISTANCIA: 0 UA';
            currentView = 'system';
        },
    });
}

document.getElementById('btn-back').addEventListener('click', goBack);
document.addEventListener('keydown', e => { if (e.key === 'Escape') goBack(); });

// ── Pantalla de carga ─────────────────────────────────────────────────────────

// ── Init: load API data then hide loading screen ─────────────────────────────

window.addEventListener('load', async () => {
    const badge = document.getElementById('api-badge');
    try {
        if (typeof SolarAPI !== 'undefined') {
            await SolarAPI.fetchPlanets();
            SolarAPI.updateLoadBar(100);
            if (badge) {
                badge.classList.add('connected');
                if (SolarAPI.isLive) {
                    badge.querySelector('.api-label').textContent = 'API LIVE';
                } else {
                    badge.querySelector('.api-label').textContent = 'DATOS IMCCE';
                    badge.style.borderColor = 'rgba(0,212,255,0.3)';
                    badge.style.background = 'rgba(0,212,255,0.08)';
                    const dot = badge.querySelector('.api-dot');
                    dot.style.background = '#00d4ff';
                    dot.style.boxShadow = '0 0 6px #00d4ff';
                    const label = badge.querySelector('.api-label');
                    label.style.color = '#00d4ff';
                }
            }
        }
    } catch(e) {
        console.warn('API init error:', e);
        if (badge) { badge.classList.add('error'); badge.querySelector('.api-label').textContent = 'OFFLINE'; }
    }
    setTimeout(() => document.getElementById('loading').classList.add('hidden'), 1500);
});

// ── Resize ────────────────────────────────────────────────────────────────────

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Animación de Cámara Hacia Macros ──────────────────────────────────────────

window.animateCameraToMacro = function(destId, callback) {
    const obj = macroDestinations.find(m => m.userData.destId === destId);
    if (!obj) {
        if (callback) callback();
        return;
    }
    
    // Calcula la posición objetivo, acercándose un poco antes de chocar
    const targetPos = obj.position.clone();
    const dir = targetPos.clone().normalize();
    const offset = obj.userData.baseScale * 0.8;
    targetPos.sub(dir.multiplyScalar(offset));
    
    controls.enabled = false;
    
    // Zoom in rapidísimo estilo hyper-drive
    gsap.to(camera.position, {
        x: targetPos.x, y: targetPos.y, z: targetPos.z,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: callback
    });
    
    // Mantener la mirada en el objeto mientras volamos hacia él
    gsap.to(lookAtTarget, {
        x: obj.position.x, y: obj.position.y, z: obj.position.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
            camera.lookAt(lookAtTarget);
        }
    });
};
