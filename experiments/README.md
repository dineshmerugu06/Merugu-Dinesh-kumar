# Experiments

Playground for custom liquid-sculpture cursor effects.

- `liquid-engine-experiment.js` — copy of the live engine (`assets/js/liquid-engine.js`).
  Edit freely here. The live site is untouched until a change is deliberately
  ported back to `assets/js/liquid-engine.js`.

Rule: nothing here goes live without Dinesh's word.

## 2026-11-03 — free hand movement (his "proper action")
- He rejected: whole-image scale (v1), whole-image travel (v2), particle shockwave blast (v3) — "ur not getting it should perform proper action".
- What he meant (from his stop-motion reference video): the HAND ITSELF must move — fingers articulating, like the video's hand model.
- Built: pose-morphing. 3 AI poses (open / half-curl / fist, same framing via resume chain) as fixed-grid particle sets with identical particle order; sim + render shaders lerp home positions (uHome/uHomeB/uMorph) and colors. Cursor placed on hand plays open→curl→fist→curl→open (~2.5s, eased). Browser-verified 19:22 IST: fist-curl then relax to open, no errors.
- LESSON: buildParticles used Math.random() acceptance — two poses can NEVER share particle identity. Fixed grid (every cell a particle, w=0 for background, shaders already cull w<=0) is what makes morphing possible.
- LESSON: GLSL pow(negative, 2.0) is undefined → NaN poisons the sim. Use d*d (the codebase already avoids pow this way).

## 2026-11-03 — venom direction (side chat)
- He dropped particles ("Not particle any more") and sent his own venom portrait (736x1300) as the new source image: experiments/venom.jpg.
- Old hand pose-morph gesture removed (incompatible with a single portrait). Effect now = liquid distortion follows the cursor over the Venom image. New cursor effect spec still open — awaiting his word.

## 2026-11-03 — symbiote engulf (from his video)
- Reference: "Venom: The Last Dance - VENOM HORSE! Scene" (sdwApAs67bg) — black liquid symbiote erupts and spreads over the horse like spilled ink, spikes extrude, white veins appear.
- Built: NO particles, NO WebGL. Plain horse.jpg + 2D canvas goo: jittered seed grid clipped to a real horse silhouette mask (horse-mask.png, PIL flood/threshold), wavefront spreads from the cursor contact point (~2.8s), glossy black blobs + spikes at the front + white veins + gloss sweep; recedes on cursor leave (~1.8s). Touch: tap toggles.
