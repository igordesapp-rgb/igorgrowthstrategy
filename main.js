(() => {
  const C = window.STOX_CONTENT || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Selo de verificado ---------- */
  const BADGE = `<svg viewBox="-1 -1 26 26" aria-label="Verificado" role="img"><path fill="#0095f6" d="M12 1.8A4.4 4.4 0 0 1 19.21 4.79A4.4 4.4 0 0 1 22.2 12A4.4 4.4 0 0 1 19.21 19.21A4.4 4.4 0 0 1 12 22.2A4.4 4.4 0 0 1 4.79 19.21A4.4 4.4 0 0 1 1.8 12A4.4 4.4 0 0 1 4.79 4.79A4.4 4.4 0 0 1 12 1.8Z"/><path d="M7.7 12.4l2.8 2.8 5.8-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const badge = (cls = '') => `<span class="vbadge ${cls}">${BADGE}</span>`;
  $$('[data-badge]').forEach((el) => (el.innerHTML = BADGE));

  /* ---------- Byline: Igor "escrevendo" em cada slide ---------- */
  $$('[data-byline]').forEach((el) => {
    const lg = el.dataset.size === 'lg';
    const meta = el.dataset.meta || '@oigorsop';
    el.outerHTML = `
      <div class="byline${lg ? ' byline--lg' : ''}">
        <img class="byline__avatar" src="assets/igor.webp" alt="Igor Souza" width="56" height="56" />
        <div class="byline__text">
          <span class="byline__name">Igor Souza ${badge()}</span>
          <span class="byline__meta" data-meta="${esc(meta)}">${meta === '@oigorsop' ? '@oigorsop' : `@oigorsop<span class="dot"></span>${esc(meta)}`}</span>
        </div>
      </div>`;
  });

  /* ---------- Ícones ---------- */
  const I = {
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    comment: '<svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/></svg>',
    save: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="#fff" stroke="none"/></svg>',
    zoom: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>',
    pin: '<svg class="ig__pin" viewBox="0 0 24 24"><path d="M15 3l6 6-3 1-3 3 .5 5L13 20l-4-4-5 5-1-1 5-5-4-4 2-2.5 5 .5 3-3z"/></svg>',
  };

  const postHead = (sub) => `
    <div class="post__head">
      <span class="sr-avatar" aria-hidden="true"></span>
      <div><b>stoxradar</b> ${badge('vbadge--sm')}<br /><small>${esc(sub)}</small></div>
      <span class="post__more">•••</span>
    </div>`;

  const placeholder = (label, extra = '') => `
    <div class="ph">
      <div class="ph__lines"><i></i><i></i><i></i></div>
      <div class="ph__foot"><span class="mono">${esc(label)}</span>${extra}</div>
    </div>`;

  /* ---------- Renderizadores das linhas editoriais ---------- */
  function renderCarousel(cfg, sub) {
    const imgs = cfg.slides || [];
    const total = Math.max(cfg.slideSlots || imgs.length, imgs.length, 1);
    const slides = Array.from({ length: total }, (_, i) =>
      imgs[i]
        ? `<div class="carousel__slide"><img src="${esc(imgs[i])}" alt="Slide ${i + 1} do carrossel" loading="lazy" /></div>`
        : `<div class="carousel__slide">${placeholder(`Slide ${String(i + 1).padStart(2, '0')}`)}</div>`
    ).join('');
    const ghost = (k) => `<div class="ghost ghost--${k}" data-offset="${k}" aria-hidden="true"><img alt="" ${imgs[k] ? `src="${esc(imgs[k])}"` : ''} /></div>`;
    return `
      <div class="post-stage" data-slides='${esc(JSON.stringify(imgs))}'>
        <div class="post-wrap">
          ${total > 2 ? ghost(2) : ''}${total > 1 ? ghost(1) : ''}
          <div class="post">
            ${postHead(sub)}
            <div class="carousel" data-carousel>
              <div class="carousel__track" tabindex="0" aria-label="Carrossel de amostra">${slides}</div>
              <span class="carousel__count">1/${total}</span>
              <button type="button" class="zoom-btn" data-zoom="carousel" aria-label="Ampliar o carrossel para ler melhor">${I.zoom}<span>Ampliar</span></button>
            </div>
            <div class="post__actions">${I.heart}${I.comment}${I.share}<div class="dots">${'<i></i>'.repeat(total)}</div><span class="save">${I.save}</span></div>
            <p class="post__caption"><b>stoxradar</b>Arraste para o lado e acompanhe a história até o fim. <span class="more">… mais</span></p>
          </div>
        </div>
        ${total > 1 ? `<div class="carousel-controls">
          <button class="carousel__nav carousel__nav--prev" aria-label="Slide anterior" disabled>‹</button>
          <button class="swipe-hint" type="button" aria-label="Ver o próximo slide do carrossel">
            <span class="swipe-hint__hand" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.6-2.2L4 15.2a1.6 1.6 0 0 1 2.4-2.1L9 15"/></svg>
            </span>
            <span class="swipe-hint__text"><span class="t-desk">Clique na seta para ver o próximo</span><span class="t-touch">Deslize para o lado</span> · <b data-swipe-count>1 de ${total}</b></span>
          </button>
          <button class="carousel__nav carousel__nav--next" aria-label="Próximo slide">›</button>
        </div>` : ''}
      </div>`;
  }

  function renderPost(cfg, sub) {
    const media = cfg.image
      ? `<img src="${esc(cfg.image)}" alt="Exemplo de post da linha Newswire" loading="lazy" />`
      : placeholder('Capa');
    return `
      <div class="post">
        ${postHead(sub)}
        <div class="post__media">${media}${cfg.image ? `<button type="button" class="zoom-btn" data-zoom-src="${esc(cfg.image)}" aria-label="Ampliar o post para ler melhor">${I.zoom}<span>Ampliar</span></button>` : ''}</div>
        <div class="post__actions">${I.heart}${I.comment}${I.share}<span class="save">${I.save}</span></div>
        <p class="post__caption post__caption--long"><b>stoxradar</b>${esc(cfg.caption || '')}</p>
      </div>`;
  }

  function renderReels(cfg) {
    // Só a capa, em destaque. O botão abre o vídeo do YouTube (ou a capa) no popup.
    const cover = cfg.cover ? `<img class="reels__cover" src="${esc(cfg.cover)}" alt="Capa do Reels Inside Story" loading="lazy" />` : placeholder('Capa');
    const btn = cfg.youtubeId
      ? `<button type="button" class="zoom-btn zoom-btn--play" data-zoom="reels" data-youtube="${esc(cfg.youtubeId)}" aria-label="Assistir ao vídeo">${I.play}<span>Assistir</span></button>`
      : `<button type="button" class="zoom-btn" data-zoom="reels" data-cover="${esc(cfg.cover || '')}" aria-label="Ampliar a capa do Reels">${I.zoom}<span>Ampliar</span></button>`;
    return `<div class="reels reels--cover">${cover}${btn}</div>`;
  }

  const SUBS = { rippleEffect: 'The Ripple Effect', marketBrief: 'Market Brief', newswire: 'Newswire', insideStory: 'Inside Story' };

  /* Capas da introdução das linhas */
  const COVERS = {
    rippleEffect: (C.rippleEffect?.slides || [])[0],
    marketBrief: (C.marketBrief?.slides || [])[0],
    newswire: C.newswire?.image,
    insideStory: C.insideStory?.cover,
  };
  $$('[data-cover]').forEach((img) => {
    const src = COVERS[img.dataset.cover];
    if (src) img.src = src; else img.remove();
  });

  $$('[data-media]').forEach((el) => {
    const key = el.dataset.media;
    const cfg = C[key] || {};
    if (cfg.format === 'carousel') el.innerHTML = renderCarousel(cfg, SUBS[key]);
    else if (cfg.format === 'reels') el.innerHTML = renderReels(cfg);
    else el.innerHTML = renderPost(cfg, SUBS[key]);
    // selo de autoria preso na peça
    const frame = $('.post-wrap, .post, .reels', el);
    if (frame) frame.insertAdjacentHTML('beforeend', `<span class="made-by"><img src="assets/igor.webp" alt="" width="28" height="28" /><span><b>Criado por Igor Souza</b>${cfg.format === 'reels' ? 'roteiro, key visual e edição' : 'pesquisa, roteiro e key visual'}</span></span>`);
  });

  /* ---------- Conteúdo programado ---------- */
  $$('[data-upcoming]').forEach((el) => {
    const key = el.dataset.upcoming;
    const cfg = C[key] || {};
    const items = cfg.upcoming || [];
    const slots = Math.max(cfg.upcomingSlots || 0, items.length);
    const isReels = cfg.format === 'reels';
    const thumbs = Array.from({ length: slots }, (_, i) =>
      items[i]
        ? `<button type="button" class="thumb thumb--open${isReels ? ' thumb--reels' : ''}" data-lightbox="${esc(items[i])}" aria-label="Ver capa ${i + 1} de ${esc(SUBS[key] || '')}"><img src="${esc(items[i])}" alt="" loading="lazy" /><span class="thumb__zoom" aria-hidden="true">${I.zoom}</span></button>`
        : `<div class="thumb${isReels ? ' thumb--reels' : ''}">${placeholder(String(i + 1).padStart(2, '0'), `<span class="thumb__lock">${I.lock}</span>`)}</div>`
    ).join('');
    el.innerHTML = `
      <div class="upcoming__head">
        <span class="upcoming__title"><span class="live"></span>Outros posts similares</span>
        <span class="upcoming__sub">Veja como seriam outros posts desta linha. Clique na capa para ampliar.</span>
      </div>
      <div class="upcoming__row">${thumbs}</div>`;
  });

  /* ---------- Galeria de referências (marcas com muitas views) ---------- */
  const refsEl = $('[data-references]');
  if (refsEl) {
    const R = C.references || {};
    const items = R.items || [];
    const slots = Math.max(R.slots || 0, items.length);
    refsEl.innerHTML = Array.from({ length: slots }, (_, i) => {
      const it = items[i];
      if (!it) {
        return `<div class="ref ref--empty"><div class="ref__media">${placeholder(`Referência ${String(i + 1).padStart(2, '0')}`)}</div><div class="ref__info"><b>Marca</b><span>@perfil</span></div></div>`;
      }
      const media = it.image
        ? `<button type="button" class="ref__media" data-lightbox="${esc(it.image)}" aria-label="Ampliar referência de ${esc(it.brand || '')}"><img src="${esc(it.image)}" alt="" loading="lazy" />${it.views ? `<span class="ref__views">${I.eye}${esc(it.views)}</span>` : ''}</button>`
        : `<div class="ref__media">${placeholder('Imagem')}</div>`;
      return `<div class="ref">${media}<div class="ref__info"><b>${esc(it.brand || '')}</b><span>${esc(it.handle || '')}</span></div></div>`;
    }).join('');
  }

  /* ---------- Circuito: trilhas ligando cada habilidade ao Igor ---------- */
  const circuit = $('.circuit');
  if (circuit) {
    const svg = $('.circuit__svg', circuit);
    const photo = $('.circuit__photo', circuit);
    const aiChip = $('.circuit__ai-chip', circuit);
    const skills = $$('.skill', circuit);
    const NS = 'http://www.w3.org/2000/svg';
    const add = (tag, attrs, extra = {}) => {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      Object.entries(extra).forEach(([k, v]) => el.style.setProperty(k, v));
      svg.appendChild(el);
      return el;
    };
    const draw = () => {
      const box = circuit.getBoundingClientRect();
      if (!box.width) return;
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.innerHTML = '';
      const rel = (r) => ({ l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cy: r.top - box.top + r.height / 2, cx: r.left - box.left + r.width / 2 });
      const P = rel(photo.getBoundingClientRect());
      const A = aiChip ? rel(aiChip.getBoundingClientRect()) : null;
      const xEnd = rel(skills[0].getBoundingClientRect()).l; // chegada: lado esquerdo das habilidades
      const r = 10;
      const route = (x0, y0, bus, y) => {
        const dy = y - y0;
        const s = Math.sign(dy) || 1;
        const rr = Math.min(r, Math.abs(dy) / 2);
        return Math.abs(dy) < 1
          // o caminho começa no card do Igor e termina na habilidade: a luz sai de você e vai para as skills
          ? `M ${x0} ${y0} H ${xEnd}`
          : `M ${x0} ${y0} H ${bus - rr} Q ${bus} ${y0} ${bus} ${y0 + s * rr} V ${y - s * rr} Q ${bus} ${y} ${bus + rr} ${y} H ${xEnd}`;
      };
      skills.forEach((sk, k) => {
        const fromAi = sk.dataset.src === 'ai' && A;
        const x0 = fromAi ? A.r : P.r;
        const y0 = fromAi ? A.cy : P.cy;
        const bus = x0 + (xEnd - x0) * (fromAi ? 0.62 : 0.4);
        const d = route(x0, y0, bus, rel(sk.getBoundingClientRect()).cy);
        add('path', { d, class: 'circuit__trace' + (fromAi ? ' circuit__trace--ai' : ''), pathLength: 100 }, { '--d': k });
        add('path', { d, class: 'circuit__flow' + (fromAi ? ' circuit__flow--ai' : ''), pathLength: 100 }, { '--d': k });
        add('circle', { cx: xEnd, cy: rel(sk.getBoundingClientRect()).cy, r: 3, class: 'circuit__pin' + (fromAi ? ' circuit__pin--ai' : '') });
      });
      // comando: Igor → IA (linha vertical tracejada, mostra quem direciona)
      if (A) {
        const d = `M ${P.cx} ${P.b + 2} V ${A.t - 2}`;
        add('path', { d, class: 'circuit__cmd', pathLength: 100 });
        add('path', { d, class: 'circuit__flow circuit__flow--cmd', pathLength: 100 }, { '--d': 0 });
        add('circle', { cx: A.r, cy: A.cy, r: 4, class: 'circuit__pin circuit__pin--aihub' });
      }
      add('circle', { cx: P.r, cy: P.cy, r: 4, class: 'circuit__pin circuit__pin--hub' });
    };
    draw();
    if ('ResizeObserver' in window) new ResizeObserver(draw).observe(circuit);
    window.addEventListener('load', draw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    // redesenha quando as habilidades terminam de entrar (elas chegam deslizando)
    const circuitSlide = circuit.closest('.slide');
    if (circuitSlide && 'MutationObserver' in window) {
      new MutationObserver(() => { if (circuitSlide.classList.contains('is-in')) setTimeout(draw, 1000); })
        .observe(circuitSlide, { attributes: true, attributeFilter: ['class'] });
    }
  }

  /* ---------- Carrosséis ---------- */
  $$('[data-carousel]').forEach((car) => {
    const track = $('.carousel__track', car);
    const stage = car.closest('.post-stage') || car;
    const prev = $('.carousel__nav--prev', stage);
    const next = $('.carousel__nav--next', stage);
    const count = $('.carousel__count', car);
    const dots = $$('.dots i', car.parentElement);
    const hint = $('.swipe-hint', stage);
    let slideImgs = [];
    try { slideImgs = JSON.parse(stage.dataset.slides || '[]'); } catch (e) { slideImgs = []; }
    const ghosts = $$('.ghost', stage);
    const hintCount = hint && $('[data-swipe-count]', hint);
    const n = track.children.length;
    const idx = () => Math.round(track.scrollLeft / track.clientWidth);
    const update = () => {
      const i = idx();
      count.textContent = `${i + 1}/${n}`;
      prev.disabled = i <= 0;
      next.disabled = i >= n - 1;
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      if (hintCount) hintCount.textContent = `${i + 1} de ${n}`;
      if (i > 0) stage.classList.add('was-swiped');
      ghosts.forEach((g) => {
        const src = slideImgs[i + Number(g.dataset.offset)];
        const img = g.querySelector('img');
        if (src) { if (img.getAttribute('src') !== src) img.src = src; g.classList.remove('is-empty'); }
        else g.classList.add('is-empty');
      });
    };
    const go = (d) => {
      const target = (idx() + d + n) % n; // no último slide, volta ao primeiro
      track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' });
    };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    if (hint) hint.addEventListener('click', () => go(1));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();

    // "Empurrãozinho": quando o slide aparece, o carrossel mostra que dá para deslizar
    if (n > 1 && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const nudge = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || idx() !== 0) return;
          nudge.disconnect();
          setTimeout(() => {
            track.style.scrollSnapType = 'none';
            track.scrollTo({ left: track.clientWidth * 0.22, behavior: 'smooth' });
            setTimeout(() => {
              track.scrollTo({ left: 0, behavior: 'smooth' });
              setTimeout(() => { track.style.scrollSnapType = ''; }, 500);
            }, 650);
          }, 900);
        });
      }, { threshold: 0.6 });
      nudge.observe(car);
    }
  });

  /* ---------- Grade do perfil (slide 11) ---------- */
  const grid = $('#ig-grid');
  if (grid) {
    const pool = [
      ...(C.rippleEffect?.slides || []).slice(0, 1),
      ...(C.marketBrief?.slides || []).slice(0, 1),
      C.newswire?.image,
      C.insideStory?.cover,
      ...(C.rippleEffect?.upcoming || []),
      ...(C.marketBrief?.upcoming || []),
      ...(C.newswire?.upcoming || []),
      ...(C.insideStory?.upcoming || []),
    ].filter(Boolean);
    let cells = `<div class="ig__cell ig__cell--pin">${I.pin}<span>FIXADO</span><b>Por que assinar a newsletter da StoxRadar</b></div>`;
    for (let i = 0; i < 8; i++) {
      const src = pool.length ? pool[i % pool.length] : '';
      cells += src ? `<div class="ig__cell"><img src="${esc(src)}" alt="" loading="lazy" /></div>` : `<div class="ig__cell"></div>`;
    }
    grid.innerHTML = cells;
  }

  /* ---------- Navegação dos slides ---------- */
  const slides = $$('.slide');
  const total = slides.length;
  const nowEl = $('#count-now');
  const totEl = $('#count-total');
  const labelEl = $('#topbar-label');
  const bar = $('#progress-bar');
  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const pad = (n) => String(n).padStart(2, '0');
  totEl.textContent = pad(total);
  let current = 0;

  /* ---------- Menu lateral (índice da apresentação) ---------- */
  const NAV = {
    capa: 'Início', papel: 'Papel do Instagram', interesse: 'Interesse do público', trabalho: 'Meu trabalho',
    linhas: 'Linhas editoriais', algoritmo: 'Por que prende a atenção', ripple: 'The Ripple Effect', brief: 'Market Brief',
    newswire: 'Newswire', inside: 'Inside Story', frequencia: 'Frequência', referencias: 'Referências', entrega: 'O que eu entrego', perfil: 'Funil e perfil',
    convite: 'Convite à newsletter', ampliar: 'Aprender e ampliar', metricas: 'Métricas', fim: 'Encerramento',
  };
  const SUBNAV = new Set(['ripple', 'brief', 'newswire', 'inside']);
  const sidenav = document.createElement('nav');
  sidenav.className = 'sidenav';
  sidenav.setAttribute('aria-label', 'Índice da apresentação');
  sidenav.innerHTML = '<ol>' + slides.map((s, k) =>
    `<li><a href="#${s.id}" data-k="${k}" class="${SUBNAV.has(s.id) ? 'is-sub' : ''}"><i aria-hidden="true"></i><span>${esc(NAV[s.id] || s.dataset.label || `Slide ${k + 1}`)}</span></a></li>`
  ).join('') + '</ol>';
  document.body.appendChild(sidenav);
  const navLinks = $$('a', sidenav);
  navLinks.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    slides[Number(a.dataset.k)].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  const setCurrent = (i) => {
    if (i === current && nowEl.textContent === pad(i + 1)) return;
    current = i;
    nowEl.textContent = pad(i + 1);
    labelEl.textContent = slides[i].dataset.label || '';
    navLinks.forEach((a, k) => { a.classList.toggle('is-on', k === i); if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    bar.style.width = `${((i + 1) / total) * 100}%`;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === total - 1;
  };

  /* Transição de cor ligada à rolagem: o fundo escurece aos poucos ao entrar nos slides escuros */
  const backdrop = $('.theme-backdrop');
  // Slides escuros seguidos viram um único bloco, para o fundo não clarear entre eles
  const solidSlides = slides.filter((s) => s.classList.contains('slide--solid'));
  const darkGroups = [];
  slides.forEach((s, k) => {
    if (!s.classList.contains('slide--dark') || s.classList.contains('slide--solid')) return;
    const last = darkGroups[darkGroups.length - 1];
    if (last && last.end === k - 1) { last.end = k; last.last = s; } else darkGroups.push({ start: k, end: k, first: s, last: s });
  });
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const updateTheme = () => {
    if (!backdrop) return;
    const vh = window.innerHeight;
    let t = 0;
    darkGroups.forEach((g) => {
      const top = g.first.getBoundingClientRect().top;
      const bottom = g.last.getBoundingClientRect().bottom;
      const enter = clamp01((vh * 0.85 - top) / (vh * 0.55));   // começa quando o topo do bloco escuro aparece
      const leave = clamp01((bottom - vh * 0.15) / (vh * 0.55)); // termina quando o bloco sai por cima
      t = Math.max(t, Math.min(enter, leave));
    });
    backdrop.style.opacity = t.toFixed(3);
    // slides pretos fixos (sem transição): o topo fica escuro quando um deles está atrás dele
    const solidUnderTop = solidSlides.some((s) => { const r = s.getBoundingClientRect(); return r.top <= 60 && r.bottom > 60; });
    document.documentElement.classList.toggle('theme-dark', t > 0.5 || solidUnderTop);
  };

  /* Slide 03: o processo acende etapa por etapa conforme a rolagem */
  const processEl = $('.process');
  const processSlide = processEl && processEl.closest('.slide');
  const processSteps = processEl ? $$('.process__step, .process__end', processEl) : [];
  const updateProcess = () => {
    if (!processEl) return;
    const vh = window.innerHeight;
    const top = processSlide.getBoundingClientRect().top;
    // 0 quando o slide começa a aparecer embaixo, 1 quando ele chega no topo da tela
    const p = clamp01((vh * 0.95 - top) / (vh * 0.85));
    processEl.style.setProperty('--p', p.toFixed(3));
    processSteps.forEach((el, k) => el.classList.toggle('is-lit', p >= (k + 0.6) / (processSteps.length + 0.4)));
  };

  const onScroll = () => {
    const line = window.innerHeight * 0.4;
    let i = 0;
    slides.forEach((s, k) => { if (s.getBoundingClientRect().top <= line) i = k; });
    setCurrent(i);
    updateTheme();
    updateProcess();
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  nowEl.textContent = '';
  onScroll();

  const goTo = (i) => {
    const t = Math.max(0, Math.min(total - 1, i));
    slides[t].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* ---------- Popup ampliado: capas, carrosséis, posts e vídeo ---------- */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Conteúdo ampliado');
  lb.hidden = true;
  lb.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Fechar">×</button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Slide anterior">‹</button>
    <figure class="lightbox__stage">
      <img class="lightbox__img" alt="Conteúdo ampliado" />
      <div class="lightbox__video" hidden></div>
      <figcaption class="lightbox__count"></figcaption>
    </figure>
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Próximo slide">›</button>`;
  document.body.appendChild(lb);
  const lbImg = $('.lightbox__img', lb);
  const lbVideo = $('.lightbox__video', lb);
  const lbCount = $('.lightbox__count', lb);
  const lbPrev = $('.lightbox__nav--prev', lb);
  const lbNext = $('.lightbox__nav--next', lb);
  let lbList = [];
  let lbIdx = 0;
  let lbReturn = null;
  let lbTrack = null; // carrossel de origem, para voltar no mesmo slide ao fechar

  const renderLb = () => {
    const src = lbList[lbIdx];
    lbImg.hidden = false;
    lbVideo.hidden = true;
    lbVideo.innerHTML = '';
    if (src) lbImg.src = src; else lbImg.removeAttribute('src');
    const many = lbList.length > 1;
    lbPrev.hidden = lbNext.hidden = !many;
    lbPrev.disabled = lbIdx <= 0;
    lbNext.disabled = lbIdx >= lbList.length - 1;
    lbCount.textContent = many ? `${lbIdx + 1} de ${lbList.length}` : '';
  };
  const openLb = (list, start, from, track) => {
    lbList = list.filter(Boolean);
    if (!lbList.length) return;
    lbIdx = Math.max(0, Math.min(lbList.length - 1, start || 0));
    lbReturn = from || null;
    lbTrack = track || null;
    renderLb();
    lb.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('is-open'));
    $('.lightbox__close', lb).focus();
  };
  const openVideo = (youtubeId, from) => {
    lbList = [];
    lbReturn = from || null;
    lbTrack = null;
    lbImg.hidden = true;
    lbPrev.hidden = lbNext.hidden = true;
    lbCount.textContent = '';
    lbVideo.hidden = false;
    lbVideo.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="Vídeo ampliado" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lb.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('is-open'));
    $('.lightbox__close', lb).focus();
  };
  const stepLb = (d) => {
    if (lbList.length < 2) return;
    lbIdx = Math.max(0, Math.min(lbList.length - 1, lbIdx + d));
    renderLb();
  };
  const closeLb = () => {
    lb.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    if (lbTrack) lbTrack.scrollTo({ left: lbIdx * lbTrack.clientWidth, behavior: 'auto' });
    setTimeout(() => { lb.hidden = true; lbImg.removeAttribute('src'); lbVideo.innerHTML = ''; }, 200);
    if (lbReturn) lbReturn.focus();
  };
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); stepLb(-1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); stepLb(1); });
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.closest('.lightbox__close')) closeLb();
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest && e.target.closest('[data-lightbox], [data-zoom], [data-zoom-src]');
    if (!el) return;
    if (el.dataset.lightbox) { openLb([el.dataset.lightbox], 0, el); return; }
    if (el.dataset.zoomSrc) { openLb([el.dataset.zoomSrc], 0, el); return; }
    if (el.dataset.zoom === 'carousel') {
      const stage = el.closest('.post-stage');
      const track = stage && $('.carousel__track', stage);
      let list = [];
      try { list = JSON.parse((stage && stage.dataset.slides) || '[]'); } catch (err) { list = []; }
      const start = track ? Math.round(track.scrollLeft / track.clientWidth) : 0;
      openLb(list, start, el, track);
      return;
    }
    if (el.dataset.zoom === 'reels') {
      if (el.dataset.youtube) openVideo(el.dataset.youtube, el);
      else openLb([el.dataset.cover], 0, el);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.hidden) { if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowRight') { e.preventDefault(); stepLb(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); stepLb(-1); } return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t.closest && (t.closest('input, textarea, select, iframe, [contenteditable]'))) return;
    const inCarousel = t.closest && t.closest('.carousel__track');
    const k = e.key;
    if ((k === 'ArrowLeft' || k === 'ArrowRight') && inCarousel) return;
    if (k === 'ArrowDown' || k === 'PageDown' || k === 'ArrowRight' || (k === ' ' && !e.shiftKey)) { e.preventDefault(); goTo(current + 1); }
    else if (k === 'ArrowUp' || k === 'PageUp' || k === 'ArrowLeft' || (k === ' ' && e.shiftKey)) { e.preventDefault(); goTo(current - 1); }
    else if (k === 'Home') { e.preventDefault(); goTo(0); }
    else if (k === 'End') { e.preventDefault(); goTo(total - 1); }
  });

  /* ---------- Revelação + "escrevendo…" ---------- */
  const typeIn = (slide) => {
    $$('.byline__meta', slide).forEach((m) => {
      if (m.dataset.done) return;
      m.dataset.done = '1';
      const final = m.innerHTML;
      m.innerHTML = 'escrevendo<span class="typing"><i></i><i></i><i></i></span>';
      setTimeout(() => { m.innerHTML = final; }, 1500);
    });
  };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          if (!reduce) typeIn(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    slides.forEach((s) => io.observe(s));
  } else {
    slides.forEach((s) => s.classList.add('is-in'));
  }
})();
