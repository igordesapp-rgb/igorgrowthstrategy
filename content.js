/* ============================================================
   CONTEÚDO DAS LINHAS EDITORIAIS — edite só este arquivo.
   ------------------------------------------------------------
   • Coloque as imagens dentro da pasta /assets e escreva o
     caminho aqui (ex.: 'assets/market-brief-02.webp').
   • "slides": imagens do carrossel de amostra, na ordem.
     Enquanto faltar imagem, aparece um espaço reservado
     (a quantidade total é definida por "slideSlots").
   • "upcoming": capas de outros posts similares (só a capa,
     sem carrossel). Aparecem na lateral direita da linha e,
     ao clicar, abrem ampliadas. Enquanto faltar capa, aparece
     um espaço reservado (quantidade definida por "upcomingSlots").
   • Inside Story: cole só o ID do vídeo do YouTube em
     "youtubeId" (ex.: para youtube.com/shorts/AbC123xyz
     o ID é 'AbC123xyz').
   ============================================================ */

window.STOX_CONTENT = {
  rippleEffect: {
    format: 'carousel',
    slides: [
      'assets/ripple-01.webp',
      'assets/ripple-02.webp',
      'assets/ripple-03.webp',
      'assets/ripple-04.webp',
      'assets/ripple-05.webp',
      'assets/ripple-06.webp',
    ],
    slideSlots: 6,
    upcoming: [],
    upcomingSlots: 4,
  },

  marketBrief: {
    format: 'carousel',
    slides: [
      'assets/brief-01.webp',
      'assets/brief-02.webp',
      'assets/brief-03.webp',
      'assets/brief-04.webp',
    ],
    slideSlots: 4,
    upcoming: [],
    upcomingSlots: 4,
  },

  newswire: {
    format: 'post',
    image: 'assets/newswire.webp',
    caption:
      'A manchete chama a atenção na imagem. Na legenda, a leitura continua com os detalhes e o contexto do acontecimento.',
    upcoming: [],
    upcomingSlots: 4,
  },

  insideStory: {
    format: 'reels',
    youtubeId: 'CkU8lEy8RkY', // youtube.com/shorts/CkU8lEy8RkY
    cover: 'assets/inside-story.webp',
    upcoming: [],
    upcomingSlots: 4,
  },

  /* ----------------------------------------------------------
     REFERÊNCIAS: marcas que já fazem esse tipo de conteúdo
     e têm muitas visualizações. Para cada uma, preencha:
       image  → print do post/Reels (coloque em /assets)
       brand  → nome da marca
       handle → @ do perfil
       views  → ex.: '2,4 mi de visualizações'
     Enquanto faltar, aparece um espaço reservado ("slots").
     ---------------------------------------------------------- */
  references: {
    slots: 6,
    items: [
      // { image: 'assets/ref-01.webp', brand: 'Nome da marca', handle: '@perfil', views: '2,4 mi de visualizações' },
    ],
  },
};
