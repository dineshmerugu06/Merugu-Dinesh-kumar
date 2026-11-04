/* Dinesh PP — hero 3D: dragon.glb (Merugu's own asset, original colors kept). */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.getElementById('dragon-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 2000);

const key = new THREE.DirectionalLight(0xffffff, 1.1);
key.position.set(6, 8, 7);
scene.add(key);
const rim = new THREE.DirectionalLight(0xd9381e, 1.0); // vermillion rim, live-site accent
rim.position.set(-8, 2.5, -7);
scene.add(rim);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

const group = new THREE.Group();
scene.add(group);

let mixer = null;
let scrollSpin = 0;
let heroProgress = 0;

new GLTFLoader().load('./assets/models/dragon.glb', (gltf) => {
  const m = gltf.scene;
  // normalize to ~9 units tall
  const box = new THREE.Box3().setFromObject(m);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const s = 8.5 / Math.max(size.x, size.y, size.z);
  m.scale.setScalar(s);
  m.position.sub(center.multiplyScalar(s));
  m.position.y -= 1.1; // sit slightly below optical center, clear of the top tags
  group.add(m);
  // fade the canvas in once the dragon is actually on screen
  if (window.gsap) gsap.to(canvas, { opacity: 1, duration: 1.4, ease: 'power2.out' });
  else canvas.style.opacity = 1;

  if (gltf.animations && gltf.animations.length) {
    mixer = new THREE.AnimationMixer(m);
    const clip = gltf.animations[0];
    const action = mixer.clipAction(clip);
    action.play();
    mixer.timeScale = 0.5; // half speed, like Dinesh_1
  }
});

let pilotActive = false;
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  // frame the dragon: closer on desktop, pulled back on mobile
  const dist = pilotActive ? 15 : (w < 700 ? 27 : 13.5);
  camera.position.set(dist * 0.55, 3.0, dist * 0.82);
  camera.lookAt(0, -0.3, 0);
}
window.addEventListener('resize', resize);
resize();

// scroll-linked spin: dragon turns as you leave the hero
if (window.ScrollTrigger) {
  ScrollTrigger.create({
    trigger: '.w-welcome', start: 'top top', end: 'bottom top', scrub: true,
    onUpdate: (self) => { heroProgress = self.progress; scrollSpin = self.progress * Math.PI * 1.2; }
  });
}

const clock = new THREE.Clock();
let t = 0;

/* ---------- dragon pilot: hero -> cursor (section 2) -> trail (journey) -> gone ---------- */
const pilot = { mode: 'hero', mx: innerWidth / 2, my: innerHeight / 2, roaring: false };
window.addEventListener('pointermove', (e) => { pilot.mx = e.clientX; pilot.my = e.clientY; },
  { passive: true });

const secHero = document.querySelector('.w-welcome');
const secTrans = document.querySelector('.w-transition');
const secJourney = document.querySelector('.s-journey');

function detectMode() {
  const vh = innerHeight;
  const r1 = secHero.getBoundingClientRect();
  const r2 = secTrans.getBoundingClientRect();
  const r3 = secJourney.getBoundingClientRect();
  if (r1.bottom > vh * 0.55) return 'hero';
  if (r2.top < vh * 0.5 && r2.bottom > vh * 0.5) return 'cursor';
  if (r3.top < vh * 0.6 && r3.bottom > vh * 0.4) return 'trail';
  if (r3.bottom <= vh * 0.4) return 'gone';
  return pilot.mode;
}

function enterPilot() {
  const r = canvas.getBoundingClientRect();
  canvas.style.position = 'fixed';
  canvas.style.left = r.left + 'px';
  canvas.style.top = r.top + 'px';
  canvas.style.width = r.width + 'px';
  canvas.style.height = r.height + 'px';
  canvas.style.zIndex = '40';
  canvas.style.pointerEvents = 'none';
  canvas.style.margin = '0';
  pilotActive = true;
  resize();
}
function exitPilot() {
  canvas.style.position = '';
  canvas.style.left = ''; canvas.style.top = '';
  canvas.style.width = ''; canvas.style.height = '';
  canvas.style.zIndex = ''; canvas.style.pointerEvents = '';
  canvas.style.margin = '';
  if (window.gsap) gsap.set(canvas, { x: 0, y: 0, scale: 1 });
  pilotActive = false;
  resize();
}

