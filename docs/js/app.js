(function () {

  // ── THEME TOGGLE ──────────────────────────────────────────────────────────
  var html = document.documentElement;
  var savedTheme = localStorage.getItem('bob4z-theme');
  html.setAttribute('data-theme', savedTheme || 'dark');

  var themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('bob4z-theme', next);
    });
  }

  // ── STARFIELD ──────────────────────────────────────────────────────────────
  var c = document.getElementById('stars-canvas');
  var ctx = c.getContext('2d');
  var W, H, stars = [];

  function resizeStars() {
    W = c.width  = window.innerWidth;
    H = c.height = Math.max(document.body.scrollHeight, window.innerHeight);
  }
  function initStars() {
    resizeStars();
    stars = [];
    for (var i = 0; i < 180; i++) {
      stars.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.4 + 0.3,
        a:  Math.random(),
        da: (Math.random() - 0.5) * 0.005
      });
    }
  }
  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var starColor = isLight ? '60,80,160,' : '180,200,255,';
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.a = Math.max(0.08, Math.min(1, s.a + s.da));
      if (s.a <= 0.08 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + starColor + s.a + ')';
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }
  window.addEventListener('resize', initStars);
  initStars();
  drawStars();

  // ── HERO SCROLL CTA ────────────────────────────────────────────────────────
  var heroCtaBtn = document.getElementById('hero-cta-btn');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', function () {
      var section = document.getElementById('tracks-section');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ── NEW-TO-BOB MODAL ───────────────────────────────────────────────────────
  var ntbOverlay = document.getElementById('ntb-overlay');

  function openNtb(startTab) {
    if (!ntbOverlay) return;
    ntbOverlay.classList.add('active');
    if (startTab) ntbSwitchTab(startTab);
    var closeBtn = document.getElementById('ntb-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeNtb() {
    if (ntbOverlay) ntbOverlay.classList.remove('active');
  }
  function ntbSwitchTab(num) {
    var panels = ntbOverlay.querySelectorAll('.ntb-panel');
    var tabs   = ntbOverlay.querySelectorAll('.ntb-tab');
    panels.forEach(function (p) { p.classList.remove('ntb-panel-active'); });
    tabs.forEach(function (t) {
      t.classList.remove('ntb-tab-active');
      t.setAttribute('aria-selected', 'false');
    });
    var activePanel = document.getElementById('ntb-panel-' + num);
    var activeTab   = document.getElementById('ntb-tab-' + num);
    if (activePanel) activePanel.classList.add('ntb-panel-active');
    if (activeTab)   { activeTab.classList.add('ntb-tab-active'); activeTab.setAttribute('aria-selected', 'true'); }
    tabs.forEach(function (t) {
      var n = parseInt(t.getAttribute('data-ntb-tab'), 10);
      if (n < num) t.classList.add('ntb-tab-done');
      else t.classList.remove('ntb-tab-done');
    });
  }

  var ntbBtn = document.getElementById('new-to-bob-btn');
  if (ntbBtn) ntbBtn.addEventListener('click', function () { openNtb(1); });
  if (ntbOverlay) {
    ntbOverlay.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-ntb-tab]');
      if (tab) { ntbSwitchTab(parseInt(tab.getAttribute('data-ntb-tab'), 10)); return; }
      if (e.target.closest('#ntb-next-btn')) { ntbSwitchTab(2); return; }
      if (e.target === ntbOverlay) closeNtb();
    });
    var ntbCloseBtn = document.getElementById('ntb-close');
    if (ntbCloseBtn) ntbCloseBtn.addEventListener('click', closeNtb);
  }

  // ── TRACK PARTIALS LOADER ─────────────────────────────────────────────────
  var TRACK_SLUGS = ['setup', 'track-discovery', 'track-refactor', 'track-bobshell'];
  var stream = document.getElementById('tracks-stream');

  function loadTrackSlug(index) {
    if (index >= TRACK_SLUGS.length) {
      initCards();
      return;
    }
    var slug = TRACK_SLUGS[index];
    var url  = 'tracks/' + slug + '.html';

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        while (wrapper.firstChild) stream.appendChild(wrapper.firstChild);
        loadTrackSlug(index + 1);
      })
      .catch(function (err) {
        console.warn('[BOB4Z] Could not load track:', slug, err);
        loadTrackSlug(index + 1);
      });
  }

  if (stream) loadTrackSlug(0);

  // ── CARD INIT ─────────────────────────────────────────────────────────────
  function initCards() {
    var cards = document.querySelectorAll('.bubble-card');

    // Bubble pop-in via IntersectionObserver
    if ('IntersectionObserver' in window) {
      var cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = Array.prototype.indexOf.call(cards, entry.target);
            var delay = Math.min(idx * 60, 420);
            setTimeout(function (t) { t.classList.add('bubble-in'); }, delay, entry.target);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.10 });
      cards.forEach(function (card) { cardObserver.observe(card); });
    } else {
      cards.forEach(function (card) { card.classList.add('bubble-in'); });
    }

    // Card toggle: click summary to open/close
    cards.forEach(function (card) {
      var summary = card.querySelector('.card-summary');
      if (!summary) return;
      summary.addEventListener('click', function () {
        var isOpen = card.classList.contains('open');
        cards.forEach(function (c) { c.classList.remove('open'); });
        if (!isOpen) {
          card.classList.add('open');
          setTimeout(function () {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
      });
    });

    // Use-case accordion inside cards
    document.addEventListener('click', function (e) {
      var header = e.target.closest('.use-case-header');
      if (!header) return;
      var uc = header.closest('.use-case');
      var isOpen = uc.classList.contains('uc-open');
      uc.closest('.use-cases').querySelectorAll('.use-case').forEach(function (s) {
        s.classList.remove('uc-open');
      });
      if (!isOpen) uc.classList.add('uc-open');
    });

    // Copy buttons
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.copy-btn');
      if (!btn) return;
      var box  = btn.closest('.step-prompt, .code-block');
      var pre  = box ? box.querySelector('pre') : null;
      var text = pre ? pre.textContent : '';
      if (!text) return;
      fallbackCopy(text, btn);
    });
  }

  // ── COPY HELPER ───────────────────────────────────────────────────────────
  function fallbackCopy(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { markCopied(btn); }).catch(function () { legacyCopy(text, btn); });
    } else {
      legacyCopy(text, btn);
    }
  }
  function legacyCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); markCopied(btn); } catch (e) {}
    document.body.removeChild(ta);
  }
  function markCopied(btn) {
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }

  // ── ESCAPE KEY ────────────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNtb();
  });

})();
