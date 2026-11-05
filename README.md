# Dinesh-PP — Merugu Dinesh Kumar's Portfolio

Personal portfolio site. Vanilla HTML/CSS/JS — no framework, no build step.
Live at: dineshmerugu06.github.io/Dinesh-PP (GitHub Pages, `main` branch)

## Pages

| File | What |
|------|------|
| `index.html` | Main portfolio — 9 sections + starburst footer |
| `projects/` | Selected-work page (Nuxt build output, `projects/index.html`) |
| `projects.html` | Redirect to `projects/` |
| `404.html` | Custom 404 page |

## Sections (index.html)

1. **Welcome** (`w-welcome`) — 3D dragon canvas, "Master Your Craft" headline
2. **Transition** (`w-transition`) — Pinned scroll text reveals
3. **Journey** (`s-journey`) — Storm chapter with dialogue
4. **How I Work** — 6-step process cards with images
5. **Interests** — Chess / Anime / AI cards
6. **Showcase** — Project grid
7. **Who I Build For** — Audience section with ripple deck
8. **Ready for Project** (`rfp`) — Liquid-sculpture section, "MOVE ACROSS THE FORM"
9. **Starburst Thanks Footer** (`stf`) — DK monogram, contact links

## Folder Structure

```
├── index.html          # Main page
├── projects.html       # Redirect to projects/
├── 404.html            # Error page
├── assets/
│   ├── css/
│   │   └── main.css    # All styles, design system
│   ├── js/
│   │   ├── main.js         # Lenis smooth scroll, GSAP, cursor, reveals
│   │   ├── sections.js     # Section-specific animations
│   │   ├── hero3d.js       # Three.js dragon hero (ES module)
│   │   ├── storm.js        # Journey storm canvas
│   │   ├── footer.js       # Starburst footer interactions
│   │   ├── rfp-sculpture.js # "Ready for project" liquid sculpture
│   │   ├── liquid-engine.js # Liquid engine
│   │   ├── water-ripple.js / ripple-deck.js # Who I Build For ripple
│   │   ├── interests.js / showcase.js # Interests + showcase
│   │   └── vendor/         # GSAP, ScrollTrigger, Lenis, Three.js (pinned)
│   ├── fonts/          # Space Grotesk, Space Mono, KHTeka (self-hosted)
│   ├── images/
│   │   ├── hiw/        # How I Work step images
│   │   ├── interests/  # Interest card images
│   │   ├── projects/   # Project card images
│   │   └── sculpture/  # Ready-for-project sculpture images
│   ├── models/
│   │   └── dragon.glb  # Hero 3D dragon (14 MB)
│   └── videos/
│       ├── projects-link.mp4  # Hero video card
│       └── projects/   # Project popup videos (02/03/05/06)
└── projects/           # Selected-work page (Nuxt output, do not hand-edit)
    ├── index.html
    ├── _nuxt/          # Nuxt chunks — all used, incl. dynamic imports
    ├── _payload.json
    └── dato-local.json
```

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
- Cleaned 2026-11-05: 164 unreferenced files removed (19.3 MB) — old Dinesh_1 leftovers, duplicate generated images, generation metadata, dead `ready-particles.js`, stale study doc. 235 files / 65 MB → 71 files / 46 MB. History (`.git`, 148 MB) still holds deleted large files; shrinking that needs a fresh single-commit repo, not done here.
