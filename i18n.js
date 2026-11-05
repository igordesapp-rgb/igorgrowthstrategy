/* ============================================================
   IDIOMAS — inglês (padrão) e português
   ------------------------------------------------------------
   • O texto em português fica no index.html / content.js.
   • Aqui está a versão em inglês de cada frase: chave = texto em
     português (exatamente como aparece), valor = texto em inglês.
   • Para mudar uma tradução, edite só o valor da direita.
   • Frases com partes em negrito aparecem quebradas em pedaços
     (cada pedaço é traduzido separadamente).
   • A escolha do visitante fica salva no navegador dele.
   ============================================================ */
(() => {
  const EN = {
    // ---------- Página ----------
    'StoxRadar · Estratégia de crescimento': 'StoxRadar · Growth Strategy',
    'Estratégia de alcance e aquisição da StoxRadar no Instagram, por Igor Souza.': "StoxRadar's Instagram reach and acquisition strategy, by Igor Souza.",

    // ---------- Capa ----------
    'Estratégia de crescimento': 'Growth strategy',
    'Proposta para o Instagram': 'Instagram proposal',
    'Estratégia de alcance': 'Reach and acquisition',
    'e aquisição': 'strategy',
    'Conteúdo editorial para ampliar a presença da StoxRadar e atrair inscritos para a newsletter.': "Editorial content built to grow StoxRadar's presence and bring in newsletter subscribers.",
    'Ver a estratégia': 'See the strategy',

    // ---------- Linhas editoriais (intro) ----------
    'Linhas editoriais': 'Content series',
    'Criei 4 linhas editoriais.': 'I created 4 content series.',
    'Cada uma tem nome, lógica e intenção próprias. Algumas nascem de fatos atuais. Outras resgatam movimentos históricos que ajudam a explicar o presente. Mas todas seguem o mesmo princípio: chamar atenção, sustentar a leitura e entregar algo útil para quem acompanha a StoxRadar.':
      "Each one has its own name, logic, and purpose. Some start from current events. Others revisit historical moments that help explain the present. But they all follow the same principle: grab attention, keep people reading, and deliver something genuinely useful to StoxRadar's audience.",
    'Nada entra por acaso. Todo conteúdo passa por curadoria, do tema ao ângulo, da manchete ao formato, para garantir relevância, clareza e consistência editorial. Agora, vou observar qual linha performa melhor. Pode ser que uma seja mais utilizada do que a outra.':
      "Nothing gets published by chance. Every piece is curated, from topic to angle and from headline to format, to keep it relevant, clear, and editorially consistent. From here, I'll track which series performs best. Some may end up getting used more than others.",
    'Atual ou histórico, o critério é o mesmo: relevância, retenção e utilidade.': 'Current or historical, the bar is the same: relevance, retention, and usefulness.',

    // ---------- Slider das linhas ----------
    'Role para ver as outras linhas': 'Scroll to see the other series',
    'Deslize para ver as outras linhas': 'Swipe to see the other series',
    'Reels narrativo': 'Narrative Reel',
    'Transformar acontecimentos em histórias que a pessoa queira assistir e acompanhar até o desfecho.': 'Turn real events into stories people want to watch all the way to the end.',
    'Como o interesse é construído': 'How it builds interest',
    'A capa e a abertura despertam uma pergunta. O roteiro revela como o caso aconteceu, sustentando o interesse ao longo da explicação.': 'The cover and the hook raise a question. The script reveals how it all happened, keeping viewers hooked through the whole story.',
    'Assistir': 'Watch',
    'Carrossel explicativo': 'Explainer carousel',
    'Despertar curiosidade com histórias que revelam conexões inesperadas entre empresas, política e economia.': 'Spark curiosity with stories that reveal unexpected connections between companies, politics, and the economy.',
    'A capa apresenta uma tensão. O carrossel desenvolve a explicação até revelar suas causas e consequências.': 'The cover sets up a tension. The carousel builds the explanation until it reveals the causes and the consequences.',
    'Ampliar': 'View',
    'Clique em Ampliar e acompanhe a história até o fim.': 'Click View and follow the story to the end.',
    '… mais': '… more',
    'Carrossel de notícia': 'News carousel',
    'Transformar uma notícia relevante em uma leitura curta que ajude a entender o que está em jogo.': "Turn a relevant news story into a quick read that helps people understand what's at stake.",
    'A capa destaca o ângulo mais interessante da notícia. Os slides acrescentam o contexto necessário para compreender sua importância.': 'The cover highlights the most interesting angle of the story. The slides add the context needed to understand why it matters.',
    'Post com leitura na legenda': 'Single post + long caption',
    'Despertar interesse por um acontecimento com uma manchete direta e uma apresentação visual marcante.': 'Spark interest in a news event with a straightforward headline and a bold visual.',
    'A capa dá destaque à notícia e convida à leitura. A legenda desenvolve os detalhes e o contexto do acontecimento.': 'The cover puts the news front and center and invites people to read on. The caption covers the details and the context.',
    'A manchete chama a atenção na imagem. Na legenda, a leitura continua com os detalhes e o contexto do acontecimento.': 'The headline grabs attention in the image. The caption picks up from there with the details and the context.',

    // ---------- Frequência ----------
    'Frequência': 'Posting frequency',
    'Frequência alta.': 'Post often.',
    'Conteúdo com critério.': 'Post with purpose.',
    'A proposta é publicar com consistência, idealmente todos os dias ou, no máximo, a cada dois dias. O ajuste não está na frequência geral, mas na linha editorial que melhor performa.':
      "The plan is to post consistently, ideally every day, or every other day at most. What changes isn't the overall frequency, it's which content series gets priority based on performance.",
    'Não basta postar. É preciso definir o que dizer, como apresentar e quando publicar.': "Posting isn't enough. You have to decide what to say, how to present it, and when to publish.",
    'Momento': 'Timing',
    'Representação': 'Visuals',
    'Retenção': 'Retention',
    'Consistência na publicação. Critério na execução.': 'Consistent posting. Intentional execution.',
    'Publicações frequentes.': 'Frequent posting.',
    'Estratégia orientada por performance.': 'A performance-driven strategy.',
    'A proposta é publicar conteúdo diariamente ou, no máximo, a cada dois dias, mantendo a StoxRadar ativa e presente no Instagram.': 'The plan is to post every day, or every other day at most, keeping StoxRadar active and visible on Instagram.',
    'Cada linha editorial terá seu desempenho avaliado individualmente, considerando alcance, retenção e engajamento.': 'Each content series will be evaluated on its own, based on reach, retention, and engagement.',
    'A frequência geral será mantida. O que será ajustado é a distribuição entre as linhas editoriais, priorizando aquelas que apresentarem melhores resultados.': 'The overall posting frequency stays the same. What changes is the mix across series, giving more room to the ones that perform best.',

    // ---------- Referências ----------
    'Referências': 'References',
    'que inspiram o formato': 'that inspire the format',
    'Algumas marcas já usam formatos parecidos, como o vídeo narrativo. Cada uma adapta ao seu jeito, e várias alcançam muitas pessoas.': 'Some brands already use similar formats, like narrative video. Each one puts its own spin on it, and many of them reach huge audiences.',
    '204 mil visualizações': '204K views',
    '3,2 mi de visualizações': '3.2M views',
    '2,8 mi de visualizações': '2.8M views',
    '91 mil curtidas e 2.444 comentários': '91K likes and 2,444 comments',
    '748 mil visualizações': '748K views',
    '1,3 mi de visualizações': '1.3M views',

    // ---------- Topo de funil ----------
    'O objetivo é': 'The goal is to',
    'alcançar pessoas.': 'reach people.',
    'Parte desse público pode querer saber mais sobre a newsletter. Por isso, o Instagram organiza a conversão em duas frentes:': 'Some of that audience will want to learn more about the newsletter. So Instagram drives conversion on two fronts:',
    'Stories para a base de seguidores': 'Stories for existing followers',
    'e o': 'and the',
    'perfil para quem chega agora.': 'profile for new visitors.',
    'Topo de funil': 'Top of funnel',
    'Conteúdo para alcançar e atrair.': 'Content that reaches and attracts.',
    'Reels e carrosséis para gerar visibilidade e levar novas pessoas ao perfil.': 'Reels and carousels that drive visibility and bring new people to the profile.',
    'Vídeos curtos com alto potencial de alcance.': 'Short videos with high reach potential.',
    'Carrosséis': 'Carousels',
    'Conteúdo educativo, análises e insights.': 'Educational content, analysis, and insights.',
    'seguidores': 'followers',
    'seguindo': 'following',
    'Mercado, empresas e economia': 'Markets, companies & the economy',
    'Seguir': 'Follow',
    'Mensagem': 'Message',
    'Sobre': 'About',
    'Mais': 'More',
    // células da grade do perfil ("Topo<br>de funil", "Post<br>fixado")
    'Topo': 'Top',
    'Fundo': 'Bottom',
    'de funil': 'of funnel',
    'Post': 'Pinned',
    'fixado': 'post',

    // ---------- Fundo de funil ----------
    'Fundo de funil': 'Bottom of funnel',
    'Perfil para quem deseja saber mais.': 'A profile for people who want to know more.',
    'Link na bio': 'Link in bio',
    'Leva para uma landing page com mais detalhes e o formulário de inscrição.': 'Takes people to a landing page with more details and the sign-up form.',
    'Destaque (Newsletter)': 'Highlight (Newsletter)',
    'Apresenta a newsletter e os principais benefícios.': 'Introduces the newsletter and its main benefits.',
    'Post fixado': 'Pinned post',
    'Explica a newsletter e convida para a inscrição.': 'Explains the newsletter and invites people to sign up.',
    '2 posts por semana convidando os seguidores a conhecerem a newsletter.': '2 posts a week inviting followers to check out the newsletter.',

    // ---------- O que eu entrego ----------
    'O que eu entrego': 'What I deliver',
    'Estratégia, criação e análise em um processo integrado, combinando experiência profissional e inteligência artificial.': 'Strategy, creation, and analysis in one integrated process, combining professional experience with AI.',
    'Estratégia • direção criativa • execução': 'Strategy • creative direction • execution',
    'IA como apoio': 'AI-assisted',
    'A IA ajuda a pesquisar e produzir mais rápido. As decisões são minhas.': 'AI helps me research and produce faster. The decisions are mine.',
    'Pesquisa e estratégia editorial': 'Research & editorial strategy',
    'Design e UX': 'Design & UX',
    'Edição de vídeo': 'Video editing',
    'Métricas e otimização': 'Metrics & optimization',
    'A IA otimiza processos.': 'AI streamlines the process.',
    'A experiência profissional orienta as decisões.': 'Professional experience drives the decisions.',

    // ---------- Encerramento ----------
    '“A IA abriu novas possibilidades para criar conteúdo de qualidade. Acredito que as marcas capazes de conquistar atenção, sustentar o interesse e ampliar seu alcance têm uma grande oportunidade de transformar boas ideias em grandes resultados.”':
      '“AI has opened up new possibilities for creating quality content. I believe the brands that can capture attention, hold interest, and grow their reach have a huge opportunity to turn good ideas into great results.”',
    'Encerramento': 'Closing',
    'Início': 'Home',

    // ---------- Popup ----------
    'Abrir no YouTube ↗': 'Watch on YouTube ↗',

    // ---------- Acessibilidade (leitores de tela) ----------
    'Igor Souza, Content Creator e Social Media — voltar ao início': 'Igor Souza, Content Creator & Social Media — back to the start',
    'Verificado': 'Verified',
    'As 4 linhas editoriais': 'The 4 content series',
    'Escolha a linha editorial': 'Choose a content series',
    'Linha anterior': 'Previous series',
    'Próxima linha': 'Next series',
    'Capa do Reels Inside Story': 'Inside Story Reel cover',
    'Assistir ao vídeo': 'Watch the video',
    'Carrossel de amostra': 'Sample carousel',
    'Ampliar o carrossel para ler melhor': 'Open the carousel to read it more easily',
    'Exemplo de post da linha Newswire': 'Sample Newswire post',
    'Ampliar o post para ler melhor': 'Open the post to read it more easily',
    'Igor Souza, com a IA como apoio, cuida de pesquisa e estratégia editorial, copywriting, design e UX, edição de vídeo, e métricas e otimização':
      'Igor Souza, with AI assistance, handles research and editorial strategy, copywriting, design and UX, video editing, and metrics and optimization',
    'Navegação dos slides': 'Slide navigation',
    'Slide anterior': 'Previous slide',
    'Próximo slide': 'Next slide',
    'Índice da apresentação': 'Presentation index',
    'Conteúdo ampliado': 'Expanded content',
    'Vídeo ampliado': 'Expanded video',
    'Fechar': 'Close',
    'Idioma': 'Language',
  };

  // Textos com números que mudam (contadores, slides, referências)
  const RULES = [
    [/^(\d+) de (\d+)$/, '$1 of $2'],
    [/^Linha (\d+) \/ (\d+)$/, 'Series $1 / $2'],
    [/^Slide (\d+) do carrossel$/, 'Carousel slide $1'],
    [/^Ampliar referência (\d+) de (.+)$/, 'Open reference $1 from $2'],
    [/^Ampliar referência (\d+)$/, 'Open reference $1'],
  ];

  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const translate = (pt) => {
    const k = norm(pt);
    if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(EN, k)) return EN[k];
    for (const [re, rep] of RULES) if (re.test(k)) return k.replace(re, rep);
    if (k.includes(' · ')) { // rótulos compostos, ex.: "Linhas editoriais · Reels narrativo"
      const parts = k.split(' · ');
      const t = parts.map((p) => EN[p] || p);
      if (t.some((x, i) => x !== parts[i])) return t.join(' · ');
    }
    return null;
  };

  const ATTRS = ['aria-label', 'alt', 'title', 'data-label'];
  const textRec = new WeakMap(); // nó de texto → { pt, en }
  const attrRec = new WeakMap(); // elemento → { atributo: { pt, en } }
  let lang = 'en';

  const keepSpaces = (orig, txt) => orig.match(/^\s*/)[0] + txt + orig.match(/\s*$/)[0];
  const skip = (el) => !el || el.closest('script, style, svg, noscript, [data-no-i18n]');

  const doText = (n) => {
    if (skip(n.parentElement)) return;
    const v = n.nodeValue;
    let rec = textRec.get(n);
    if (!rec || (v !== rec.pt && v !== rec.en)) { // texto novo (escrito pelo site): guarda o original
      const en = translate(v);
      rec = { pt: v, en: en == null ? null : keepSpaces(v, en) };
      textRec.set(n, rec);
    }
    const want = lang === 'en' && rec.en != null ? rec.en : rec.pt;
    if (n.nodeValue !== want) n.nodeValue = want;
  };
  const doAttrs = (el) => {
    if (skip(el)) return;
    let recs = attrRec.get(el);
    if (!recs) { recs = {}; attrRec.set(el, recs); }
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      const v = el.getAttribute(a);
      let rec = recs[a];
      if (!rec || (v !== rec.pt && v !== rec.en)) { rec = { pt: v, en: translate(v) }; recs[a] = rec; }
      const want = lang === 'en' && rec.en != null ? rec.en : rec.pt;
      if (v !== want) el.setAttribute(a, want);
    }
  };
  const apply = (root) => {
    if (root.nodeType === Node.TEXT_NODE) { doText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    doAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = w.nextNode())) { if (n.nodeType === Node.TEXT_NODE) doText(n); else doAttrs(n); }
  };

  // título e descrição da aba
  const headPT = { title: document.title, desc: document.querySelector('meta[name="description"]')?.content || '' };
  const applyHead = () => {
    document.title = lang === 'en' ? (EN[headPT.title] || headPT.title) : headPT.title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.content = lang === 'en' ? (EN[headPT.desc] || headPT.desc) : headPT.desc;
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  };

  // textos que o site escreve depois (popup, contadores, abas) também são traduzidos
  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') doText(m.target);
      else if (m.type === 'attributes') doAttrs(m.target);
      else m.addedNodes.forEach(apply);
    }
  }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });

  const buttons = [...document.querySelectorAll('[data-lang]')];
  const setLang = (l, save = true) => {
    lang = l === 'pt' ? 'pt' : 'en';
    apply(document.body);
    applyHead();
    buttons.forEach((b) => { const on = b.dataset.lang === lang; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    if (save) { try { localStorage.setItem('stox-lang', lang); } catch (e) { /* navegação privada */ } }
    // textos mudam de tamanho: redesenha linhas, circuito e slider
    requestAnimationFrame(() => { window.dispatchEvent(new Event('langchange')); window.dispatchEvent(new Event('resize')); });
  };
  buttons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  let saved = null;
  try { saved = localStorage.getItem('stox-lang'); } catch (e) { saved = null; }
  setLang(saved === 'pt' ? 'pt' : 'en', false); // padrão: inglês
})();
