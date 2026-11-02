# Dinesh-PP — Codebase Study

Date: 2026-11-02. Repo: `github.com/dineshmerugu06/Dinesh-PP` (local: `~/workspace/dinesh-pp`).
Vanilla HTML/CSS/JS portfolio — no framework, no build step. Static server runs it (`python3 -m http.server`).

> Note: commit `fd5799a` ("Repo clean", 2026-11-02) landed mid-study. This doc reflects the post-clean state (137 files, ~119 MB). Pre-clean had 176 files / ~121 MB including a `code/` dir of Nuxt chunks.

## 1. Deploy setup (GitHub Pages)

- **Pages source: `master` branch, path `/`** (verified via `gh api repos/dineshmerugu06/Dinesh-PP/pages`). Live at `dineshmerugu06.github.io/Dinesh-PP/`.
- Local branch is `main`; deploys via `git push origin main:master`. Remote also has `origin/master`.
- `.nojekyll` present (repo root). No CNAME. No `.github/workflows`.
- Commit identity rule (standing): commits must be as `dineshmerugu06 <dinesh.merugu.kumar@gmail.com>` — Vercel/CI rejects `ZERO <zero@local>`; same hygiene applies here.

## 2. File tree (post-clean)

```
├── index.html                  # main page, 8 sections + footer (~250 lines)
├── projects.html               # "Skill Hub" project showcase (127 KB, from Dinesh_1)
├── 404.html                    # 87 KB — actually Dinesh_1's 404 (refs /Dinesh_1/favicons/)
├── README.md                   # updated 2026-11-02, accurate
├── .nojekyll
└── assets/
    ├── css/main.css             # 1244 lines, all styles
    ├── js/
    │   ├── main.js              # 540 lines — motion core (Lenis+GSAP), cursor, reveals
    │   ├── sections.js          # 175 lines — welcome/transition/tree choreography
    │   ├── hero3d.js            # 91 lines — three.js dragon (ES module)
    │   ├── inkwash.js           # 66 lines — NOT loaded (dead file, targets missing #inkwash)
    │   ├── storm.js             # 103 lines — journey storm canvas 2D
    │   ├── footer.js            # 321 lines — starburst thanks footer
    │   ├── ready-particles.js   # 154 lines — "Ready for project" 2D particle text
    │   └── vendor/              # gsap.min.js, ScrollTrigger.min.js, lenis.min.js,
    │                           # three.module.js + addons (GLTFLoader, RoomEnvironment, BufferGeometryUtils)
    ├── fonts/                   # Space Grotesk (400/500/700), Space Mono (400/700), KHTeka, KHTekaMono — all woff2, all used
    ├── images/icons/            # 5x icon-48_*.svg (techniques cards)
    ├── models/dragon.glb        # 14 MB — hero dragon (Merugu's own asset)
    └── videos/skill-hub-link.mp4 # 638 KB — hero Skill Hub card video
└── images/                      # Dinesh_1 leftovers: characters/, home-page/, icons/, skill-demos/ (~9.6 MB)
```

Removed by `fd5799a`: `code/` (29 Nuxt chunks), `assets/images/home/` (cloud.jpg, flashing-circle.png, string-tune-mask.svg), `assets/images/sculpture.webp`, `assets/js/liquid-engine.js`, `liquid-hero.js`, `liquid-clarity.js`, `particle-text.js`.

## 3. index.html sections

| # | Section | Class / id | Content | Driven by |
|---|---------|-----------|---------|-----------|
| 0 | Header | `header.hud-top` | Brand `DineshKumar®`, pills nav (About/Skills/Skill Hub/Start a Project), `%` readout | main.js (scroll progress → `.pct .n`, `.topbar span`) |
| 1 | Hero | `section.w-welcome` `#top` | `#dragon-canvas`, `V_ 2026`, "Master Your Craft" headline, Skill Hub video card (`skill-hub-link.mp4`), giant "Dinesh Kumar", subs "FOR WEBSITES THAT FEEL ALIVE" / "FAST. SHARP. VERIFIED." | hero3d.js (dragon.glb), sections.js (intro), main.js (magnetic) |
| 2 | Transition | `section.w-transition` | Pinned staged text reveals (`data-split`): "Focus" / "Keep Scrolling" / "The Craft Awakened"; `.t-progress` bar | sections.js (`splitChars`), GSAP ScrollTrigger pin |
| 3 | Journey | `section.s-journey` | `#storm` canvas, `#scramble` "THE JOURNEY", dialogue box (`#dlg-line`, `#dlg-bar`, `#dlg-skip`), outro "CRAFT WITH INTENT, NOT TEMPLATES." | storm.js (canvas), main.js (`scrambleTo`, skip) |
| 4 | Tree | `section.w-tree` | `#fallsBack` / `#fallsFront` waterfall canvases, staged text, SVG `#stringPath` + tagline "Craft with intent, not templates." | sections.js (`makeFalls`, `strTick`) |
| 5 | Techniques | `section.w-tech` `#techniques` | 5 `t-card`s: Scroll Choreography, 3D Integration, Motion Systems, Responsive Craft, Performance First (each with icon-48 SVG) | main.js (`data-reveal`) |
| 6 | Arsenal | `section.w-masonry` `#arsenal` | `m-grid` tiles: GSAP, Lenis, Three.js, ScrollTrigger, Canvas 2D, SVG, Type, GLB | main.js (`data-reveal`) |
| 7 | Who I Build For | `section.w-for` `#for` | 3 `f-card`s: Founders / Designers / Developers | main.js (`data-reveal`) |
| 8 | Clarity | `section.w-clarity` `#clarity` | "Code with *clarity.*" left; `#readyParticles` canvas right ("Ready for project" particle text); 4 numbered items grid | ready-particles.js |
| 9 | Footer | `footer.stf` `#contact` | Starburst Thanks Footer: DK monogram, THANK YOU + pen loop, starburst pop (7 languages), contact pills (GitHub, LinkedIn, email copy, phone dial `+91 93983 59538`) | footer.js |

