/* grafo-viewer.js — Grafo completo: inspección + fondo estrellado mejorado */

(function () {
  const canvas = document.getElementById('grafo-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const data = JSON.parse(document.getElementById('grafo-data').textContent);

  const COLORES_TIPO = {
    'Estrella': '#facc15',
    'Planeta': '#3b82f6',
    'Exoplaneta': '#22c55e',
    'Galaxia': '#a855f7',
    'Satélite': '#94a3b8',
    'Satelite': '#94a3b8',
    'Constelación': '#38bdf8',
    'Constelacion': '#38bdf8',
    'default': '#94a3b8'
  };

  let nodos = {};
  let offset = { x: 0, y: 0 };
  let scale = 1;

  let dragging = false;
  let lastMouse = null;
  let hoveredId = null;
  let highlightedNames = [];

  let estrellas = [];
  let fugaces = [];
  let tick = 0;

  function ajustarTamanio() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 900;
    canvas.height = rect.height || 560;
  }

  function crearEstrellas() {
    estrellas = [];

    for (let i = 0; i < 280; i++) {
      estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        base: Math.random() * 1.15 + 0.2,
        brillo: Math.random() * 0.6 + 0.25,
        profundidad: Math.random() * 0.9 + 0.15,
        fase: Math.random() * Math.PI * 2
      });
    }
  }

  function inicializar() {
    const W = canvas.width;
    const H = canvas.height;

    data.nodos.forEach(n => {
      nodos[n.id] = {
        ...n,
        x: 80 + Math.random() * Math.max(W - 160, 100),
        y: 80 + Math.random() * Math.max(H - 160, 100),
        vx: 0,
        vy: 0
      };
    });
  }

  function simularPaso() {
    const ids = Object.keys(nodos);

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = nodos[ids[i]];
        const b = nodos[ids[j]];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const fuerza = 2800 / (dist * dist);
        const fx = (dx / dist) * fuerza;
        const fy = (dy / dist) * fuerza;

        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
      }
    }

    data.aristas.forEach(a => {
      const o = nodos[a.origen];
      const d = nodos[a.destino];
      if (!o || !d) return;

      const dx = d.x - o.x;
      const dy = d.y - o.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      const fuerza = (dist - 145) * 0.022;
      const fx = (dx / dist) * fuerza;
      const fy = (dy / dist) * fuerza;

      o.vx += fx;
      o.vy += fy;
      d.vx -= fx;
      d.vy -= fy;
    });

    const W = canvas.width;
    const H = canvas.height;

    ids.forEach(id => {
      const n = nodos[id];

      n.vx += (W / 2 - n.x) * 0.00045;
      n.vy += (H / 2 - n.y) * 0.00045;

      n.vx *= 0.84;
      n.vy *= 0.84;

      n.x += n.vx;
      n.y += n.vy;
    });
  }

  function dibujarFondo() {
    const W = canvas.width;
    const H = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#060b18');
    grad.addColorStop(0.35, '#0b1022');
    grad.addColorStop(0.7, '#07142a');
    grad.addColorStop(1, '#020617');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const nebulaMorada = ctx.createRadialGradient(
      W * 0.25, H * 0.45, 20,
      W * 0.25, H * 0.45, W * 0.45
    );
    nebulaMorada.addColorStop(0, 'rgba(88, 28, 135, 0.35)');
    nebulaMorada.addColorStop(0.35, 'rgba(88, 28, 135, 0.16)');
    nebulaMorada.addColorStop(1, 'rgba(88, 28, 135, 0)');

    ctx.fillStyle = nebulaMorada;
    ctx.fillRect(0, 0, W, H);

    const nebulaAzul = ctx.createRadialGradient(
      W * 0.72, H * 0.55, 20,
      W * 0.72, H * 0.55, W * 0.55
    );
    nebulaAzul.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
    nebulaAzul.addColorStop(0.45, 'rgba(14, 165, 233, 0.10)');
    nebulaAzul.addColorStop(1, 'rgba(37, 99, 235, 0)');

    ctx.fillStyle = nebulaAzul;
    ctx.fillRect(0, 0, W, H);

    const oscurecer = ctx.createRadialGradient(
      W / 2, H / 2, W * 0.2,
      W / 2, H / 2, W * 0.8
    );
    oscurecer.addColorStop(0, 'rgba(0,0,0,0)');
    oscurecer.addColorStop(1, 'rgba(0,0,0,0.45)');

    ctx.fillStyle = oscurecer;
    ctx.fillRect(0, 0, W, H);
  }

  function dibujarEstrellas(t) {
    estrellas.forEach(s => {
      const px = offset.x * s.profundidad * 0.018;
      const py = offset.y * s.profundidad * 0.018;

      const x = ((s.x + px) % canvas.width + canvas.width) % canvas.width;
      const y = ((s.y + py) % canvas.height + canvas.height) % canvas.height;

      const radio = s.base * Math.max(0.45, Math.min(2.7, scale));
      const pulso = 0.72 + Math.sin(t * 0.0014 + s.fase) * 0.28;

      ctx.beginPath();
      ctx.arc(x, y, radio * pulso, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.brillo * pulso})`;
      ctx.fill();
    });
  }

  function crearFugaz(x, y) {
    if (fugaces.length >= 4) return;

    fugaces.push({
      x,
      y,
      vx: -7 - Math.random() * 3,
      vy: 2 + Math.random() * 1.5,
      vida: 1,
      largo: 60 + Math.random() * 50
    });
  }

  function dibujarFugaces() {
    fugaces.forEach(f => {
      const colaX = f.x - f.vx * f.largo * 0.08;
      const colaY = f.y - f.vy * f.largo * 0.08;

      const grad = ctx.createLinearGradient(f.x, f.y, colaX, colaY);
      grad.addColorStop(0, `rgba(255,255,255,${f.vida})`);
      grad.addColorStop(0.45, `rgba(96,165,250,${f.vida * 0.65})`);
      grad.addColorStop(1, 'rgba(96,165,250,0)');

      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(colaX, colaY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      f.x += f.vx;
      f.y += f.vy;
      f.vida -= 0.035;
    });

    fugaces = fugaces.filter(f => f.vida > 0);
  }

  function aristaResaltada(a) {
    if (!highlightedNames || highlightedNames.length < 2) return false;

    const o = nodos[a.origen];
    const d = nodos[a.destino];
    if (!o || !d) return false;

    for (let i = 0; i < highlightedNames.length - 1; i++) {
      const actual = highlightedNames[i];
      const siguiente = highlightedNames[i + 1];

      if (
        (o.nombre === actual && d.nombre === siguiente) ||
        (o.nombre === siguiente && d.nombre === actual)
      ) {
        return true;
      }
    }

    return false;
  }

  function dibujarGrafo() {
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    data.aristas.forEach(a => {
      const o = nodos[a.origen];
      const d = nodos[a.destino];
      if (!o || !d) return;

      const activa = aristaResaltada(a);

      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      ctx.lineTo(d.x, d.y);

      ctx.strokeStyle = activa
        ? 'rgba(250,204,21,0.95)'
        : scale < 0.25
          ? 'rgba(148,163,184,0.10)'
          : 'rgba(148,163,184,0.30)';

      ctx.lineWidth = activa ? 2.6 / scale : 1 / scale;

      if (activa) {
        ctx.shadowColor = 'rgba(250,204,21,.8)';
        ctx.shadowBlur = 12;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    Object.values(nodos).forEach(n => {
      const color = COLORES_TIPO[n.tipo] || COLORES_TIPO.default;
      const hover = hoveredId === n.id;
      const resaltado = highlightedNames.includes(n.nombre);

      const radio = hover ? 10 : resaltado ? 9 : 6;

      const glow = ctx.createRadialGradient(n.x, n.y, 1, n.x, n.y, radio * 2.5);
      glow.addColorStop(0, color);
      glow.addColorStop(0.35, color + '99');
      glow.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(n.x, n.y, radio * 2.3 / scale, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, radio / scale, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.strokeStyle = hover || resaltado ? '#fff' : 'rgba(255,255,255,.75)';
      ctx.lineWidth = (hover || resaltado ? 2 : 1) / scale;
      ctx.stroke();

      if (scale > 0.32 || hover || resaltado) {
        ctx.fillStyle = hover || resaltado ? '#fff' : '#e5e7eb';
        ctx.font = `${hover ? 13 / scale : 11 / scale}px Segoe UI, Arial, sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,.95)';
        ctx.shadowBlur = 5;
        ctx.fillText(n.nombre, n.x + 10 / scale, n.y + 4 / scale);
        ctx.shadowBlur = 0;
      }
    });

    ctx.restore();
  }

  function dibujarTooltip() {
    if (!hoveredId) return;

    const n = nodos[hoveredId];
    if (!n) return;

    const x = n.x * scale + offset.x;
    const y = n.y * scale + offset.y;

    ctx.font = '13px Segoe UI, Arial';

    const texto1 = n.nombre;
    const texto2 = n.tipo || 'Objeto astronómico';
    const ancho = Math.max(ctx.measureText(texto1).width, ctx.measureText(texto2).width) + 28;

    ctx.fillStyle = 'rgba(2,6,23,.9)';
    ctx.strokeStyle = 'rgba(250,204,21,.55)';
    ctx.lineWidth = 1;

    roundRect(ctx, x + 16, y - 48, ancho, 48, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.fillText(texto1, x + 30, y - 28);

    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(texto2, x + 30, y - 10);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function dibujar(tiempo) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarFondo();
    dibujarEstrellas(tiempo);
    dibujarFugaces();
    dibujarGrafo();
    dibujarTooltip();
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    if (Math.random() < 0.012) {
      crearFugaz(screenX, screenY);
    }

    const mx = (screenX - offset.x) / scale;
    const my = (screenY - offset.y) / scale;

    if (dragging && lastMouse) {
      offset.x += e.clientX - lastMouse.x;
      offset.y += e.clientY - lastMouse.y;
      lastMouse = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      return;
    }

    hoveredId = null;

    Object.values(nodos).forEach(n => {
      const dx = n.x - mx;
      const dy = n.y - my;

      if (Math.sqrt(dx * dx + dy * dy) < 13 / scale) {
        hoveredId = n.id;
      }
    });

    canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
  });

  canvas.addEventListener('click', () => {
    if (hoveredId) {
      window.location.href = `/Objetos/Detalle/${hoveredId}`;
    }
  });

  canvas.addEventListener('mousedown', e => {
    dragging = true;
    lastMouse = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('mouseup', () => {
    dragging = false;
    lastMouse = null;
    canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
  });

  canvas.addEventListener('mouseleave', () => {
    dragging = false;
    lastMouse = null;
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - offset.x) / scale;
    const worldY = (mouseY - offset.y) / scale;

    const factor = e.deltaY < 0 ? 1.10 : 0.84;
    const newScale = Math.max(0.08, Math.min(5, scale * factor));

    scale = newScale;

    offset.x = mouseX - worldX * scale;
    offset.y = mouseY - worldY * scale;

  }, { passive: false });

  window.addEventListener('resize', () => {
    ajustarTamanio();
    crearEstrellas();
  });

  window.resaltarRutaGrafo = function (ruta) {
    highlightedNames = Array.isArray(ruta) ? ruta : [];
  };

  function loop(tiempo) {
    if (tick < 180) {
      simularPaso();
      tick++;
    }

    dibujar(tiempo);
    requestAnimationFrame(loop);
  }

  ajustarTamanio();
  crearEstrellas();
  inicializar();
  loop(0);
})();