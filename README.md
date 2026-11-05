# Dinesh-PP — Merugu Dinesh Kumar's Portfolio

Personal portfolio site. Vanilla HTML/CSS/JS — no framework, no build step, no backend, no React.
Live at: dineshmerugu06.github.io/Dinesh-PP (GitHub Pages, `main` branch)

## How to read this repo (beginner map)

- `index.html` — just a redirect. GitHub Pages needs an index at the root, so this file sends you to the real landing page.
- `frontend/` — the whole website lives here.
  - `frontend/html/landing-page.html` — the landing page (all 9 sections + footer).
  - `frontend/css/landing-page.css` — all styles for the landing page.
  - `frontend/js/` — landing page scripts, one file per job: `landing-page.js` (scroll, cursor, reveals), `hero3d.js` (3D dragon hero), `sections.js`, `storm.js`, `footer.js`, `rfp-sculpture.js`, `liquid-engine.js`, `water-ripple.js`, `ripple-deck.js`, `interests.js`, `showcase.js`, plus `vendor/` (GSAP, Lenis, Three.js — pinned, do not edit).
  - `frontend/assets/` — `images/` (how-I-work, interests, projects, sculpture), `fonts/` (self-hosted), `models/dragon.glb` (hero dragon), `videos/` (hero video + project videos).
- `projects/` — the Selected Work page (Nuxt build output: `index.html`, `_nuxt/`, `_payload.json`, `dato-local.json`). Do not hand-edit; it is generated output.
- `projects.html` — redirect to `projects/`.
- `404.html` — custom 404 page.

## Pages

| Page | File |
|------|------|
| Landing page | `frontend/html/landing-page.html` |
| Selected Work | `projects/index.html` |

## Sections (landing page)

1. **Welcome** — 3D dragon canvas, "Master Your Craft" headline
2. **Transition** — Pinned scroll text reveals
3. **Journey** — Storm chapter with dialogue
4. **How I Work** — 6-step process cards with images
5. **Interests** — Chess / Anime / AI cards
6. **Showcase** — Project grid
7. **Who I Build For** — Audience section with ripple deck
8. **Ready for Project** — Liquid-sculpture section, "MOVE ACROSS THE FORM"
9. **Starburst Thanks Footer** — DK monogram, contact links

## Run Locally

Any static server. No build step, no dependencies to install.

```bash
cd dinesh-pp
python3 -m http.server 8000
# Open http://localhost:8000
```

## Deploy

Push to `main` → GitHub Pages deploys from `main` automatically.

```bash
git push origin main
```

## Notes

- All commits must use: `dineshmerugu06 <dinesh.merugu.kumar@gmail.com>`
- Fonts: Space Grotesk / Space Mono / KHTeka are self-hosted; Archivo Black, Inter, Instrument Serif and Pinyon Script load from Google Fonts (linked in `<head>` with preconnect).
- Vendor JS is self-hosted and pinned (no CDN).
- Below-fold images use `loading="lazy"`. The hero dragon (`dragon.glb`, 14 MB) and hero video are the first-load weight — the hero is off-limits, do not touch it without an explicit order.
- Restructured 2026-11-05: everything moved under `frontend/` (html / css / js / assets), files named by page (`landing-page.html`, `landing-page.css`, `landing-page.js`). Only paths changed — no UI, animation, scroll or content change. Root `index.html` is a redirect because GitHub Pages needs an index at the root. No backend / React / signup in this site, so no `backend/` or `react/` folders.
- Cleaned 2026-11-05: 164 unreferenced files removed (19.3 MB). History (`.git`, 148 MB) still holds deleted large files; shrinking that needs a fresh single-commit repo, not done here.
