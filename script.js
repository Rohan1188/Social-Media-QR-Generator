'use strict';

/**
 * Social QR Studio
 * Renders a branded profile/link card + QR code per platform, and exports it as PNG.
 */

// ---------------------------------------------------------------------------
// Platform definitions — official brand colors + accurate logo marks
// (path data follows each platform's public brand guidelines / Simple Icons)
// ---------------------------------------------------------------------------
const PLATFORMS = {
  facebook: {
    label: 'Facebook',
    class: 'facebook',
    qrDark: '#0A3A8C',
    brand: '#1877F2',
    viewBox: '0 0 24 24',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  instagram: {
    label: 'Instagram',
    class: 'instagram',
    qrDark: '#6b2a86',
    brand: '#C13584',
    viewBox: '0 0 24 24',
    path: 'M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.013 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.897 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.897 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.86.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.165 1.05-.36 2.221-.42 1.274-.045 1.649-.06 4.859-.06zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z'
  },
  tiktok: {
    label: 'TikTok',
    class: 'tiktok',
    qrDark: '#0B0B0C',
    brand: '#FE2C55',
    viewBox: '0 0 24 24',
    path: 'M16.6 5.82c-1.14-1-1.86-2.44-1.94-4.03h-3.4v13.94c0 1.66-1.35 3.02-3.02 3.02a3.02 3.02 0 0 1-1.31-5.74 2.98 2.98 0 0 1 1.31-.3c.31 0 .61.04.9.12v-3.46a6.5 6.5 0 0 0-.9-.06 6.44 6.44 0 0 0-6.44 6.44A6.44 6.44 0 0 0 8.24 22.1a6.44 6.44 0 0 0 6.44-6.44V9.01a9.32 9.32 0 0 0 5.45 1.75V7.35a5.87 5.87 0 0 1-3.53-1.53z'
  },
  linkedin: {
    label: 'LinkedIn',
    class: 'linkedin',
    qrDark: '#00335C',
    brand: '#0A66C2',
    viewBox: '0 0 24 24',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  google: {
    label: 'Google',
    class: 'google',
    qrDark: '#3C4043',
    brand: '#4285F4',
    isGoogle: true // rendered with its own multicolor mark, not a single-fill path
  }
};

const PLATFORM_KEYS = Object.keys(PLATFORMS);

// Google's real four-color "G" mark
const GOOGLE_G_SVG = `
<svg viewBox="0 0 48 48" aria-hidden="true">
  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
  <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
</svg>`.trim();

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------
const grid = document.getElementById('platformGrid');
const linkTypeGroup = document.getElementById('linkTypeGroup');
const linkTypeToggle = document.getElementById('linkTypeToggle');
const usernameField = document.getElementById('usernameField');
const linkLabel = document.getElementById('linkLabel');
const nameInput = document.getElementById('nameInput');
const userInput = document.getElementById('userInput');
const linkInput = document.getElementById('linkInput');
const downloadBtn = document.getElementById('downloadBtn');
const card = document.getElementById('card');
const emptyNote = document.getElementById('emptyNote');
const badgeIcon = document.getElementById('badgeIcon');
const badgeWord = document.getElementById('badgeWord');
const typePill = document.getElementById('typePill');
const cardName = document.getElementById('cardName');
const cardHandle = document.getElementById('cardHandle');
const cardLink = document.getElementById('cardLink');
const qrHolder = document.getElementById('qr-canvas-holder');

let currentKey = 'instagram';
let linkType = 'website'; // 'website' | 'app' — only meaningful for Google

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------
function iconSvg(path, viewBox, fill) {
  return `<svg viewBox="${viewBox}" fill="${fill}" aria-hidden="true"><path d="${path}"/></svg>`;
}

function platformIconMarkup(key, fillOverride) {
  const p = PLATFORMS[key];
  if (p.isGoogle) return GOOGLE_G_SVG;
  return iconSvg(p.path, p.viewBox, fillOverride);
}

// ---------------------------------------------------------------------------
// Build the platform tablist (roving tabindex, arrow-key navigable)
// ---------------------------------------------------------------------------
function buildPlatformTabs() {
  PLATFORM_KEYS.forEach((key) => {
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
    btn.innerHTML = `${platformIconMarkup(key, 'currentColor')}<span>${p.label}</span>`;

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
}

function selectPlatform(key) {
  currentKey = key;
  document.querySelectorAll('.platform-btn').forEach((b) => {
    const isActive = b.dataset.p === key;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    b.tabIndex = isActive ? 0 : -1;
  });

  const isGoogle = PLATFORMS[key].isGoogle === true;
  linkTypeGroup.classList.toggle('hidden', !isGoogle);
  usernameField.classList.toggle('hidden', isGoogle && linkType === 'app');

  render();
}

// ---------------------------------------------------------------------------
// Website / App segmented toggle (Google only)
// ---------------------------------------------------------------------------
linkTypeToggle.addEventListener('click', (e) => {
  const btn = e.target.closest('.seg-btn');
  if (!btn) return;
  linkType = btn.dataset.type;
  linkTypeToggle.querySelectorAll('.seg-btn').forEach((b) => {
    const isActive = b === btn;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  usernameField.classList.toggle('hidden', linkType === 'app');
  render();
});

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
  const isGoogle = p.isGoogle === true;
  card.className = `card ${p.class}`;

  badgeIcon.innerHTML = platformIconMarkup(currentKey, '#ffffff');

  if (isGoogle) {
    badgeWord.textContent = linkType === 'app' ? 'Google Play' : 'Google';
    typePill.textContent = linkType === 'app' ? 'App' : 'Website';
    typePill.classList.remove('hidden');
    linkLabel.textContent = linkType === 'app' ? 'App store link' : 'Website link';
    linkInput.placeholder = linkType === 'app'
      ? 'https://play.google.com/store/apps/details?id=com.example.app'
      : 'https://example.com';
  } else {
    badgeWord.textContent = p.label;
    typePill.classList.add('hidden');
    linkLabel.textContent = 'Profile link';
    linkInput.placeholder = `https://${currentKey}.com/yourname`;
  }

  const name = nameInput.value.trim() || 'Your name';
  const showUsername = !(isGoogle && linkType === 'app');
  const user = userInput.value.trim().replace(/^@/, '') || 'yourusername';
  const validUrl = normalizeUrl(linkInput.value);

  cardName.textContent = name;
  cardHandle.textContent = showUsername ? `@${user}` : '';
  cardHandle.style.display = showUsername ? '' : 'none';
  cardLink.textContent = validUrl || (isGoogle && linkType === 'app'
    ? 'Add an app store link to generate'
    : 'Add a link to generate');

  qrHolder.innerHTML = '';

  if (validUrl) {
    emptyNote.style.display = 'none';
    linkInput.setCustomValidity('');
    // eslint-disable-next-line no-new
    new QRCode(qrHolder, {
      text: validUrl,
      width: 176,
      height: 176,
      colorDark: p.qrDark,
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
    downloadBtn.disabled = false;
  } else {
    emptyNote.textContent = isGoogle && linkType === 'app'
      ? 'Add an app store link on the left to generate the QR code'
      : 'Add a link on the left to generate the QR code';
    emptyNote.style.display = 'flex';
    downloadBtn.disabled = true;
    linkInput.setCustomValidity(linkInput.value.trim() ? 'Enter a valid URL, e.g. https://example.com' : '');
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
    const platformLabel = PLATFORMS[currentKey].label.toLowerCase().replace(/\s+/g, '-');
    const typeSuffix = PLATFORMS[currentKey].isGoogle ? `-${linkType}` : '';
    const userPart = (userInput.value.trim() || 'link').replace(/[^a-z0-9_-]/gi, '') || 'link';

    const a = document.createElement('a');
    a.download = `${platformLabel}${typeSuffix}-qr-${userPart}.png`;
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
// Mode switching (QR Generator ↔ Post Mockup)
// ---------------------------------------------------------------------------
const modeTabs = document.querySelectorAll('.mode-tab');
const qrModeSection = document.getElementById('qrMode');
const postModeSection = document.getElementById('postMode');

modeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.mode;
    modeTabs.forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    qrModeSection.classList.toggle('hidden', mode !== 'qr');
    postModeSection.classList.toggle('hidden', mode !== 'post');
  });
});

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
buildPlatformTabs();
selectPlatform(currentKey);
initPostMockup();

/* =============================================================================
   POST MOCKUP MODULE
   Renders a platform-styled post (Facebook / Instagram / LinkedIn / TikTok)
   with an uploaded avatar, caption, optional photo, and editable engagement
   counts. Every export carries a permanent "preview" watermark — this tool is
   for mockups, demos, and content planning, not for producing convincing
   fake screenshots.
   ============================================================================= */

const POST_PLATFORM_KEYS = ['facebook', 'instagram', 'linkedin', 'tiktok'];

function initPostMockup() {
  // ---- DOM refs -------------------------------------------------------
  const postPlatformGrid = document.getElementById('postPlatformGrid');
  const postAvatarInput = document.getElementById('postAvatarInput');
  const removeAvatarBtn = document.getElementById('removeAvatarBtn');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarInitial = document.getElementById('avatarInitial');
  const postNameInput = document.getElementById('postNameInput');
  const postUserInput = document.getElementById('postUserInput');
  const postUsernameField = document.getElementById('postUsernameField');
  const postCaptionInput = document.getElementById('postCaptionInput');
  const postImageInput = document.getElementById('postImageInput');
  const removePostImageBtn = document.getElementById('removePostImageBtn');
  const likesInput = document.getElementById('likesInput');
  const commentsInput = document.getElementById('commentsInput');
  const sharesInput = document.getElementById('sharesInput');
  const downloadPostBtn = document.getElementById('downloadPostBtn');

  // feed-style card (fb / instagram / linkedin)
  const postCard = document.getElementById('postCard');
  const postCardAvatar = document.getElementById('postCardAvatar');
  const postCardInitial = document.getElementById('postCardInitial');
  const postCardName = document.getElementById('postCardName');
  const postCardSub = document.getElementById('postCardSub');
  const postCardCaption = document.getElementById('postCardCaption');
  const postCardImageWrap = document.getElementById('postCardImageWrap');
  const postCardImage = document.getElementById('postCardImage');
  const engagementSummary = document.getElementById('engagementSummary');
  const igCommentsLink = document.getElementById('igCommentsLink');

  // reel card (tiktok)
  const reelCard = document.getElementById('reelCard');
  const reelImageWrap = document.getElementById('reelImageWrap');
  const reelImage = document.getElementById('reelImage');
  const reelAvatar = document.getElementById('reelAvatar');
  const reelInitial = document.getElementById('reelInitial');
  const reelName = document.getElementById('reelName');
  const reelCaption = document.getElementById('reelCaption');
  const reelLikes = document.getElementById('reelLikes');
  const reelComments = document.getElementById('reelComments');
  const reelShares = document.getElementById('reelShares');

  let postPlatform = 'facebook';
  let avatarDataUrl = '';
  let postImageDataUrl = '';

  // ---- number formatting (matches how each platform actually renders counts) ----
  function formatCompact(n) {
    const num = Math.max(0, Math.floor(Number(n) || 0));
    if (num >= 1_000_000) return `${trimZero((num / 1_000_000).toFixed(1))}M`;
    if (num >= 1_000) return `${trimZero((num / 1_000).toFixed(1))}K`;
    return String(num);
  }
  function trimZero(str) {
    return str.endsWith('.0') ? str.slice(0, -2) : str;
  }
  function formatExact(n) {
    const num = Math.max(0, Math.floor(Number(n) || 0));
    return num.toLocaleString('en-US');
  }
  // Instagram shows exact counts up to 10k, then abbreviates like everyone else
  function formatInstagramLikes(n) {
    const num = Math.max(0, Math.floor(Number(n) || 0));
    return num < 10_000 ? formatExact(num) : formatCompact(num);
  }

  // ---- platform tabs (reuses the same PLATFORMS icon defs from the QR module) ----
  function buildPostPlatformTabs() {
    POST_PLATFORM_KEYS.forEach((key) => {
      const p = PLATFORMS[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'platform-btn';
      btn.dataset.p = key;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', key === postPlatform ? 'true' : 'false');
      btn.tabIndex = key === postPlatform ? 0 : -1;
      btn.innerHTML = `${platformIconMarkup(key, 'currentColor')}<span>${p.label}</span>`;
      btn.addEventListener('click', () => {
        postPlatform = key;
        document.querySelectorAll('#postPlatformGrid .platform-btn').forEach((b) => {
          const isActive = b.dataset.p === key;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          b.tabIndex = isActive ? 0 : -1;
        });
        renderPost();
      });
      postPlatformGrid.appendChild(btn);
    });
    const firstBtn = postPlatformGrid.querySelector('.platform-btn');
    if (firstBtn) firstBtn.classList.add('active');
  }

  // ---- avatar upload ----------------------------------------------------
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  postAvatarInput.addEventListener('change', async () => {
    const file = postAvatarInput.files && postAvatarInput.files[0];
    if (!file) return;
    avatarDataUrl = await readFileAsDataUrl(file);
    removeAvatarBtn.classList.remove('hidden');
    renderPost();
  });

  removeAvatarBtn.addEventListener('click', () => {
    avatarDataUrl = '';
    postAvatarInput.value = '';
    removeAvatarBtn.classList.add('hidden');
    renderPost();
  });

  postImageInput.addEventListener('change', async () => {
    const file = postImageInput.files && postImageInput.files[0];
    if (!file) return;
    postImageDataUrl = await readFileAsDataUrl(file);
    removePostImageBtn.classList.remove('hidden');
    renderPost();
  });

  removePostImageBtn.addEventListener('click', () => {
    postImageDataUrl = '';
    postImageInput.value = '';
    removePostImageBtn.classList.add('hidden');
    renderPost();
  });

  // ---- render -------------------------------------------------------
  function renderPost() {
    const isTikTok = postPlatform === 'tiktok';
    postCard.classList.toggle('hidden', isTikTok);
    reelCard.classList.toggle('hidden', !isTikTok);

    const name = postNameInput.value.trim() || 'Your name';
    const user = postUserInput.value.trim().replace(/^@/, '') || 'yourusername';
    const caption = postCaptionInput.value.trim() || 'Write a caption on the left to see it appear here.';
    const initial = name.trim().charAt(0).toUpperCase() || 'Y';

    const likes = likesInput.value;
    const comments = commentsInput.value;
    const shares = sharesInput.value;

    // avatar preview thumbnail (controls panel)
    avatarInitial.textContent = initial;
    if (avatarDataUrl) {
      avatarPreview.style.backgroundImage = `url(${avatarDataUrl})`;
      avatarPreview.style.backgroundSize = 'cover';
      avatarPreview.style.backgroundPosition = 'center';
      avatarInitial.classList.add('hidden');
    } else {
      avatarPreview.style.backgroundImage = '';
      avatarInitial.classList.remove('hidden');
    }

    if (!isTikTok) {
      postCard.dataset.platform = postPlatform;
      postCardName.textContent = name;
      postCardCaption.textContent = caption;

      postUsernameField.classList.remove('hidden');

      if (postPlatform === 'instagram') {
        postCardSub.textContent = ''; // IG shows handle in header instead of name for this compact layout
        postCardName.textContent = user;
      } else if (postPlatform === 'linkedin') {
        postCardSub.textContent = 'Just now';
      } else {
        postCardSub.textContent = 'Just now · Public';
      }

      renderAvatarInto(postCardAvatar, postCardInitial, initial);

      if (postImageDataUrl) {
        postCardImage.src = postImageDataUrl;
        postCardImageWrap.classList.remove('hidden');
      } else {
        postCardImageWrap.classList.add('hidden');
      }

      if (postPlatform === 'instagram') {
        engagementSummary.textContent = `${formatInstagramLikes(likes)} likes`;
        igCommentsLink.textContent = `View all ${formatCompact(comments)} comments`;
        igCommentsLink.style.display = '';
      } else if (postPlatform === 'linkedin') {
        engagementSummary.textContent = `👍 💡 ${formatExact(likes)} · ${formatExact(comments)} comments · ${formatExact(shares)} reposts`;
        igCommentsLink.style.display = 'none';
      } else {
        engagementSummary.textContent = `👍 ❤️ ${formatCompact(likes)} · ${formatCompact(comments)} comments · ${formatCompact(shares)} shares`;
        igCommentsLink.style.display = 'none';
      }
    } else {
      postUsernameField.classList.remove('hidden');
      reelName.textContent = `@${user}`;
      reelCaption.textContent = caption;
      reelLikes.textContent = formatCompact(likes);
      reelComments.textContent = formatCompact(comments);
      reelShares.textContent = formatCompact(shares);

      renderAvatarInto(reelAvatar, reelInitial, initial);

      if (postImageDataUrl) {
        reelImage.src = postImageDataUrl;
        reelImage.classList.remove('hidden');
      } else {
        reelImage.removeAttribute('src');
        reelImage.classList.add('hidden');
      }
    }
  }

  // Renders either the uploaded avatar image or a text initial into a
  // container that holds a <span> initial (image is created on demand).
  function renderAvatarInto(container, initialEl, initial) {
    let img = container.querySelector('img');
    if (avatarDataUrl) {
      if (!img) {
        img = document.createElement('img');
        img.alt = '';
        container.insertBefore(img, initialEl);
      }
      img.src = avatarDataUrl;
      initialEl.classList.add('hidden');
    } else {
      if (img) img.remove();
      initialEl.textContent = initial;
      initialEl.classList.remove('hidden');
    }
  }

  const debouncedRenderPost = debounce(renderPost, 150);
  [postNameInput, postUserInput, postCaptionInput, likesInput, commentsInput, sharesInput]
    .forEach((el) => el.addEventListener('input', debouncedRenderPost));

  // ---- export -------------------------------------------------------
  downloadPostBtn.addEventListener('click', async () => {
    const originalLabel = downloadPostBtn.textContent;
    downloadPostBtn.disabled = true;
    downloadPostBtn.textContent = 'Preparing…';

    try {
      const target = postPlatform === 'tiktok' ? reelCard : postCard;
      const canvas = await html2canvas(target, { scale: 3, backgroundColor: null });
      const userPart = (postUserInput.value.trim() || 'post').replace(/[^a-z0-9_-]/gi, '') || 'post';
      const a = document.createElement('a');
      a.download = `${postPlatform}-post-mockup-${userPart}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch (err) {
      console.error('Post export failed:', err);
      window.alert('Something went wrong generating the image. Please try again.');
    } finally {
      downloadPostBtn.textContent = originalLabel;
      downloadPostBtn.disabled = false;
    }
  });

  buildPostPlatformTabs();
  renderPost();
}
