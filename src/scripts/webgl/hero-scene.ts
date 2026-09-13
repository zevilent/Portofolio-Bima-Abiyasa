/**
 * The particle scene itself (lazy chunk — imported only after idle time).
 * Custom shaders: position + drift in the vertex shader, soft round sprite and the
 * gold colour ramp in the fragment shader. Nothing here touches the DOM hierarchy,
 * so it cannot affect the LCP text.
 */
import * as THREE from 'three';

export type SceneOptions = {
  host: HTMLElement;
  count: number;
  maxPixelRatio: number;
};

const VERTEX = /* glsl */ `
  // Uniform precision must match the fragment shader exactly, or program validation
  // fails on some drivers with "Precisions of uniform 'uTime' differ".
  precision mediump float;

  attribute float aSeed;
  attribute vec3 aGrid;
  attribute float aSize;
  uniform float uTime;
  uniform float uBreath;
  uniform float uGrid;
  uniform vec2 uPointer;
  uniform float uDpr;
  varying float vAlpha;

  // Cheap value noise — enough for organic drift.
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }

  void main() {
    vec3 constellation = position;
    constellation.x += sin(uTime * 0.18 + aSeed * 6.283) * 0.28;
    constellation.y += cos(uTime * 0.14 + aSeed * 5.1) * 0.24;
    constellation.z += sin(uTime * 0.11 + aSeed * 3.7) * 0.22;

    // Inhale / exhale: the whole field swells very slowly.
    constellation *= 1.0 + uBreath * 0.03;

    // Pointer influence falls off with distance, so only the near field leans.
    vec2 toPointer = uPointer - constellation.xy;
    float pointerInfluence = exp(-dot(toPointer, toPointer) * 0.35);
    constellation.xy += toPointer * pointerInfluence * 0.06;

    // Constellation → grid, the section's whole argument in one lerp.
    vec3 finalPosition = mix(constellation, aGrid, uGrid);

    vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = aSize * (1.0 + uGrid * 0.35) * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(size, 1.0, 8.0) * uDpr;

    vAlpha = (0.28 + 0.55 * hash(vec3(aSeed, aSeed * 2.0, aSeed * 3.0))) *
             (1.0 - uGrid * 0.15) *
             (0.75 + 0.25 * pointerInfluence);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorGold;
  uniform vec3 uColorBright;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    // Soft round point sprite, generated procedurally (no texture to download).
    vec2 centered = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(centered);
    float mask = smoothstep(0.5, 0.05, distanceToCenter);
    if (mask <= 0.001) discard;

    // A slow shimmer keeps the field alive without any animation on layout.
    vec3 color = mix(uColorGold, uColorBright, 0.5 + 0.5 * sin(uTime * 0.4 + gl_PointCoord.x * 6.283));

    gl_FragColor = vec4(color, mask * vAlpha);
  }
`;

export default function createScene({ host, count, maxPixelRatio }: SceneOptions): () => void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
  } catch {
    // No WebGL available: keep the static fallback and stop.
    host.setAttribute('data-static', '');
    return () => {};
  }

  renderer.setClearAlpha(0);
  const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
  renderer.setPixelRatio(pixelRatio);
  host.appendChild(renderer.domElement);

  // ---- Geometry: scattered constellation + the grid each point will move to ----
  const positions = new Float32Array(count * 3);
  const gridPositions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);

  const gridColumns = Math.ceil(Math.sqrt(count * 1.6));
  const gridRows = Math.ceil(count / gridColumns);
  const spacingX = 13 / gridColumns;
  const spacingY = 8 / gridRows;

  for (let i = 0; i < count; i += 1) {
    // Constellation: a flattened ellipsoid so it reads as a field, not a ball.
    const radius = 3.2 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * 1.5;
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.9 - 1.5;

    const column = i % gridColumns;
    const row = Math.floor(i / gridColumns);
    gridPositions[i * 3] = -6.5 + column * spacingX + spacingX * 0.5;
    gridPositions[i * 3 + 1] = -4 + row * spacingY + spacingY * 0.5;
    gridPositions[i * 3 + 2] = -1.2 + (Math.random() - 0.5) * 0.2;

    seeds[i] = Math.random();
    sizes[i] = 0.6 + Math.random() * 1.1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aGrid', new THREE.BufferAttribute(gridPositions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

  const uniforms = {
    uTime: { value: 0 },
    uBreath: { value: 0 },
    uGrid: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uDpr: { value: pixelRatio },
    uColorGold: { value: new THREE.Color('#C8A96C') },
    uColorBright: { value: new THREE.Color('#E6CBA0') },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  // ---- Resize ----
  const resize = () => {
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };
  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  // ---- Interaction state (all values are lerped toward a target, never set directly)
  const pointerTarget = new THREE.Vector2(0, 0);
  let pointerX = 0;
  let pointerY = 0;
  let gridTarget = 0;
  let gridValue = 0;
  let breathValue = 0;

  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointerTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    pointerTarget.y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const onScroll = () => {
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight * 0.9, 1), 1);
    gridTarget = progress;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Visibility gating: pause when the hero is off-screen or the tab is hidden ----
  let visible = true;
  let tabVisible = document.visibilityState === 'visible';
  const onVisibility = () => {
    tabVisible = document.visibilityState === 'visible';
  };
  document.addEventListener('visibilitychange', onVisibility);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(host);

  const clock = new THREE.Clock();
  let frame = 0;
  let running = true;

  const tick = () => {
    frame = window.requestAnimationFrame(tick);

    const delta = Math.min(clock.getDelta(), 0.05);
    if (!visible || !tabVisible) return;

    uniforms.uTime.value += delta;
    breathValue += (Math.sin(uniforms.uTime.value * 0.22) * 0.5 - breathValue) * 0.02;
    uniforms.uBreath.value = breathValue;

    pointerX += (pointerTarget.x - pointerX) * 0.045;
    pointerY += (pointerTarget.y - pointerY) * 0.045;
    uniforms.uPointer.value.set(pointerX, pointerY);

    gridValue += (gridTarget - gridValue) * 0.06;
    uniforms.uGrid.value = gridValue;

    renderer.render(scene, camera);
  };

  tick();

  const onContextLost = (event: Event) => {
    event.preventDefault();
    running = false;
    window.cancelAnimationFrame(frame);
    host.removeAttribute('data-ready');
    host.setAttribute('data-static', '');
  };
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);

  // Fade the canvas in only after the first real frame has been painted.
  window.requestAnimationFrame(() => {
    if (running) host.setAttribute('data-ready', '');
  });

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', onVisibility);
    renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
    intersectionObserver.disconnect();
    resizeObserver.disconnect();

    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
