// ══════════════════════════════════════════════════════════════════════════════
// Navigator — UI y renderizado de destinos interestelares
// ══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    const navPanel   = document.getElementById('nav-panel');
    const navBody    = document.getElementById('nav-body');
    const navToggle  = document.getElementById('nav-toggle');
    const navClose   = document.getElementById('nav-close');
    const destDetail = document.getElementById('dest-detail');
    const destBack   = document.getElementById('dest-back');
    const destCanvas = document.getElementById('dest-canvas');
    const destCtx    = destCanvas ? destCanvas.getContext('2d') : null;

    let currentDest = null;
    let animFrame   = null;

    // ── Build nav panel items ──────────────────────────────────────────
    function buildNavPanel() {
        if (!navBody || typeof Destinations === 'undefined') return;
        navBody.innerHTML = '';

        // Solar system link
        const solDiv = document.createElement('div');
        solDiv.className = 'nav-category';
        solDiv.innerHTML = `<div class="nav-cat-label">☀ SISTEMA SOLAR</div>`;
        const solItem = document.createElement('div');
        solItem.className = 'nav-item';
        solItem.innerHTML = `
            <div class="nav-item-dot" style="background:#ffdd00;color:#ffdd00"></div>
            <div class="nav-item-info">
                <div class="nav-item-name">Sistema Solar</div>
                <div class="nav-item-sub">Nuestro hogar — 8 planetas</div>
            </div>
            <div class="nav-item-arrow">→</div>
        `;
        solItem.onclick = () => { closeDest(); closeNav(); };
        solDiv.appendChild(solItem);
        navBody.appendChild(solDiv);

        // Categories
        Object.entries(Destinations.CATEGORIES).forEach(([catId, cat]) => {
            const catDiv = document.createElement('div');
            catDiv.className = 'nav-category';
            catDiv.innerHTML = `<div class="nav-cat-label">${cat.icon} ${cat.label}</div>`;

            Destinations.getByCategory(catId).forEach(dest => {
                const item = document.createElement('div');
                item.className = 'nav-item';
                item.innerHTML = `
                    <div class="nav-item-dot" style="background:${dest.color};color:${dest.color}"></div>
                    <div class="nav-item-info">
                        <div class="nav-item-name">${dest.name}</div>
                        <div class="nav-item-sub">${dest.subtitle}</div>
                    </div>
                    <div class="nav-item-arrow">→</div>
                `;
                item.onclick = () => travelToDest(dest.id);
                catDiv.appendChild(item);
            });

            navBody.appendChild(catDiv);
        });
    }

    // ── Open/Close nav panel ───────────────────────────────────────────
    function openNav()  { navPanel.classList.add('open'); }
    function closeNav() { navPanel.classList.remove('open'); }

    if (navToggle) navToggle.onclick = () => {
        navPanel.classList.contains('open') ? closeNav() : openNav();
    };
    if (navClose) navClose.onclick = closeNav;

    // ── Travel to destination ──────────────────────────────────────────
    function travelToDest(id) {
        const dest = Destinations.getById(id);
        if (!dest) return;

        closeNav();
        currentDest = dest;

        // Warp effect for UI
        if (typeof createWarpEffect === 'function') createWarpEffect();

        // Update HUD
        const coords = document.getElementById('coords');
        if (coords) coords.textContent = `DESTINO: ${dest.name.toUpperCase()} · ${dest.subtitle}`;

        // Fly 3D Camera first, then show UI
        if (typeof window.animateCameraToMacro === 'function' && dest.id !== 'sol' && !orbitConfig.find(o => o.id === dest.id)) {
             window.animateCameraToMacro(id, () => {
                 showDestDetail(dest);
             });
        } else {
             setTimeout(() => showDestDetail(dest), 800);
        }
    }
    window.travelToDest = travelToDest;

    // ── Show destination detail ────────────────────────────────────────
    function showDestDetail(dest) {
        document.getElementById('dest-name').textContent = dest.name;
        document.getElementById('dest-subtitle').textContent = dest.subtitle;
        document.getElementById('dest-desc').textContent = dest.desc;

        // Stats grid
        const grid = document.getElementById('dest-stats');
        grid.innerHTML = '';
        if (dest.stats) {
            Object.entries(dest.stats).forEach(([label, info]) => {
                const card = document.createElement('div');
                card.className = 'stat-card';
                card.innerHTML = `
                    <div class="stat-label">${label} <span class="stat-dot">●</span></div>
                    <div class="stat-value">${info.value} <span class="stat-unit">${info.unit}</span></div>
                `;
                grid.appendChild(card);
            });
        }

        document.documentElement.style.setProperty('--planet-color', dest.color);

        // Start canvas rendering
        startCanvasRender(dest);

        destDetail.classList.add('visible');
        if (destBack) destBack.classList.add('visible');
        const hudCatalog = document.querySelector('.hud-catalog');
        if (hudCatalog) hudCatalog.style.visibility = 'hidden';
    }

    // ── Close destination ──────────────────────────────────────────────
    function closeDest() {
        destDetail.classList.remove('visible');
        if (destBack) destBack.classList.remove('visible');
        const hudCatalog = document.querySelector('.hud-catalog');
        if (hudCatalog) hudCatalog.style.visibility = 'visible';
        if (animFrame) cancelAnimationFrame(animFrame);
        animFrame = null;
        currentDest = null;
        
        if (typeof controls !== 'undefined') controls.enabled = true;

        const coords = document.getElementById('coords');
        if (coords) coords.textContent = 'SECTOR: BRAZO DE ORIÓN · DISTANCIA: 0 UA';
    }

    // Back button
    if (destBack) destBack.onclick = closeDest;

    // Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && currentDest) closeDest();
    });

    // ── Canvas rendering ───────────────────────────────────────────────
    function startCanvasRender(dest) {
        if (!destCtx) return;
        if (animFrame) cancelAnimationFrame(animFrame);

        // Set canvas resolution to match display
        const dpr = Math.min(window.devicePixelRatio, 2);
        destCanvas.width  = 400 * dpr;
        destCanvas.height = 400 * dpr;
        destCtx.scale(dpr, dpr);

        const W = 400;
        const H = 400;
        let t = 0;

        function draw() {
            t += 0.016;
            destCtx.clearRect(0, 0, W, H);

            // Dark background
            destCtx.fillStyle = 'rgba(2,2,12,1)';
            destCtx.fillRect(0, 0, W, H);

            // Background stars
            drawBgStars(W, H, t);

            if (dest.isBlackHole) {
                drawBlackHole(dest, W, H, t);
            } else if (dest.isGalaxy) {
                drawGalaxy(dest, W, H, t);
            } else if (dest.cat === 'exoplanets' || dest.cat === 'asteroids') {
                drawAsteroidOrPlanet(dest, W, H, t);
            } else {
                drawConstellation(dest, W, H, t);
            }

            animFrame = requestAnimationFrame(draw);
        }
        draw();
    }

    // ── Draw background stars ──────────────────────────────────────────
    const bgStars = [];
    for (let i = 0; i < 150; i++) {
        bgStars.push({
            x: Math.random(), y: Math.random(),
            s: Math.random() * 1.2 + 0.2,
            b: Math.random(),
            sp: Math.random() * 2 + 1,
        });
    }

    function drawBgStars(W, H, t) {
        bgStars.forEach(s => {
            const alpha = 0.2 + Math.sin(t * s.sp + s.b * 10) * 0.2;
            destCtx.fillStyle = `rgba(180,200,255,${alpha})`;
            destCtx.beginPath();
            destCtx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2);
            destCtx.fill();
        });
    }

    // ── Draw constellation / star system ───────────────────────────────
    function drawConstellation(dest, W, H, t) {
        if (!dest.starPositions) return;

        const cx = W / 2;
        const cy = H / 2;
        const scale = dest.isStar ? 1.2 : 1.5;

        // Draw constellation lines first (behind stars)
        if (dest.lines && dest.lines.length) {
            dest.lines.forEach(([a, b]) => {
                const sa = dest.starPositions[a];
                const sb = dest.starPositions[b];
                if (!sa || !sb) return;

                const ax = cx + sa.x * scale, ay = cy - sa.y * scale;
                const bx = cx + sb.x * scale, by = cy - sb.y * scale;

                // Animated dashed line
                const alpha = 0.25 + Math.sin(t * 0.8) * 0.08;
                destCtx.strokeStyle = `rgba(100,160,255,${alpha})`;
                destCtx.lineWidth = 1;
                destCtx.setLineDash([6, 4]);
                destCtx.lineDashOffset = -t * 15;
                destCtx.beginPath();
                destCtx.moveTo(ax, ay);
                destCtx.lineTo(bx, by);
                destCtx.stroke();
            });
            destCtx.setLineDash([]);
        }

        // Draw each star
        dest.starPositions.forEach((star, i) => {
            const x = cx + star.x * scale;
            const y = cy - star.y * scale;
            const baseMag = Math.max(2, 7 - star.mag);
            const pulse = 1 + Math.sin(t * 1.5 + i * 1.7) * 0.12;
            const size = baseMag * pulse;

            // Outer glow
            const grd = destCtx.createRadialGradient(x, y, 0, x, y, size * 5);
            grd.addColorStop(0, star.color || '#ffffff');
            grd.addColorStop(0.15, (star.color || '#ffffff') + '88');
            grd.addColorStop(0.4, (star.color || '#ffffff') + '22');
            grd.addColorStop(1, 'transparent');
            destCtx.fillStyle = grd;
            destCtx.beginPath();
            destCtx.arc(x, y, size * 5, 0, Math.PI * 2);
            destCtx.fill();

            // Inner bright core
            destCtx.fillStyle = '#ffffff';
            destCtx.beginPath();
            destCtx.arc(x, y, size * 0.6, 0, Math.PI * 2);
            destCtx.fill();

            // Cross/spike for bright stars
            if (star.mag < 2) {
                destCtx.strokeStyle = `rgba(255,255,255,${0.15 + pulse * 0.05})`;
                destCtx.lineWidth = 0.5;
                const sp = size * 3;
                destCtx.beginPath();
                destCtx.moveTo(x - sp, y); destCtx.lineTo(x + sp, y);
                destCtx.stroke();
                destCtx.beginPath();
                destCtx.moveTo(x, y - sp); destCtx.lineTo(x, y + sp);
                destCtx.stroke();
            }

            // Star name label (keep this since it's next to the star)
            destCtx.font = '10px "Exo 2", sans-serif';
            destCtx.fillStyle = 'rgba(255,255,255,0.45)';
            destCtx.textAlign = 'center';
            destCtx.fillText(star.name, x, y + size * 1.2 + 14);
        });
    }

    // ── Draw galaxy ────────────────────────────────────────────────────
    function drawGalaxy(dest, W, H, t) {
        const cx = W / 2;
        const cy = H / 2;
        const arms = dest.spiralArms || 2;
        const color = dest.spiralColor || '#ffddaa';

        const r = parseInt(color.slice(1,3), 16);
        const g = parseInt(color.slice(3,5), 16);
        const b = parseInt(color.slice(5,7), 16);

        if (!dest._cachedCanvas) {
            const oc = document.createElement('canvas');
            oc.width = W; oc.height = H;
            const octx = oc.getContext('2d');

            // Galaxy dust halo
            const haloGrd = octx.createRadialGradient(cx, cy, 0, cx, cy, 160);
            haloGrd.addColorStop(0, `rgba(${r},${g},${b},0.12)`);
            haloGrd.addColorStop(0.6, `rgba(${r},${g},${b},0.03)`);
            haloGrd.addColorStop(1, 'transparent');
            octx.fillStyle = haloGrd;
            octx.beginPath();
            octx.arc(cx, cy, 160, 0, Math.PI * 2);
            octx.fill();

            // Spiral arms
            for (let arm = 0; arm < arms; arm++) {
                const armOffset = (arm / arms) * Math.PI * 2;
                const numDots = 800;

                for (let i = 0; i < numDots; i++) {
                    const progress = i / numDots;
                    const dist = progress * 150 + 8;
                    const angle = armOffset + progress * 4.5;
                    const spread = (Math.random() - 0.5) * (15 + progress * 35);

                    const px = cx + Math.cos(angle) * dist + Math.cos(angle + Math.PI/2) * spread;
                    const py = cy + Math.sin(angle) * dist * 0.45 + Math.sin(angle + Math.PI/2) * spread * 0.45;

                    const alpha = (1 - progress * 0.8) * 0.55;
                    const dotSize = Math.random() * 1.3 + 0.2;

                    const cr = Math.min(255, r + (1 - progress) * 50);
                    const cg = Math.min(255, g + (1 - progress) * 30);
                    const cb = Math.min(255, b + progress * 40);

                    octx.fillStyle = `rgba(${cr|0},${cg|0},${cb|0},${alpha})`;
                    octx.beginPath();
                    octx.arc(px, py, dotSize, 0, Math.PI * 2);
                    octx.fill();
                }
            }

            // Bright galactic core
            const coreGrd = octx.createRadialGradient(cx, cy, 0, cx, cy, 25);
            coreGrd.addColorStop(0, `rgba(255,255,230,0.9)`);
            coreGrd.addColorStop(0.3, `rgba(${r},${g},${b},0.5)`);
            coreGrd.addColorStop(1, 'transparent');
            octx.fillStyle = coreGrd;
            octx.beginPath();
            octx.arc(cx, cy, 25, 0, Math.PI * 2);
            octx.fill();

            // Center point
            octx.fillStyle = '#fff';
            octx.beginPath();
            octx.arc(cx, cy, 2, 0, Math.PI * 2);
            octx.fill();
            
            dest._cachedCanvas = oc;
        }

        destCtx.save();
        destCtx.translate(cx, cy);
        destCtx.rotate(t * 0.08);
        destCtx.drawImage(dest._cachedCanvas, -cx, -cy);
        destCtx.restore();
    }

    // ── Draw Black Hole ────────────────────────────────────────────────
    function drawBlackHole(dest, W, H, t) {
        const cx = W / 2;
        const cy = H / 2;
        const color = dest.color || '#ff8844';
        
        const r = parseInt(color.slice(1,3), 16);
        const g = parseInt(color.slice(3,5), 16);
        const b = parseInt(color.slice(5,7), 16);

        if (!dest._cachedCanvas) {
            const oc = document.createElement('canvas');
            oc.width = W; oc.height = H;
            const octx = oc.getContext('2d');
            
            for (let i = 0; i < 600; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 60 + Math.random() * 120;
                const alpha = Math.max(0, 1 - (dist - 60) / 120) * (0.5 + Math.random() * 0.5);
                
                octx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                octx.beginPath();
                octx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, Math.random() * 3, 0, Math.PI * 2);
                octx.fill();
            }
            dest._cachedCanvas = oc;
        }
        
        // Accretion disk (rotates)
        destCtx.save();
        destCtx.translate(cx, cy);
        destCtx.rotate(t * 0.5);
        destCtx.scale(1, 0.3); // Inclinación del disco
        destCtx.drawImage(dest._cachedCanvas, -cx, -cy);
        destCtx.restore();
        
        // Event Horizon (Black Center)
        destCtx.fillStyle = '#000000';
        destCtx.beginPath();
        destCtx.arc(cx, cy, 45, 0, Math.PI * 2);
        destCtx.fill();
        
        // Photon ring (Glow around black hole)
        const ringGlow = destCtx.createRadialGradient(cx, cy, 45, cx, cy, 60);
        ringGlow.addColorStop(0, `rgba(${r},${g},${b},1)`);
        ringGlow.addColorStop(0.5, `rgba(${r},${g},${b},0.3)`);
        ringGlow.addColorStop(1, 'transparent');
        destCtx.fillStyle = ringGlow;
        destCtx.beginPath();
        destCtx.arc(cx, cy, 65, 0, Math.PI * 2);
        destCtx.fill();
    }

    // ── Draw Asteroid / Exoplanet ──────────────────────────────────────
    function drawAsteroidOrPlanet(dest, W, H, t) {
        const cx = W / 2;
        const cy = H / 2;
        const color = dest.color || '#aaaaaa';
        const isComet = dest.id === 'halley';
        
        const r = parseInt(color.slice(1,3), 16);
        const g = parseInt(color.slice(3,5), 16);
        const b = parseInt(color.slice(5,7), 16);

        // Renderizado especial de alta calidad para Cometas
        if (isComet) {
            const wobbleX = Math.sin(t * 5) * 2;
            const wobbleY = Math.cos(t * 3.4) * 2;
            const hx = cx + wobbleX;
            const hy = cy + wobbleY;

            // 1. Cola de iones (recta, tenue y azulada)
            const ionGrad = destCtx.createLinearGradient(hx, hy, hx - 220, hy + 90);
            ionGrad.addColorStop(0, `rgba(100, 180, 255, 0.8)`);
            ionGrad.addColorStop(1, 'transparent');
            destCtx.fillStyle = ionGrad;
            destCtx.beginPath();
            destCtx.moveTo(hx + 10, hy - 10);
            destCtx.lineTo(hx - 220, hy + 70);
            destCtx.lineTo(hx - 200, hy + 110);
            destCtx.lineTo(hx - 10, hy + 10);
            destCtx.fill();

            // 2. Cola de polvo (curva, ancha y blanco-amarillenta)
            const dustGrad = destCtx.createRadialGradient(hx, hy, 0, hx - 100, hy + 80, 180);
            dustGrad.addColorStop(0, `rgba(255, 240, 200, 0.85)`);
            dustGrad.addColorStop(1, 'transparent');
            destCtx.fillStyle = dustGrad;
            destCtx.beginPath();
            destCtx.moveTo(hx + 15, hy - 15);
            destCtx.quadraticCurveTo(hx - 80, hy + 10, hx - 160, hy + 150);
            destCtx.quadraticCurveTo(hx - 100, hy + 130, hx - 15, hy + 15);
            destCtx.fill();

            // 3. Coma (Halo brillante de gas rodeando el núcleo)
            const comaGrad = destCtx.createRadialGradient(hx, hy, 0, hx, hy, 45);
            comaGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            comaGrad.addColorStop(0.2, 'rgba(200, 240, 255, 0.8)');
            comaGrad.addColorStop(1, 'transparent');
            destCtx.fillStyle = comaGrad;
            destCtx.beginPath();
            destCtx.arc(hx, hy, 45, 0, Math.PI * 2);
            destCtx.fill();

            // 4. Núcleo de hielo sucio e irregular
            const bodyGrad = destCtx.createRadialGradient(hx - 3, hy - 3, 0, hx, hy, 12);
            bodyGrad.addColorStop(0, '#ffffff');
            bodyGrad.addColorStop(1, '#88aacc');
            destCtx.fillStyle = bodyGrad;
            destCtx.beginPath();
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const dist = 10 * (0.7 + Math.sin(i * 4 + t * 0.1) * 0.2 + Math.cos(i * 2) * 0.1); 
                if (i===0) destCtx.moveTo(hx + Math.cos(angle)*dist, hy + Math.sin(angle)*dist);
                else destCtx.lineTo(hx + Math.cos(angle)*dist, hy + Math.sin(angle)*dist);
            }
            destCtx.fill();
            
            // 5. Partículas de polvo y hielo desprendiéndose dinámicamente
            for(let i=0; i<30; i++) {
                 const pt = (t * 0.6 + i * 0.13) % 1; // Loop de 0 a 1
                 const spread = Math.sin(i * 7) * pt * 60; // Dispersión
                 const px = hx - pt * 160 + spread;
                 const py = hy + pt * 120 + spread * 0.5;
                 
                 destCtx.fillStyle = `rgba(255, 255, 255, ${(1 - pt) * 0.8})`;
                 destCtx.beginPath();
                 destCtx.arc(px, py, (i % 2 === 0 ? 1 : 2) * (1 - pt), 0, Math.PI * 2);
                 destCtx.fill();
            }
            
            return; // Finalizamos, no ejecutar la lógica de planetas/asteroides debajo
        }

        // Cuerpo rocoso/planeta
        const size = dest.cat === 'asteroids' ? 30 : 50;
        
        // Glow atmosférico para exoplanetas
        if (dest.cat === 'exoplanets') {
            const atmGrad = destCtx.createRadialGradient(cx, cy, size, cx, cy, size + 15);
            atmGrad.addColorStop(0, `rgba(${r},${g},${b},0.4)`);
            atmGrad.addColorStop(1, 'transparent');
            destCtx.fillStyle = atmGrad;
            destCtx.beginPath();
            destCtx.arc(cx, cy, size + 15, 0, Math.PI * 2);
            destCtx.fill();
        }

        const bodyGrad = destCtx.createRadialGradient(cx - size*0.3, cy - size*0.3, 0, cx, cy, size);
        bodyGrad.addColorStop(0, color);
        bodyGrad.addColorStop(1, '#111111');
        
        destCtx.fillStyle = bodyGrad;
        destCtx.beginPath();
        if (dest.cat === 'asteroids') {
            // Forma irregular para asteroides rocosos
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const dist = size * (0.8 + Math.cos(i * 3) * 0.15 + Math.sin(i * 5) * 0.05);
                if (i===0) destCtx.moveTo(cx + Math.cos(angle)*dist, cy + Math.sin(angle)*dist);
                else destCtx.lineTo(cx + Math.cos(angle)*dist, cy + Math.sin(angle)*dist);
            }
        } else {
            // Esférico perfecto para planetas
            destCtx.arc(cx, cy, size, 0, Math.PI * 2);
        }
        destCtx.fill();
    }

    // ── Init ───────────────────────────────────────────────────────────
    buildNavPanel();

})();
