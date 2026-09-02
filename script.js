'use strict';

/**
 * Social QR Studio
 * Renders a branded profile card + QR code per platform, and exports it as PNG.
 */

// ---------------------------------------------------------------------------
// Platform definitions — official brand colors + accurate logo marks
// (path data follows each platform's public brand guidelines / Simple Icons)
// ---------------------------------------------------------------------------
const PLATFORMS = {
  facebook: {
    label: 'Facebook',
    class: 'facebook',
    qrDark: '#0A3A8C',   // dark enough for reliable scanning against white
    brand: '#1877F2',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  instagram: {
    label: 'Instagram',
    class: 'instagram',
    qrDark: '#6b2a86',
    brand: '#C13584',
    path: 'M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.013 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.897 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.897 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.86.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.165 1.05-.36 2.221-.42 1.274-.045 1.649-.06 4.859-.06zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z'
  },
  tiktok: {
    label: 'TikTok',
    class: 'tiktok',
    qrDark: '#0B0B0C',
    brand: '#FE2C55',
    path: 'M16.6 5.82c-1.14-1-1.86-2.44-1.94-4.03h-3.4v13.94c0 1.66-1.35 3.02-3.02 3.02a3.02 3.02 0 0 1-1.31-5.74 2.98 2.98 0 0 1 1.31-.3c.31 0 .61.04.9.12v-3.46a6.5 6.5 0 0 0-.9-.06 6.44 6.44 0 0 0-6.44 6.44A6.44 6.44 0 0 0 8.24 22.1a6.44 6.44 0 0 0 6.44-6.44V9.01a9.32 9.32 0 0 0 5.45 1.75V7.35a5.87 5.87 0 0 1-3.53-1.53z'
  },
  linkedin: {
    label: 'LinkedIn',
    class: 'linkedin',
    qrDark: '#00335C',
    brand: '#0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  }
};

const PLATFORM_KEYS = Object.keys(PLATFORMS);

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------
const grid = document.getElementById('platformGrid');
const nameInput = document.getElementById('nameInput');
const userInput = document.getElementById('userInput');
const linkInput = document.getElementById('linkInput');
const downloadBtn = document.getElementById('downloadBtn');
const card = document.getElementById('card');
const emptyNote = document.getElementById('emptyNote');
const badgeIcon = document.getElementById('badgeIcon');
const badgeWord = document.getElementById('badgeWord');
const cardName = document.getElementById('cardName');
const cardHandle = document.getElementById('cardHandle');
const cardLink = document.getElementById('cardLink');
const qrHolder = document.getElementById('qr-canvas-holder');

let currentKey = 'instagram';
let qrInstance = null;

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------
function iconSvg(path, fill) {
  return `<svg viewBox="0 0 24 24" fill="${fill}" aria-hidden="true"><path d="${path}"/></svg>`;
}

// ---------------------------------------------------------------------------
// Build the platform tablist (roving tabindex, arrow-key navigable)
// ---------------------------------------------------------------------------
function buildPlatformTabs() {
  PLATFORM_KEYS.forEach((key, index) => {
    const p = PLATFORMS[key];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'platform-btn';
    btn.dataset.p = key;
    btn.id = `tab-${key}`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', key === currentKey ? 'true' : 'false');
    btn.setAttribute('aria-controls', 'card');
    btn.tabIndex = key === currentKey ? 0 : -1;
    btn.innerHTML = `${iconSvg(p.path, 'currentColor')}<span>${p.label}</span>`;

    btn.addEventListener('click', () => selectPlatform(key));
    btn.addEventListener('keydown', (e) => {
      const i = PLATFORM_KEYS.indexOf(key);
      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIndex = (i + 1) % PLATFORM_KEYS.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIndex = (i - 1 + PLATFORM_KEYS.length) % PLATFORM_KEYS.length;
      if (nextIndex !== null) {
        e.preventDefault();
        const nextKey = PLATFORM_KEYS[nextIndex];
        selectPlatform(nextKey);
        document.getElementById(`tab-${nextKey}`).focus();
      }
    });

    grid.appendChild(btn);
  });
  updateActiveTabStyles();
}

function selectPlatform(key) {
  currentKey = key;
  document.querySelectorAll('.platform-btn').forEach((b) => {
    const isActive = b.dataset.p === key;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    b.tabIndex = isActive ? 0 : -1;
  });
  render();
}

function updateActiveTabStyles() {
  document.querySelectorAll('.platform-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.p === currentKey);
  });
}

// ---------------------------------------------------------------------------
// URL handling
// ---------------------------------------------------------------------------
function normalizeUrl(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).toString();
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// Debounce
// ---------------------------------------------------------------------------
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
function render() {
  const p = PLATFORMS[currentKey];
  card.className = `card ${p.class}`;

  badgeIcon.innerHTML = iconSvg(p.path, '#ffffff');
  badgeWord.textContent = p.label;

  const name = nameInput.value.trim() || 'Your name';
  const user = userInput.value.trim().replace(/^@/, '') || 'yourusername';
  const validUrl = normalizeUrl(linkInput.value);

  cardName.textContent = name;
  cardHandle.textContent = `@${user}`;
  cardLink.textContent = validUrl || 'Add a profile link to generate';

  qrHolder.innerHTML = '';

  if (validUrl) {
    emptyNote.style.display = 'none';
    linkInput.setCustomValidity('');
    qrInstance = new QRCode(qrHolder, {
      text: validUrl,
      width: 176,
      height: 176,
      colorDark: p.qrDark,
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
    downloadBtn.disabled = false;
  } else {
    emptyNote.style.display = 'flex';
    downloadBtn.disabled = true;
    if (linkInput.value.trim()) {
      linkInput.setCustomValidity('Enter a valid URL, e.g. https://instagram.com/yourname');
    } else {
      linkInput.setCustomValidity('');
    }
  }
}

const debouncedRender = debounce(render, 150);
[nameInput, userInput, linkInput].forEach((el) => el.addEventListener('input', debouncedRender));

// ---------------------------------------------------------------------------
// Export as PNG
// ---------------------------------------------------------------------------
downloadBtn.addEventListener('click', async () => {
  if (downloadBtn.disabled) return;

  const originalLabel = downloadBtn.textContent;
  downloadBtn.disabled = true;
  downloadBtn.textContent = 'Preparing…';
  emptyNote.style.display = 'none';

  try {
    const canvas = await html2canvas(card, { scale: 3, backgroundColor: null });
    const platformLabel = PLATFORMS[currentKey].label.toLowerCase();
    const userPart = (userInput.value.trim() || 'profile').replace(/[^a-z0-9_-]/gi, '') || 'profile';

    const a = document.createElement('a');
    a.download = `${platformLabel}-qr-${userPart}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  } catch (err) {
    console.error('Card export failed:', err);
    window.alert('Something went wrong generating the image. Please try again.');
  } finally {
    downloadBtn.textContent = originalLabel;
    downloadBtn.disabled = false;
  }
});

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
buildPlatformTabs();
render();