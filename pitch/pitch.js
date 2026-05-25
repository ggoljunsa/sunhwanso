/* ============================================
   순환소 · Pitch — Presentation controller
   ============================================ */
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;

  const elCur = document.getElementById('cur');
  const elTotal = document.getElementById('total');
  const elProgress = document.getElementById('progress');
  const elHint = document.getElementById('hint');
  const elOverview = document.getElementById('overview');
  const elOverviewGrid = document.getElementById('overviewGrid');

  elTotal.textContent = total;

  // ---------- Slide nav ----------
  function go(idx, dir) {
    if (idx < 0 || idx >= total || idx === current) return;
    const leaving = slides[current];
    const entering = slides[idx];
    leaving.classList.remove('is-active');
    if (dir === 'back') leaving.classList.add('is-leaving');
    else leaving.classList.remove('is-leaving');
    setTimeout(() => leaving.classList.remove('is-leaving'), 600);
    entering.classList.add('is-active');
    current = idx;
    elCur.textContent = idx + 1;
    elProgress.style.width = ((idx + 1) / total * 100) + '%';
    history.replaceState(null, '', '#/' + (idx + 1));
    updateOverview();
  }
  const next = () => go(current + 1);
  const prev = () => go(current - 1, 'back');

  // ---------- Keyboard ----------
  document.addEventListener('keydown', (e) => {
    if (elOverview.classList.contains('is-open')) {
      if (e.key === 'Escape') { toggleOverview(false); }
      return;
    }
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': case 'n': case 'N':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'b': case 'B':
        e.preventDefault(); prev(); break;
      case 'Home': go(0); break;
      case 'End':  go(total - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 'Escape': toggleOverview(true); break;
      default:
        if (e.key >= '1' && e.key <= '9') go(parseInt(e.key, 10) - 1);
        else if (e.key === '0') go(9);
    }
  });

  // ---------- Buttons ----------
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  document.getElementById('fs').addEventListener('click', toggleFullscreen);
  document.getElementById('overviewBtn').addEventListener('click', () => toggleOverview(true));

  // ---------- Touch ----------
  let touchStartX = 0, touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  // ---------- Fullscreen ----------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  // ---------- Overview (ESC) ----------
  function buildOverview() {
    elOverviewGrid.innerHTML = slides.map((s, i) => {
      const title = s.dataset.title || ('Slide ' + (i + 1));
      return `<button class="overview-thumb" data-idx="${i}">
        <div class="overview-num">${String(i+1).padStart(2,'0')}</div>
        <div class="overview-title">${title}</div>
      </button>`;
    }).join('');
    elOverviewGrid.querySelectorAll('.overview-thumb').forEach((b) => {
      b.addEventListener('click', () => {
        go(parseInt(b.dataset.idx, 10));
        toggleOverview(false);
      });
    });
  }
  function updateOverview() {
    elOverviewGrid.querySelectorAll('.overview-thumb').forEach((b, i) => {
      b.classList.toggle('is-current', i === current);
    });
  }
  function toggleOverview(open) {
    if (open === undefined) open = !elOverview.classList.contains('is-open');
    elOverview.classList.toggle('is-open', open);
  }
  buildOverview();
  updateOverview();

  // ---------- Hash deep-link ----------
  const hash = location.hash.match(/^#\/(\d+)/);
  if (hash) {
    const idx = Math.max(0, Math.min(total - 1, parseInt(hash[1], 10) - 1));
    if (idx !== 0) {
      slides[0].classList.remove('is-active');
      slides[idx].classList.add('is-active');
      current = idx;
      elCur.textContent = idx + 1;
      elProgress.style.width = ((idx + 1) / total * 100) + '%';
    }
  }

  // ---------- Hint auto-hide ----------
  setTimeout(() => elHint.classList.add('is-hidden'), 4500);

  // ---------- Slide 2: pain cards flip on click ----------
  document.querySelectorAll('[data-flip]').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('is-flipped');
    });
  });

  // Pain 2 dot grid — 68 dots, first 8 highlighted
  const dotGrid = document.getElementById('painDotGrid');
  if (dotGrid) {
    let html = '';
    for (let i = 0; i < 68; i++) {
      html += `<span class="dot${i < 8 ? ' dot--never' : ''}"></span>`;
    }
    dotGrid.innerHTML = html;
  }

  // ---------- Slide 8: demo iframe controls ----------
  const demoFrame = document.getElementById('demoFrame');
  document.querySelectorAll('.demo-btn').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.demo-btn').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      if (demoFrame) demoFrame.src = b.dataset.target;
    });
  });

  // ---------- Slide 8: QR code ----------
  const url = 'https://ggoljunsa.github.io/sunhwanso/';
  const qrEl = document.getElementById('qrcode');
  if (qrEl && window.QRCode) {
    try {
      new QRCode(qrEl, {
        text: url,
        width: 140,
        height: 140,
        colorDark: '#2B231B',
        colorLight: '#F6F1EA',
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch (e) {
      qrEl.innerHTML = '<div style="padding:20px;font-size:11px;color:#7D4A32;text-align:center">QR 로딩 실패<br>URL을 직접 입력하세요</div>';
    }
  }
  const qrUrlEl = document.getElementById('qrUrl');
  if (qrUrlEl) qrUrlEl.textContent = url;

})();
