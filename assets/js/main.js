/**
 * main.js
 * 页面交互总控：
 *  - Human / AI Agents 切换（驱动 hero + body 的 data-mode，联动 SquareGrid 配色）
 *  - Light / Bold 切换（驱动 body 的 data-density：Light=当前字体，Bold=TWK Everett，
 *    同时联动 SquareGrid 方块数量等视觉密度参数）
 *  - Hero 背景方块马赛克动效初始化
 *  - 合作伙伴墙 / 客户评价墙内容动态填充（用于无缝 marquee 循环）
 *  - IntersectionObserver 驱动滚动进入动效（.reveal）
 */
(function () {
  'use strict';

  var body = document.body;
  var hero = document.getElementById('hero');
  var heroCanvas = document.getElementById('heroCanvas');

  var PALETTE_HUMAN = ['#FF902A', '#F68FDE'];
  var PALETTE_AGENT = ['#9B79FB', '#2C4AFC'];

  /* Human / AI Agents 两种模式下的主标题与副标题文案 */
  var HERO_COPY = {
    human: {
      title: 'Global payments for<br />Humans &amp; Agents',
      subtitle: 'Sell to people today, and agents tomorrow, with one global payment platform.'
    },
    agent: {
      title: 'Payments for a world<br />where agents buy',
      subtitle: 'Let agents discover, authorize, and pay for your products through agent-native commerce flows.'
    }
  };

  /* ---------------------------------------------------------
     1. 读取当前密度对应的节点数量（CSS 变量）
  --------------------------------------------------------- */
  function getDensityNodeCount() {
    var v = getComputedStyle(body).getPropertyValue('--density-node-count');
    var n = parseInt(v, 10);
    return isNaN(n) ? 900 : n;
  }

  /* ---------------------------------------------------------
     2. 初始化 Hero 背景点阵动效
  --------------------------------------------------------- */
  var heroNet = null;
  if (heroCanvas && typeof SquareGrid !== 'undefined') {
    heroNet = new SquareGrid(heroCanvas, {
      density: getDensityNodeCount(),
      palette: body.getAttribute('data-mode') === 'agent' ? PALETTE_AGENT : PALETTE_HUMAN,
      cellGap: 0,
      cornerRadius: 0,
      idleVisibleRatio: 0.06,
      loop: true
    });
    heroNet.start();
  }

  /* ---------------------------------------------------------
     3. Human / AI Agents 切换
  --------------------------------------------------------- */
  var modeSwitchBtns = document.querySelectorAll('.mode-switch-btn');
  var modeSwitchTrack = document.querySelector('.mode-switch');
  var modeSwitchThumb = document.querySelector('.mode-switch-thumb');

  /* 按当前按钮真实宽度/位置定位滑块，避免文案长度不同导致的错位 */
  function syncModeThumb() {
    if (!modeSwitchTrack || !modeSwitchThumb) return;
    var activeBtn = modeSwitchTrack.querySelector('.mode-switch-btn.is-active');
    if (!activeBtn) return;
    modeSwitchThumb.style.width = activeBtn.offsetWidth + 'px';
    modeSwitchThumb.style.transform = 'translateX(' + (activeBtn.offsetLeft - 6) + 'px)';
  }

  /* 切换到 AI Agents 模式时：散落代码片段 + 中央 ASCII 图形重新播放一遍
     模糊/位移淡入的入场动画，避免只靠 opacity 淡入显得生硬 */
  function playAgentDecoRevealAnimation() {
    var codeFrags = document.querySelectorAll('.hero-code-deco .code-frag');
    var asciiArt = document.querySelector('.hero-code-deco .ascii-art');

    codeFrags.forEach(function (el, i) {
      el.classList.remove('is-revealing');
      el.style.animationDelay = (i * 0.05) + 's, 0s';
      void el.offsetWidth;
      el.classList.add('is-revealing');
    });

    if (asciiArt) {
      asciiArt.classList.remove('is-revealing');
      void asciiArt.offsetWidth;
      asciiArt.classList.add('is-revealing');
    }
  }

  function setMode(mode) {
    if (!mode || (hero && hero.getAttribute('data-mode') === mode)) return;

    if (hero) hero.setAttribute('data-mode', mode);
    body.setAttribute('data-mode', mode);

    modeSwitchBtns.forEach(function (btn) {
      var isActive = btn.getAttribute('data-mode-target') === mode;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    syncModeThumb();

    if (heroNet) {
      heroNet.setPalette(mode === 'agent' ? PALETTE_AGENT : PALETTE_HUMAN);
      // 切换模式时让背景方块重新走一遍生长入场，呼应模式切换的视觉反馈
      heroNet.replay();
    }

    var copy = HERO_COPY[mode];
    if (copy) {
      if (heroTitleEl) heroTitleEl.innerHTML = copy.title;
      if (heroSubtitleEl) heroSubtitleEl.textContent = copy.subtitle;
    }

    if (mode === 'agent') {
      playAgentDecoRevealAnimation();
    }
  }

  modeSwitchBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMode(btn.getAttribute('data-mode-target'));
    });
  });

  syncModeThumb();
  window.addEventListener('resize', syncModeThumb);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncModeThumb);
  }

  /* ---------------------------------------------------------
     3.5 Hero 背景风格切换：Minimal（白底点缀方块） / Vivid（高饱和渐变模糊）
  --------------------------------------------------------- */
  var bgStyleBtns = document.querySelectorAll('.bgstyle-toggle button');
  var vividSegs = document.querySelectorAll('.hero-bg-vivid .vseg');
  var heroTitleEl = document.querySelector('.hero-title');
  var heroSubtitleEl = document.querySelector('.hero-subtitle');

  /* 进入 Vivid 模式：矩形色块按列位置错位、由左至右横向生长出现；
     标题/副标题同步做“从上到下”揭示动画，与色块生成节奏呼应 */
  function playVividRevealAnimation() {
    vividSegs.forEach(function (seg) {
      seg.classList.remove('is-revealing');
      var left = parseFloat(seg.style.left) || 0;
      seg.style.animationDelay = (left / 100 * 0.35) + 's, 0s';
      // 强制重排，确保重复触发时动画能重新播放
      void seg.offsetWidth;
      seg.classList.add('is-revealing');
    });

    [heroTitleEl, heroSubtitleEl].forEach(function (el, i) {
      if (!el) return;
      el.classList.remove('is-revealing');
      el.style.animationDelay = (0.15 + i * 0.12) + 's';
      void el.offsetWidth;
      el.classList.add('is-revealing');
    });
  }

  function setBgStyle(styleName) {
    if (!styleName || body.getAttribute('data-bg') === styleName) return;
    body.setAttribute('data-bg', styleName);

    bgStyleBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-bg') === styleName);
    });

    if (styleName === 'vivid') {
      playVividRevealAnimation();
    }
  }

  bgStyleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setBgStyle(btn.getAttribute('data-bg'));
    });
  });

  /* ---------------------------------------------------------
     4. Light / Bold 视觉密度切换
  --------------------------------------------------------- */
  var densityBtns = document.querySelectorAll('.density-toggle button');

  function setDensity(density) {
    if (!density || body.getAttribute('data-density') === density) return;
    body.setAttribute('data-density', density);

    densityBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-density') === density);
    });

    if (heroNet) {
      // 等待浏览器应用新的 CSS 变量后再读取
      requestAnimationFrame(function () {
        heroNet.setDensity(getDensityNodeCount());
      });
    }
  }

  densityBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setDensity(btn.getAttribute('data-density'));
    });
  });

  /* ---------------------------------------------------------
     5. 合作伙伴墙内容填充（横向 marquee，复制两份实现无缝循环）
  --------------------------------------------------------- */
  var PARTNER_ICON_IDS = [8, 119, 120, 148, 122, 146, 147, 149, 24, 33];

  function buildPartnersRow() {
    var row = document.getElementById('partnersRow');
    if (!row) return;

    var frag = document.createDocumentFragment();
    // 复制两份，配合 CSS translateX(-50%) 实现无缝循环
    for (var copy = 0; copy < 2; copy++) {
      PARTNER_ICON_IDS.forEach(function (id) {
        var card = document.createElement('div');
        card.className = 'logo-card';
        var img = document.createElement('img');
        img.src = 'assets/CodeBuddyAssets/115_22512/' + id + '.svg';
        img.alt = 'Partner';
        img.onerror = function () { this.style.display = 'none'; };
        card.appendChild(img);
        frag.appendChild(card);
      });
    }
    row.appendChild(frag);
  }

  /* ---------------------------------------------------------
     6. 客户评价墙内容填充（纵向 marquee，三列各复制两份）
  --------------------------------------------------------- */
  var TESTIMONIAL = {
    name: 'Sophie Kensington',
    company: 'Artisan Goods Co.',
    quote: 'Go live in minutes using our developer-friendly API or a prebuilt hosted solution.'
  };
  var TESTIMONIAL_COUNT_PER_COL = 4;

  function buildTestimonialColumn(id) {
    var col = document.getElementById(id);
    if (!col) return;

    var frag = document.createDocumentFragment();
    for (var copy = 0; copy < 2; copy++) {
      for (var i = 0; i < TESTIMONIAL_COUNT_PER_COL; i++) {
        var card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML =
          '<div class="testimonial-head">' +
            '<div class="testimonial-avatar"></div>' +
            '<div>' +
              '<p class="testimonial-name">' + TESTIMONIAL.name + '</p>' +
              '<p class="testimonial-company">' + TESTIMONIAL.company + '</p>' +
            '</div>' +
          '</div>' +
          '<p class="testimonial-quote">' + TESTIMONIAL.quote + '</p>';
        frag.appendChild(card);
      }
    }
    col.appendChild(frag);
  }

  buildPartnersRow();
  ['testiCol1', 'testiCol2', 'testiCol3'].forEach(buildTestimonialColumn);

  /* ---------------------------------------------------------
     6.5 顶部悬浮导航：滚动时保持固定在顶部，滚动后加深阴影
  --------------------------------------------------------- */
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var scrollTicking = false;

    function handleHeaderScroll() {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
      scrollTicking = false;
    }

    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        requestAnimationFrame(handleHeaderScroll);
        scrollTicking = true;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     7. 滚动进入动效（IntersectionObserver）
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     8. 页面卸载时清理动效资源
  --------------------------------------------------------- */
  window.addEventListener('beforeunload', function () {
    if (heroNet) heroNet.destroy();
  });
})();
