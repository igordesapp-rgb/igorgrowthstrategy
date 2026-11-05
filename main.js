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
            <p class="post__caption"><b>stoxradar</b>Clique em Ampliar e acompanhe a história até o fim. <span class="more">… mais</span></p>
          </div>
        </div>
        <!-- sem barra de setas embaixo: a pessoa abre o carrossel pelo botão "Ampliar" -->
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
    // (o selo "Criado por Igor Souza" preso na peça foi removido a pedido)
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
        ? `<button type="button" class="ref__media" data-lightbox="${esc(it.image)}" aria-label="Ampliar referência ${String(i + 1).padStart(2, '0')}${it.brand ? ` de ${esc(it.brand)}` : ''}"><img src="${esc(it.image)}" alt="" loading="lazy" /></button>`
        : `<div class="ref__media">${placeholder('Imagem')}</div>`;
      // visualizações escritas embaixo do card (texto, para dar para traduzir)
      const views = it.views ? `<span class="ref__count">${I.eye}${esc(it.views)}</span>` : '';
      const who = [it.brand ? `<b>${esc(it.brand)}</b>` : '', it.handle ? `<span>${esc(it.handle)}</span>` : ''].join('');
      return `<div class="ref">${media}<div class="ref__info">${views}${who}</div></div>`;
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
      const route = (x0, y0, bus, y, x1 = xEnd) => {
        const dy = y - y0;
        const s = Math.sign(dy) || 1;
        const rr = Math.min(r, Math.abs(dy) / 2);
        return Math.abs(dy) < 1
          // o caminho começa no card do Igor e termina na habilidade: a luz sai de você e vai para as skills
          ? `M ${x0} ${y0} H ${x1}`
          : `M ${x0} ${y0} H ${bus - rr} Q ${bus} ${y0} ${bus} ${y0 + s * rr} V ${y - s * rr} Q ${bus} ${y} ${bus + rr} ${y} H ${x1}`;
      };
      // Versão v5: card do Igor → trilhas azuis com pontos → cada habilidade; linha tracejada até "IA como apoio"
      const card = $('.circuit__card', circuit);
      if (card) {
        const K = rel(card.getBoundingClientRect());
        const x0 = K.r;          // as trilhas saem da lateral do card, na altura do centro da foto
        const y0 = P.cy;
        // a linha vertical das trilhas fica sempre à direita da pílula "IA como apoio", sem encostar nela
        const aidBox = $('.circuit__aid', circuit);
        const aidR = aidBox ? rel(aidBox.getBoundingClientRect()).r : 0;
        const bus = Math.min(xEnd - 28, Math.max(x0 + (xEnd - x0) * 0.36, aidR + 18));
        skills.forEach((sk, k) => {
          const y = rel(sk.getBoundingClientRect()).cy;
          const d = route(x0, y0, bus, y);
          add('path', { d, class: 'circuit__trace', pathLength: 100 }, { '--d': k });
          add('path', { d, class: 'circuit__flow', pathLength: 100 }, { '--d': k });
          // pontinhos fixos no trecho final de cada trilha, como na referência
          add('circle', { cx: bus + (xEnd - bus) * 0.45, cy: y, r: 2.2, class: 'circuit__dot' });
          add('circle', { cx: xEnd, cy: y, r: 3.4, class: 'circuit__pin circuit__pin--skill' });
        });
        add('circle', { cx: x0 + (bus - x0) * 0.5, cy: y0, r: 2.2, class: 'circuit__dot' });
        add('circle', { cx: x0, cy: y0, r: 4, class: 'circuit__pin circuit__pin--hub' });
        // linha tracejada: desce do card e entra na pílula "IA como apoio"
        const aid = $('.circuit__aid', circuit);
        if (aid) {
          const Q = rel(aid.getBoundingClientRect());
          const xd = Math.min(K.l + 46, Q.l - 14);
          const rr = 8;
          const dc = `M ${xd} ${K.b} V ${Q.cy - rr} Q ${xd} ${Q.cy} ${xd + rr} ${Q.cy} H ${Q.l}`;
          add('path', { d: dc, class: 'circuit__cmd', pathLength: 100 });
          add('circle', { cx: Q.l, cy: Q.cy, r: 2.6, class: 'circuit__dot' });
        }
        return;
      }
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
    window.addEventListener('langchange', draw); // texto traduzido muda de tamanho: redesenha as trilhas
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
      if (prev) prev.disabled = i <= 0;
      if (next) next.disabled = i >= n - 1;
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
    if (prev) prev.addEventListener('click', () => go(-1));
    if (next) next.addEventListener('click', () => go(1));
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

  /* ---------- Slides "Topo de funil" e "Fundo de funil": colchete vermelho e ligações verdes ---------- */
  $$('.fn-grid').forEach((fnGrid) => {
    const svg = $('.fn-links', fnGrid);
    const NS = 'http://www.w3.org/2000/svg';
    const add = (tag, attrs) => {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      svg.appendChild(el);
      return el;
    };
    const drawFn = () => {
      const box = fnGrid.getBoundingClientRect();
      if (!box.width || getComputedStyle(svg).display === 'none') return;
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.innerHTML = '';
      const rel = (el) => { const r = el.getBoundingClientRect(); return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cx: r.left - box.left + r.width / 2, cy: r.top - box.top + r.height / 2 }; };
      // colchete "}" ligando Reels/Carrosséis à grade do 1º perfil
      const list = $('[data-fn-bracket]', fnGrid);
      const phone1 = $('[data-fn-phone="1"]', fnGrid);
      if (list && phone1) {
        const L = rel(list);
        const P = rel(phone1);
        const x = L.r + Math.min(34, (P.l - L.r) * 0.45);
        const t = L.t + 6, b = L.b - 6, m = (t + b) / 2, r = 10;
        add('path', { class: 'fn-bracket', pathLength: 100,
          d: `M ${x - r} ${t} Q ${x} ${t} ${x} ${t + r} V ${m - r} Q ${x} ${m} ${x + r} ${m} Q ${x} ${m} ${x} ${m + r} V ${b - r} Q ${x} ${b} ${x - r} ${b}` });
      }
      // linhas verdes: Link na bio → link da bio; Destaque → círculo "Newsletter"; Post fixado → 1º post do feed.
      // A lista segue a ordem do perfil (de cima para baixo), e cada linha tem seu "trilho" vertical
      // um pouco mais perto do celular que a anterior — assim as três nunca se cruzam.
      const phone2 = $('[data-fn-phone="2"]', fnGrid);
      if (phone2) {
        const P2 = rel(phone2);
        [
          ['bio', 0.62, (T) => ({ x: T.r + 7, y: T.cy })],
          ['hl', 0.42, (T) => ({ x: T.cx, y: T.b + 5 })],
          ['pin', 0.22, (T) => ({ x: T.r + 6, y: T.cy })],
        ].forEach(([key, frac, at]) => {
          const from = $(`[data-fn-from="${key}"] .fn-ico`, fnGrid);
          const target = $(`[data-fn-target="${key}"]`, fnGrid);
          if (!from || !target) return;
          const F = rel(from);
          const T = at(rel(target));
          const x0 = F.l - 10;
          const bus = P2.r + (x0 - P2.r) * frac;
          const r = 8;
          const s = Math.sign(T.y - F.cy) || 1;
          // quase na mesma altura: linha reta (sem degrau)
          const straight = Math.abs(T.y - F.cy) < r * 2 + 2;
          const y0 = straight ? T.y : F.cy;
          const d = straight
            ? `M ${x0} ${y0} H ${T.x}`
            : `M ${x0} ${y0} H ${bus + r} Q ${bus} ${y0} ${bus} ${y0 + s * r} V ${T.y - s * r} Q ${bus} ${T.y} ${bus - r} ${T.y} H ${T.x}`;
          add('path', { class: 'fn-wire', pathLength: 100, d });
          add('circle', { class: 'fn-wire-dot', cx: T.x, cy: T.y, r: 3.6 });
          add('circle', { class: 'fn-wire-dot', cx: x0, cy: y0, r: 2.6 });
        });
      }
    };
    drawFn();
    if ('ResizeObserver' in window) new ResizeObserver(drawFn).observe(fnGrid);
    window.addEventListener('load', drawFn);
    window.addEventListener('langchange', drawFn); // idem para o colchete e as linhas verdes
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawFn);
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
    linhas: 'Linhas editoriais', algoritmo: 'Frequência', ripple: 'The Ripple Effect', brief: 'Market Brief',
    newswire: 'Newswire', inside: 'Inside Story', frequencia: 'Frequência', referencias: 'Referências', entrega: 'O que eu entrego', perfil: 'Topo de funil', 'perfil-fundo': 'Fundo de funil',
    convite: 'Convite à newsletter', ampliar: 'Aprender e ampliar', metricas: 'Métricas', fim: 'Encerramento',
  };
  const SUBNAV = new Set(['ripple', 'brief', 'newswire', 'inside']);

  /* ---------- Slider horizontal: as 4 linhas editoriais numa seção só ----------
     Computador: a seção fica presa na tela e a rolagem para baixo passa as linhas para o lado.
     Celular / tablet: as linhas passam deslizando com o dedo (com um "empurrãozinho" de dica). */
  const hs = $('.slide--hs');
  const hsTrack = hs ? $('.hs__track', hs) : null;
  const hsPanels = hs ? $$('.hs__panel', hs) : [];
  const hsTabs = hs ? $$('[data-hs-go]', hs) : [];
  const hsSteps = hs ? $$('[data-hs-step]', hs) : [];
  const hsNow = hs ? $('[data-hs-now]', hs) : null;
  const hsK = hs ? slides.indexOf(hs) : -1;
  const hsN = hsPanels.length;
  const hsMQ = window.matchMedia('(min-width: 1025px) and (min-height: 600px)');
  const hsPinned = () => !!hs && hs.classList.contains('is-pinned');
  let hsI = 0;
  let hsLockUntil = 0; // durante uma rolagem programada, não deixa o contador "voltar" no meio do caminho

  // Itens do índice lateral: cada painel do slider aparece como uma linha própria
  const navItems = [];
  slides.forEach((s, k) => {
    if (s === hs) hsPanels.forEach((p, j) => navItems.push({ id: p.id, k, p: j }));
    else navItems.push({ id: s.id, k });
  });
  const sidenav = document.createElement('nav');
  sidenav.className = 'sidenav';
  sidenav.setAttribute('aria-label', 'Índice da apresentação');
  sidenav.innerHTML = '<ol>' + navItems.map((it) =>
    `<li><a href="#${it.id}" data-k="${it.k}"${it.p != null ? ` data-p="${it.p}"` : ''} class="${SUBNAV.has(it.id) ? 'is-sub' : ''}"><i aria-hidden="true"></i><span>${esc(NAV[it.id] || slides[it.k].dataset.label || `Slide ${it.k + 1}`)}</span></a></li>`
  ).join('') + '</ol>';
  document.body.appendChild(sidenav);
  const navLinks = $$('a', sidenav);
  const refreshNav = () => navLinks.forEach((a) => {
    const on = Number(a.dataset.k) === current && (a.dataset.p == null || Number(a.dataset.p) === hsI);
    a.classList.toggle('is-on', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });

  const hsMark = (i) => {
    hsI = i;
    hsPanels.forEach((p, j) => { const on = j === i; p.classList.toggle('is-on', on); p.inert = !on; p.setAttribute('aria-hidden', String(!on)); });
    hsTabs.forEach((t, j) => { const on = j === i; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    // no celular as abas não cabem todas: rola a fileira para mostrar a aba ativa
    const tabsRow = hsTabs[i] && hsTabs[i].parentElement;
    if (tabsRow && tabsRow.scrollWidth > tabsRow.clientWidth) tabsRow.scrollTo({ left: hsTabs[i].offsetLeft - tabsRow.offsetLeft - 8, behavior: 'smooth' });
    hsSteps.forEach((b) => { b.disabled = Number(b.dataset.hsStep) < 0 ? i <= 0 : i >= hsN - 1; });
    if (hsNow) hsNow.textContent = i + 1;
    hs.dataset.label = hsPanels[i].dataset.label || hs.dataset.label;
    if (current === hsK) labelEl.textContent = hs.dataset.label;
    refreshNav();
  };
  const hsTopAbs = () => hs.getBoundingClientRect().top + window.scrollY;
  const hsGo = (i, behavior = 'smooth') => {
    if (!hs) return;
    const t = Math.max(0, Math.min(hsN - 1, i));
    if (behavior === 'smooth') hsLockUntil = performance.now() + 750;
    if (hsPinned()) window.scrollTo({ top: hsTopAbs() + t * window.innerHeight, behavior });
    else hsTrack.scrollTo({ left: t * hsTrack.clientWidth, behavior });
    hsMark(t);
  };
  // Leva a página até o slider e abre o painel pedido (links #inside, #brief, #newswire, #ripple)
  const hsOpen = (id, behavior = 'smooth') => {
    const j = hsPanels.findIndex((p) => p.id === id);
    if (j < 0) return false;
    if (hsPinned()) { hsGo(j, behavior); return true; }
    hsGo(j, 'instant');
    hs.scrollIntoView({ behavior, block: 'start' });
    return true;
  };
  // Modo preso: a posição da rolagem vertical vira deslocamento horizontal
  const updateHs = () => {
    if (!hsPinned()) return;
    const r = hs.getBoundingClientRect();
    const range = Math.max(1, r.height - window.innerHeight);
    const p = Math.max(0, Math.min(1, -r.top / range));
    const pos = p * (hsN - 1); // 0 = primeira linha, hsN - 1 = última
    hsTrack.style.transform = `translate3d(${(-pos * hsTrack.clientWidth).toFixed(1)}px, 0, 0)`;
    hsPanels.forEach((pn, j) => { pn.firstElementChild.style.opacity = (1 - Math.min(1, Math.abs(pos - j)) * 0.75).toFixed(3); });
    hs.style.setProperty('--hs-p', ((pos + 1) / hsN).toFixed(4));
    if (pos > 0.04) hs.classList.add('is-moved');
    const i = Math.round(pos);
    if (i !== hsI && performance.now() > hsLockUntil) hsMark(i);
  };
  const hsMode = () => {
    if (!hs) return;
    const pin = hsMQ.matches;
    hs.classList.toggle('is-pinned', pin);
    if (pin) {
      hsTrack.scrollLeft = 0;
      updateHs();
    } else {
      hsTrack.style.transform = '';
      hsPanels.forEach((pn) => { pn.firstElementChild.style.opacity = ''; });
      hsTrack.scrollTo({ left: hsI * hsTrack.clientWidth, behavior: 'instant' });
      hs.style.setProperty('--hs-p', ((hsI + 1) / hsN).toFixed(4));
    }
  };

  if (hs) {
    hs.style.setProperty('--hs-n', hsN);
    // pontos de parada da rolagem vertical: um por linha
    hs.insertAdjacentHTML('beforeend', hsPanels.map((_, k) => `<span class="hs__snap" style="--k:${k}" aria-hidden="true"></span>`).join(''));
    hsTabs.forEach((t) => t.addEventListener('click', () => hsGo(Number(t.dataset.hsGo))));
    hsSteps.forEach((b) => b.addEventListener('click', () => hsGo(hsI + Number(b.dataset.hsStep))));
    // setas do teclado dentro das abas
    $('.hs__tabs', hs).addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); e.stopPropagation();
      hsGo(hsI + (e.key === 'ArrowRight' ? 1 : -1));
      hsTabs[hsI].focus();
    });
    // celular / tablet: deslizar com o dedo atualiza abas, contador e progresso
    let hsTick = false;
    hsTrack.addEventListener('scroll', () => {
      if (hsPinned() || hsTick) return;
      hsTick = true;
      requestAnimationFrame(() => {
        hsTick = false;
        const pos = hsTrack.scrollLeft / hsTrack.clientWidth;
        hs.style.setProperty('--hs-p', ((pos + 1) / hsN).toFixed(4));
        if (pos > 0.3) hs.classList.add('is-moved');
        const i = Math.round(pos);
        if (i !== hsI && performance.now() > hsLockUntil) hsMark(i);
      });
    }, { passive: true });
    // celular / tablet: quando o slider aparece, ele "espia" a próxima linha para mostrar que dá para deslizar
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const peek = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || hsPinned() || hsI !== 0) return;
          peek.disconnect();
          setTimeout(() => {
            if (hsPinned() || hsI !== 0) return;
            hsTrack.style.scrollSnapType = 'none';
            hsTrack.scrollTo({ left: hsTrack.clientWidth * 0.18, behavior: 'smooth' });
            setTimeout(() => {
              hsTrack.scrollTo({ left: 0, behavior: 'smooth' });
              setTimeout(() => { hsTrack.style.scrollSnapType = ''; hs.classList.remove('is-moved'); }, 500);
            }, 700);
          }, 700);
        });
      }, { threshold: 0.35 });
      peek.observe(hsTrack);
    }
    // Computador: cada "rolada" do mouse ou do trackpad passa exatamente uma linha (sem parar no meio)
    const hsPos = () => {
      const r = hs.getBoundingClientRect();
      return Math.max(0, Math.min(hsN - 1, (-r.top / Math.max(1, r.height - window.innerHeight)) * (hsN - 1)));
    };
    let wheelLast = 0;
    let wheelLastAbs = 0;
    let wheelSettle = 0;
    let hsExitUntil = 0;
    // se a rolagem parar entre duas linhas (ex.: chegando de cima com embalo), assenta na mais próxima
    const hsSettle = () => {
      if (!hsPinned() || performance.now() < hsLockUntil) return;
      const r = hs.getBoundingClientRect();
      if (r.top > 2 || r.bottom < window.innerHeight - 2) return;
      const p = hsPos();
      if (Math.abs(p - Math.round(p)) > 0.01) hsGo(Math.round(p));
    };
    window.addEventListener('wheel', (e) => {
      if (!hsPinned() || e.ctrlKey) return;
      if (document.documentElement.style.overflow === 'hidden') return; // popup ampliado aberto
      const now = performance.now();
      const abs = Math.abs(e.deltaY);
      // gesto novo = pausa desde o último evento, ou um impulso mais forte que o embalo do trackpad
      // (conta todos os eventos, inclusive os de antes de chegar ao slider, para o embalo não "pular" uma linha)
      const fresh = now - wheelLast > 220 || abs > wheelLastAbs * 1.6 + 4;
      wheelLast = now;
      wheelLastAbs = abs;
      if (now < hsExitUntil) { e.preventDefault(); return; }              // acabou de sair do slider: segura o embalo
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;             // gesto lateral: fica com o carrossel
      const r = hs.getBoundingClientRect();
      const vh = window.innerHeight;
      // chegando perto do slider: descendo, entra direto na 1ª linha; subindo, entra direto na última
      // (o embalo da rolagem não consegue passar da linha certa)
      const nearFromAbove = e.deltaY > 0 && r.top > 2 && r.top <= vh + 2;
      const nearFromBelow = e.deltaY < 0 && r.bottom < vh - 2 && r.bottom >= -2;
      if (nearFromAbove || nearFromBelow) {
        e.preventDefault();
        if (now >= hsLockUntil) hsGo(nearFromAbove ? 0 : hsN - 1);
        return;
      }
      if (r.top > 2 || r.bottom < vh - 2) return;                      // longe do slider: rolagem normal
      clearTimeout(wheelSettle);
      wheelSettle = setTimeout(hsSettle, 180);
      const pos = hsPos();
      const target = e.deltaY > 0 ? Math.floor(pos + 0.05) + 1 : Math.ceil(pos - 0.05) - 1;
      const busy = now < hsLockUntil || !fresh;
      if (target < 0 || target > hsN - 1) {
        // nas pontas, um gesto novo leva direto ao slide vizinho; o embalo do gesto anterior é segurado
        e.preventDefault();
        if (!busy) { hsLockUntil = hsExitUntil = now + 800; goTo(current + (target < 0 ? -1 : 1)); }
        return;
      }
      e.preventDefault();
      if (!busy) hsGo(target);
    }, { passive: false });

    window.addEventListener('resize', hsMode);
    if (hsMQ.addEventListener) hsMQ.addEventListener('change', hsMode);
    // links da página que apontam para uma linha do slider
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a && !a.closest('.sidenav') && hsOpen(a.getAttribute('href').slice(1))) e.preventDefault();
    });
    hsMark(0);
    hsMode();
    // abriu a página já com #inside, #brief, #newswire ou #ripple no endereço
    if (location.hash) requestAnimationFrame(() => hsOpen(location.hash.slice(1), 'instant'));
  }

  navLinks.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (a.dataset.p != null) { hsOpen(hsPanels[Number(a.dataset.p)].id); return; }
    slides[Number(a.dataset.k)].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  const setCurrent = (i) => {
    if (i === current && nowEl.textContent === pad(i + 1)) return;
    current = i;
    nowEl.textContent = pad(i + 1);
    labelEl.textContent = slides[i].dataset.label || '';
    refreshNav();
    // setas ↑↓ do canto somem enquanto o slider das linhas está na tela
    document.documentElement.classList.toggle('hs-active', i === hsK);
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
    updateHs();
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
    // voltando de baixo para o slider preso, entra pela última linha (e não pela primeira)
    if (t === hsK && hsPinned()) { hsGo(t < current ? hsN - 1 : 0); return; }
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
    const ytId = encodeURIComponent(youtubeId);
    // O YouTube exige saber de qual site o player está sendo incorporado (senão mostra o "Erro 153"):
    // referrerpolicy envia essa informação. Aberta direto do arquivo (file://) a página não tem site,
    // então o player só funciona com o site servido por http(s) — por isso há o link de reserva abaixo.
    lbVideo.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1" title="Vídeo ampliado" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
      + `<a class="lightbox__yt" href="https://www.youtube.com/watch?v=${ytId}" target="_blank" rel="noopener">Abrir no YouTube ↗</a>`;
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
    // no slider das linhas, as setas passam de linha; nas pontas, seguem para o slide anterior/seguinte
    // (no computador, ↓ ↑ e espaço também passam de linha, já que a rolagem é que move o slider)
    if (hs && current === hsK) {
      const fwd = k === 'ArrowRight' || (hsPinned() && (k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey)));
      const back = k === 'ArrowLeft' || (hsPinned() && (k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey)));
      const nx = hsI + (fwd ? 1 : back ? -1 : 0);
      if ((fwd || back) && nx >= 0 && nx < hsN) { e.preventDefault(); hsGo(nx); return; }
    }
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
          // (o efeito "escrevendo…" na assinatura foi desligado a pedido; a função typeIn ficou guardada acima)
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    slides.forEach((s) => io.observe(s));
  } else {
    slides.forEach((s) => s.classList.add('is-in'));
  }
  /* ---------- Wave Mesh: fundo do encerramento ----------
     Adaptação em JavaScript puro do componente "Wave Mesh" (React): um campo de pontos
     até o horizonte, rolando como um mar lento. O mouse levanta um morro onde aponta;
     o clique solta um anel que viaja pelo campo e some. Os pontos encolhem e esmaecem
     com a distância. Pausa sozinho quando o slide sai da tela. */
  const waveMesh = (host, { colors = ['#06070a', '#c9d6ea', '#f0b37a'], crests = false } = {}) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'wave-mesh';
    canvas.setAttribute('aria-hidden', 'true');
    host.prepend(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) { canvas.remove(); return; }

    const CAM = 0.62; // altura da câmera sobre o chão
    const NEAR = 0.35, FAR = 3.4;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = !matchMedia('(hover: hover) and (pointer: fine)').matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const hex = (h) => { const n = parseInt(h.slice(1), 16); return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`; };
    const dot = hex(colors[1]), accent = hex(colors[2]);
    let W = 0, H = 0, cols = 0, rows = 0, f = 0, hz = 0;
    let raf = 0, visible = true, last = 0;
    const t0 = performance.now();
    const ptr = { x: 0, z: 1.4, s: 0, tx: 0, tz: 1.4, ts: 0 };
    const rings = [];

    // fundo: um leve brilho da cor dos pontos sobre o tom de base
    host.style.background = `radial-gradient(120% 60% at 50% 30%, rgba(${dot},0.07), transparent 60%), ${colors[0]}`;

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (w === W && h === H) return;
      W = w; H = h;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      f = Math.max(W, H * 1.2) * 0.55; // distância focal
      hz = H * 0.3; // horizonte
      cols = Math.round(Math.min(150, Math.max(56, W / 9)));
      rows = Math.round(Math.min(90, Math.max(48, H / 9.5)));
    };
    // o chão cobre esta meia-largura no fundo, para o campo sempre preencher o quadro
    const half = () => (W / 2 / f) * FAR * 1.05;

    const height = (x, z, t) => {
      let y = 0.085 * Math.sin(x * 2.2 + t * 0.7)
        + 0.07 * Math.sin(z * 2.9 - t * 0.9 + x * 0.8)
        + 0.03 * Math.sin((x + z) * 6.1 + t * 1.6);
      if (ptr.s > 0.01) {
        const d2 = (x - ptr.x) ** 2 + (z - ptr.z) ** 2;
        y += 0.24 * ptr.s * Math.exp(-d2 / 0.07);
      }
      for (const r of rings) {
        const age = t - r.t, d = Math.hypot(x - r.x, z - r.z), front = age * 1.15;
        y += 0.2 * Math.exp(-((d - front) ** 2) / 0.014) * Math.exp(-age * 0.75);
      }
      return y;
    };

    const frame = (t) => {
      ctx.clearRect(0, 0, W, H);
      ptr.x += (ptr.tx - ptr.x) * 0.1;
      ptr.z += (ptr.tz - ptr.z) * 0.1;
      ptr.s += (ptr.ts - ptr.s) * 0.06;
      while (rings.length && t - rings[0].t > 5) rings.shift();
      const hw = half();
      const hot = [];
      for (let j = 0; j < rows; j++) {
        // fileiras espaçadas em profundidade de forma geométrica: ficam quase uniformes na tela
        const z = FAR * Math.pow(NEAR / FAR, j / (rows - 1));
        const fog = Math.pow(1 - (z - NEAR) / (FAR - NEAR), 1.25);
        const size = Math.max(0.8, Math.min(3.2, 2.3 / z));
        ctx.fillStyle = `rgba(${dot},${(0.12 + fog * 0.85).toFixed(3)})`;
        for (let i = 0; i < cols; i++) {
          const x = -hw + (i / (cols - 1)) * hw * 2;
          const y = height(x, z, t);
          const sx = W / 2 + (x / z) * f;
          if (sx < -4 || sx > W + 4) continue;
          const sy = hz + ((CAM - y) / z) * f;
          if (crests && y > 0.12) { hot.push(sx, sy, size, fog); continue; }
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
      }
      for (let k = 0; k < hot.length; k += 4) {
        ctx.fillStyle = `rgba(${accent},${(0.2 + hot[k + 3] * 0.8).toFixed(3)})`;
        const s = hot[k + 2] * 1.15;
        ctx.fillRect(hot[k] - s / 2, hot[k + 1] - s / 2, s, s);
      }
    };

    const now = () => (performance.now() - t0) / 1000;
    const loop = (ms) => {
      if (!visible || document.hidden) { raf = 0; return; }
      raf = requestAnimationFrame(loop);
      if (coarse && ms - last < 30) return; // celular: ~30 fps para poupar bateria
      last = ms;
      resize();
      frame(now());
    };
    const wake = () => { if (!reduced && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };

    // onde no chão cai um ponto da tela (ignorando as ondas)
    const ground = (e) => {
      const r = host.getBoundingClientRect();
      const sx = e.clientX - r.left, sy = e.clientY - r.top;
      if (sx < 0 || sy < 0 || sx > r.width || sy > r.height || sy <= hz + 4) return null;
      const z = Math.min(FAR, Math.max(NEAR, (CAM * f) / (sy - hz)));
      return { x: ((sx - W / 2) * z) / f, z };
    };
    const onMove = (e) => {
      const g = ground(e);
      if (g) {
        ptr.tx = g.x; ptr.tz = g.z;
        if (ptr.s < 0.05) { ptr.x = g.x; ptr.z = g.z; }
      }
      ptr.ts = g ? 1 : 0;
    };
    const onDown = (e) => { const g = ground(e); if (g) rings.push({ x: g.x, z: g.z, t: now() }); };

    resize();
    frame(reduced ? 3 : 0);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(host);
    new ResizeObserver(() => { if (reduced) { resize(); frame(3); } }).observe(host);
    document.addEventListener('visibilitychange', wake);
    if (!reduced) {
      wake();
      if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
    }
  };
  $$('[data-wave-mesh]').forEach((el) => waveMesh(el));
})();