Global chrome: `.loader`, `.cursor` + `.cursor-ring` (custom cursor), `.grain`, `.topbar`. Import map maps `three` → vendored `three.module.js`.

## 4. JS files — what each does

- **main.js** (540L): Lenis smooth scroll + GSAP ScrollTrigger core; custom cursor + magnetic buttons; scroll progress readouts; journey dialogue scramble (`#scramble`, `#dlg-line/bar/skip`); `data-reveal` batch; loader clear on window load. **Heavily dead**: sections for removed features remain — "NOW live clock" (`#nowClock`/`#nowDate`), "PLAYGROUND" (`#motionStage`), "NUMBERS", "QA accordion", "CREED" (`#creedLine`, mask-wipe), "WORK filmstrip" (`#film`), "ARSENAL tabs" (`#arsenalField`), "PROOF", "IST clocks" (`#istClock`/`#footClock`/`#doorClock`), "TRANSMIT" (WhatsApp chips), "cycler-word" (`#cycler-word`), `dbg-top`, chapter rail, missions. Dead lookups are null-guarded (`if (x)` / optional chaining style, 11 `if (!` guards) — no throw risk observed in the sampled paths.
- **sections.js** (175L): welcome intro timeline, `splitChars` for transition phrases, `makeFalls` waterfall canvases, `strTick` string-path draw.
- **hero3d.js** (91L, ES module): three.js — `GLTFLoader` loads `assets/models/dragon.glb` (14 MB) with original colors; `RoomEnvironment` PMREM for PBR; key light + vermillion rim (`#d9381e`, site accent) + ambient; scroll-driven spin; DPR clamp 2.
- **storm.js** (103L): 2D canvas ukiyo-e storm — teal clouds, cream foam, crimson ridges, grain; exposes `window.__storm`; resizes.
- **footer.js** (321L): vanilla port of `starburst-thanks-footer.tsx` — pen-loop "THANK YOU", clickable starburst (pops/sparks, cycles 7 langs incl. Dhanyavaadalu), orbit SVG, contact pills incl. `tel:+91 93983 59538`, email click-to-copy.
- **ready-particles.js** (154L): 2D particle text — renders "Ready for project" offscreen, samples pixels → particles; cursor repulsion (80px radius), spring-back; IntersectionObserver start/stop; touch support.
- **inkwash.js** (66L): targets `#inkwash` — **element does not exist in index.html and script is not loaded**. Fully dead.
- **vendor/**: gsap.min.js, ScrollTrigger.min.js, lenis.min.js, three.module.js + `addons/` (GLTFLoader, RoomEnvironment, BufferGeometryUtils). Self-hosted, pinned.

### Script tags in index.html (lines 236–246) vs disk — ⚠️ mismatch
Loaded: gsap, ScrollTrigger, lenis, **liquid-engine.js**, ready-particles.js, main.js, **particle-text.js**, sections.js, storm.js, footer.js, hero3d.js (module).
- `liquid-engine.js` and `particle-text.js` were **deleted from disk by `fd5799a` but their `<script>` tags remain** → 404s on page load (non-fatal, separate tags, but wasteful + noisy).
- `inkwash.js` on disk, never loaded (dead).

## 5. Assets — used vs orphaned (post-clean)

Used: `dragon.glb` (hero3d.js), `skill-hub-link.mp4` (index.html:51 hero card), 5 `icon-48_*.svg` (techniques cards), all 7 fonts (`@font-face` in main.css:28–32, 86–87).
Orphaned: `images/` tree (Dinesh_1 leftovers, ~9.6 MB — characters, home-page, icons, skill-demos) — not referenced by index.html. `assets/js/inkwash.js` — dead file.

## 6. String-tune (fiddle.digital) traces

- **Visible branding/content: none.** No string-tune text, logos, or links in index.html.
- **Code comments only**: `main.css:1` ("re-engineered from the LIVE string-tune.fiddle.digital"), `main.css:75` ("ported from string-tune reference"), `main.js:2`, `sections.js:2` ("study only / study model").
- **projects.html** (127 KB, from Dinesh_1): still contains `@fiddle-digital/string-tune` npm metadata blob and `FiddleDigital-MeruguDineshKumar-Promo` / `logo-string` SVG defs. Not cleaned.
- **404.html** (87 KB): Dinesh_1's 404 — references `/Dinesh_1/favicons/*`. Not a Dinesh-PP 404.
- Filenames `assets/images/home/*string-tune*` and the 5 `icon-48_*` SVGs' string-tune-era naming were removed or are generic; the 5 icons in `assets/images/icons/` remain and are used.

## 7. Issues found (facts only, no fixes applied)

1. **Broken script tags**: `index.html:239` (`liquid-engine.js`) and `:242` (`particle-text.js`) 404 — files deleted in `fd5799a`, tags left behind.
2. **Dead code**: `main.js` ~60%+ is for removed sections (clocks, playground, creed, filmstrip, arsenal tabs, transmit, missions, cycler). Null-guarded, but bloats the 540-line core file.
3. **Dead file**: `assets/js/inkwash.js` (66L) — not loaded, target element absent.
4. **Stale pages**: `404.html` and `projects.html` are Dinesh_1 artifacts; `images/` (~9.6 MB) is unreferenced.
5. **README** is now accurate (rewritten in `fd5799a`).
