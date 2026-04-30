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
    'Asteroide': '#a07d35',
    'Cometa': '#7eb6cd',
    'Planeta Enano': '#cbd5e1',
    'Constelación': '#7eb6cd',
    'Constelacion': '#7eb6cd',
    'default': '#94a3b8'
  };

  // ID offset usado por GrafoService.cs para nodos de Constelación
  const CONSTELACION_OFFSET = 1_000_000;
  const esConstelacion = (id) => id >= CONSTELACION_OFFSET;

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
      const isConst = esConstelacion(n.id);

      // Constelaciones: nodos hub más grandes, con anillo dorado
      let radio;
      if (isConst) {
        radio = hover ? 16 : resaltado ? 14 : 12;
      } else {
        radio = hover ? 10 : resaltado ? 9 : 6;
      }

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

      // Anillo dorado decorativo solo en constelaciones
      if (isConst) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, (radio + 4) / scale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212,166,87,0.85)';
        ctx.lineWidth = 1.4 / scale;
        ctx.stroke();

        // Cruz interior tipo retícula
        ctx.beginPath();
        ctx.moveTo(n.x - radio * 0.5 / scale, n.y);
        ctx.lineTo(n.x + radio * 0.5 / scale, n.y);
        ctx.moveTo(n.x, n.y - radio * 0.5 / scale);
        ctx.lineTo(n.x, n.y + radio * 0.5 / scale);
        ctx.strokeStyle = 'rgba(6,8,18,0.9)';
        ctx.lineWidth = 1.2 / scale;
        ctx.stroke();
      }

      ctx.strokeStyle = hover || resaltado ? '#fff' : 'rgba(255,255,255,.75)';
      ctx.lineWidth = (hover || resaltado ? 2 : 1) / scale;
      ctx.beginPath();
      ctx.arc(n.x, n.y, radio / scale, 0, Math.PI * 2);
      ctx.stroke();

      // Constelaciones siempre muestran su nombre
      if (scale > 0.32 || hover || resaltado || isConst) {
        ctx.fillStyle = hover || resaltado ? '#fff' : (isConst ? '#f3c87c' : '#e5e7eb');
        const fontSize = isConst ? (hover ? 14 : 12) : (hover ? 13 : 11);
        const weight = isConst ? '600' : '400';
        ctx.font = `${weight} ${fontSize / scale}px 'JetBrains Mono', monospace`;
        ctx.shadowColor = 'rgba(0,0,0,.95)';
        ctx.shadowBlur = 5;
        const labelX = n.x + (radio + 6) / scale;
        ctx.fillText(n.nombre, labelX, n.y + 4 / scale);
        ctx.shadowBlur = 0;
      }
    });

    ctx.restore();
  }

  function envolverTexto(ctx, texto, maxAncho) {
    const palabras = texto.split(' ');
    const lineas = [];
    let actual = '';
    palabras.forEach(p => {
      const test = actual ? actual + ' ' + p : p;
      if (ctx.measureText(test).width > maxAncho && actual) {
        lineas.push(actual);
        actual = p;
      } else {
        actual = test;
      }
    });
    if (actual) lineas.push(actual);
    return lineas;
  }

  function dibujarTooltip() {
    if (!hoveredId) return;

    const n = nodos[hoveredId];
    if (!n) return;

    const isConst = esConstelacion(n.id);
    const x = n.x * scale + offset.x;
    const y = n.y * scale + offset.y;

    if (isConst) {
      // Tooltip extendido con descripción
      const maxAncho = 280;
      ctx.font = "13px 'JetBrains Mono', Segoe UI, Arial";

      const titulo = n.nombre.toUpperCase();
      const subtitulo = n.abreviatura ? `Constelación · ${n.abreviatura}` : 'Constelación';
      const desc = n.descripcion || 'Sin descripción registrada.';

      ctx.font = "11px 'JetBrains Mono', Segoe UI, Arial";
      const lineasDesc = envolverTexto(ctx, desc, maxAncho - 24).slice(0, 4);

      const altoTitulo = 24;
      const altoSub = 18;
      const altoDesc = lineasDesc.length * 16 + 10;
      const altoTotal = altoTitulo + altoSub + altoDesc + 18;

      // Box
      ctx.fillStyle = 'rgba(6,8,18,.94)';
      ctx.strokeStyle = 'rgba(212,166,87,.7)';
      ctx.lineWidth = 1;
      roundRect(ctx, x + 18, y - altoTotal - 8, maxAncho, altoTotal, 4);
      ctx.fill();
      ctx.stroke();

      // Barra dorada izquierda
      ctx.fillStyle = '#d4a657';
      ctx.fillRect(x + 18, y - altoTotal - 8, 3, altoTotal);

      // Título
      ctx.fillStyle = '#f3c87c';
      ctx.font = "600 13px 'JetBrains Mono', Segoe UI, Arial";
      ctx.fillText(titulo, x + 32, y - altoTotal + 10);

      // Subtítulo
      ctx.fillStyle = '#a39b85';
      ctx.font = "10px 'JetBrains Mono', Segoe UI, Arial";
      ctx.fillText(subtitulo, x + 32, y - altoTotal + 28);

      // Descripción
      ctx.fillStyle = '#d4cbb0';
      ctx.font = "italic 12px 'Cormorant Garamond', Georgia, serif";
      lineasDesc.forEach((linea, i) => {
        ctx.fillText(linea, x + 32, y - altoTotal + 50 + i * 16);
      });

      return;
    }

    // Tooltip normal (objeto)
    ctx.font = "13px 'JetBrains Mono', Segoe UI, Arial";
    const texto1 = n.nombre;
    const texto2 = n.tipo || 'Objeto astronómico';
    const ancho = Math.max(ctx.measureText(texto1).width, ctx.measureText(texto2).width) + 28;

    ctx.fillStyle = 'rgba(6,8,18,.92)';
    ctx.strokeStyle = 'rgba(212,166,87,.5)';
    ctx.lineWidth = 1;
    roundRect(ctx, x + 16, y - 50, ancho, 50, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#d4a657';
    ctx.fillRect(x + 16, y - 50, 3, 50);

    ctx.fillStyle = '#f3c87c';
    ctx.font = "600 13px 'JetBrains Mono', Segoe UI, Arial";
    ctx.fillText(texto1, x + 28, y - 30);

    ctx.fillStyle = '#a39b85';
    ctx.font = "10px 'JetBrains Mono', Segoe UI, Arial";
    ctx.fillText(texto2.toUpperCase(), x + 28, y - 12);
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

    canvas.style.cursor = hoveredId
      ? (esConstelacion(hoveredId) ? 'help' : 'pointer')
      : 'grab';
  });

  canvas.addEventListener('click', () => {
    if (!hoveredId) return;
    // Constelaciones: no navegar — el tooltip extendido ya muestra su info
    if (esConstelacion(hoveredId)) return;
    window.location.href = `/Objetos/Detalle/${hoveredId}`;
  });

  canvas.addEventListener('mousedown', e => {
    dragging = true;
    lastMouse = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('mouseup', () => {
    dragging = false;
    lastMouse = null;
    canvas.style.cursor = hoveredId
      ? (esConstelacion(hoveredId) ? 'help' : 'pointer')
      : 'grab';
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

  let simulacionLista = false;

  function loop(tiempo) {
    if (tick < 180) {
      simularPaso();
      tick++;
      if (tick === 180) simulacionLista = true;
    }

    dibujar(tiempo);
    requestAnimationFrame(loop);
  }

  // ── Destacar nodo desde querystring (?destacar=<nombre>&via=<constelacion>) ──
  function aplicarDestacarDesdeURL() {
    const params = new URLSearchParams(location.search);
    const destacar = params.get('destacar');
    if (!destacar) return;
    const via = params.get('via');

    function intentar() {
      if (!simulacionLista) {
        requestAnimationFrame(intentar);
        return;
      }

      const nodo = Object.values(nodos).find(n => n.nombre === destacar);
      if (!nodo) {
        const div = document.getElementById('resultado-ruta');
        if (div) div.innerHTML = `<span class="text-danger">Nodo "${destacar}" no encontrado en el grafo.</span>`;
        return;
      }

      // Centrar cámara en el nodo
      offset.x = canvas.width / 2 - nodo.x * scale;
      offset.y = canvas.height / 2 - nodo.y * scale;

      // Resaltar (reusa lógica de aristas)
      highlightedNames = via ? [destacar, via] : [destacar];

      // Mensaje en panel de ruta
      const div = document.getElementById('resultado-ruta');
      if (div) {
        div.innerHTML = via
          ? `<strong>Destacando:</strong> ${destacar} &nbsp;↔&nbsp; <strong>${via}</strong> <span style="opacity:.6">(constelación)</span>`
          : `<strong>Destacando:</strong> ${destacar}`;
      }
    }

    intentar();
  }

  ajustarTamanio();
  crearEstrellas();
  inicializar();
  loop(0);
  aplicarDestacarDesdeURL();
})();