let lastPW = 0, lastPH = 0;
function pilotFrame(dt) {
  const k = 1 - Math.pow(0.002, dt);
  const tw = Math.min(innerWidth * 0.36, 440);
  const th = tw * 0.72;
  let tx, ty;
  if (pilot.mode === 'cursor') {
    tx = pilot.mx - tw / 2; ty = pilot.my - th / 2;
  } else if (pilot.mode === 'trail') {
    const jr = document.getElementById('jChar');
    if (jr) {
      const r = jr.getBoundingClientRect();
      tx = r.left + r.width / 2 - tw / 2 - tw * 0.62; // behind the character
      ty = r.top + r.height / 2 - th / 2 - th * 0.42; // slightly above
    } else { tx = innerWidth / 2 - tw / 2; ty = innerHeight / 2 - th / 2; }
  } else { // gone: hold position, fade out
    tx = parseFloat(canvas.style.left) || 0;
    ty = parseFloat(canvas.style.top) || 0;
  }
  const cx = parseFloat(canvas.style.left) || 0;
  const cy = parseFloat(canvas.style.top) || 0;
  const cw = parseFloat(canvas.style.width) || tw;
  const chh = parseFloat(canvas.style.height) || th;
  canvas.style.left = (cx + (tx - cx) * k) + 'px';
  canvas.style.top = (cy + (ty - cy) * k) + 'px';
  canvas.style.width = (cw + (tw - cw) * k) + 'px';
  canvas.style.height = (chh + (th - chh) * k) + 'px';
  if (Math.abs(cw - tw) > 4 || Math.abs(chh - th) > 4) {
    if (Math.abs(cw - lastPW) > 4 || Math.abs(chh - lastPH) > 4) { resize(); lastPW = cw; lastPH = chh; }
  }
  const curOp = parseFloat(canvas.style.opacity || '1');
  const targetOp = pilot.mode === 'gone' ? 0 : 1;
  canvas.style.opacity = (curOp + (targetOp - curOp) * k).toFixed(3);
  // pilot 3D pose: calm hover, no hero scroll transforms
  group.rotation.y = Math.sin(t * 0.4) * 0.15;
  group.rotation.z = -0.1;
  group.scale.setScalar(1);
  group.position.y = Math.sin(t * 0.9) * 0.3;
}

// roar: lunge at the blood text, shake, settle back. called from the transition timeline.
window.__dragonRoar = function () {
  if (pilot.mode !== 'cursor' || pilot.roaring || !window.gsap || !pilotActive) return;
  pilot.roaring = true;
  const stage = document.querySelector('.t-stage').getBoundingClientRect();
  const cr = canvas.getBoundingClientRect();
  const dx = (stage.left + stage.width / 2) - (cr.left + cr.width / 2);
  const dy = (stage.top + stage.height * 0.42) - (cr.top + cr.height / 2);
  gsap.timeline({ onComplete: () => { pilot.roaring = false; } })
    .to(canvas, { x: dx * 0.32, y: dy * 0.32, scale: 1.16, duration: 0.28, ease: 'power2.in' })
    .to(canvas, { x: '+=' + 18, duration: 0.07, repeat: 5, yoyo: true, ease: 'none' }, '>-0.04')
    .to(canvas, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' });
};

(function tick() {
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  if (mixer) mixer.update(dt);
  const mode = detectMode();
  if (mode !== pilot.mode) {
    if (pilot.mode === 'hero' && mode !== 'hero') enterPilot();
    else if (mode === 'hero' && pilot.mode !== 'hero') exitPilot();
    pilot.mode = mode;
  }
  if (pilotActive && pilot.mode !== 'hero') {
    pilotFrame(dt);
  } else {
    group.rotation.y = Math.sin(t * 0.25) * 0.22 + scrollSpin;
    group.rotation.z = -0.16; // diagonal lay, like the live hero
    const gs = 1 + heroProgress * 0.4; // grow as you scroll through the pinned hero
    group.scale.setScalar(gs);
    group.position.y = Math.sin(t * 0.6) * 0.28 - heroProgress * 1.5; // hover float + sink
  }
  renderer.render(scene, camera);
})();
