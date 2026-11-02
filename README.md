# Dinesh-PP — Merugu Dinesh Kumar's Portfolio

Personal portfolio site. Vanilla HTML/CSS/JS — no framework, no build step.
Live at: dineshmerugu06.github.io/Dinesh-PP (GitHub Pages, `master` branch)

## Pages

| File | What |
|------|------|
| `index.html` | Main portfolio — 8 sections (see below) |
| `projects.html` | Skill Hub — project showcase page |
| `404.html` | Custom 404 page |

## Sections (index.html)

1. **Hero** (`w-welcome`) — 3D dragon canvas, "Master Your Craft" headline
2. **Transition** (`w-transition`) — Pinned scroll text reveals
3. **Journey** (`s-journey`) — Storm chapter with dialogue
4. **Tree** (`w-tree`) — Waterfall canvases, string line
5. **Techniques** (`w-tech`) — 5 skill cards
6. **Arsenal** (`w-masonry`) — Project grid
7. **Who I Build For** (`w-for`) — Audience section
8. **Clarity** (`w-clarity`) — "Code with clarity" + particle "Ready for project" text

## Folder Structure

```
├── index.html          # Main page
├── projects.html       # Skill Hub page
├── 404.html            # Error page
├── assets/
│   ├── css/
│   │   └── main.css    # All styles, design system
│   ├── js/
│   │   ├── main.js         # Lenis smooth scroll, GSAP, cursor, reveals
│   │   ├── sections.js     # Section-specific animations
│   │   ├── hero3d.js       # Three.js dragon hero (ES module)
│   │   ├── inkwash.js      # Ink wash effects
│   │   ├── storm.js        # Journey storm canvas
│   │   ├── footer.js       # Starburst footer interactions
│   │   ├── ready-particles.js  # "Ready for project" particle text
│   │   └── vendor/         # GSAP, ScrollTrigger, Lenis, Three.js (pinned)
│   ├── fonts/          # Space Grotesk, Space Mono, KHTeka (self-hosted)
│   ├── images/
│   │   └── icons/      # Technique card icons (SVG)
│   ├── models/
│   │   └── dragon.glb  # Hero 3D dragon
│   └── videos/
│       └── skill-hub-link.mp4  # Hero video card
└── images/             # Assets for projects.html page
```

## Run Locally

Any static server. No build step, no dependencies to install.

```bash
cd dinesh-pp
python3 -m http.server 8000
# Open http://localhost:8000
```

## Deploy

Push to `main` branch → auto-deploys to GitHub Pages from `master`:

```bash
git push origin main:master
```

GitHub Pages serves the `master` branch. Local branch is `main`.

## Notes

- All commits must use: `dineshmerugu06 <dinesh.merugu.kumar@gmail.com>`
- Fonts are self-hosted (no Google Fonts requests)
- Vendor JS is self-hosted and pinned (no CDN)
