# Social QR Studio

A QR code generator with a different branded card template for Facebook, Instagram, TikTok, and LinkedIn.

## Files

- `index.html` — page structure
- `style.css` — all styling and card templates
- `script.js` — platform switching, QR generation, PNG export

## How to run in VS Code

1. Open this folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it — search "Live Server" in the Extensions panel.
3. Right-click `index.html` in the file explorer and choose **"Open with Live Server"**.
4. Your browser opens the app at something like `http://127.0.0.1:5500`.

No build step, no npm install needed — it's plain HTML/CSS/JS. You can also just double-click `index.html` to open it directly in a browser, though Live Server gives you auto-reload while you edit.

## How it works

- QR codes are generated client-side with the `qrcodejs` library.
- The "Download card" button uses `html2canvas` to export the whole styled card (not just the QR) as a PNG.
- Both libraries load from a CDN in `index.html`, so you'll need an internet connection the first time each session (they're cached by the browser after that).
