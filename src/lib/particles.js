import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uRadius;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute float aAngle;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aSize;
  attribute float aMix;
  varying float vAlpha;
  varying float vMix;

  void main() {
    // Each point travels from the outer edge toward the center, then starts again.
    float t = fract(aPhase + uTime * aSpeed);
    float r = uRadius * (1.0 - t);
    float a = aAngle + t * 0.9;
    vec2 p = vec2(cos(a), sin(a)) * r;
    p.y *= 0.72;

    // Lean gently toward the cursor, more strongly at the edges.
    p += uMouse * 0.12 * uRadius * (r / uRadius);

    // Fade in at the edge, fade out as it is absorbed at the center.
    vAlpha = smoothstep(0.0, 0.18, t) * smoothstep(1.0, 0.72, t);
    vMix = aMix;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
    gl_PointSize = aSize * uPixelRatio * (0.6 + 0.6 * (r / uRadius));
  }
`

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vMix;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float soft = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColorA, uColorB, vMix);
    gl_FragColor = vec4(color, soft * vAlpha * uOpacity);
  }
`

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export function startParticles(container, { reduced = false } = {}) {
  if (!webglAvailable()) return () => {}

  const mobile = window.matchMedia('(max-width: 767px)').matches
  const count = mobile ? 1000 : 3000

  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  container.appendChild(renderer.domElement)

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 10)
  camera.position.z = 1

  const geo = new BufferGeometry()
  const pos = new Float32Array(count * 3)
  const angle = new Float32Array(count)
  const phase = new Float32Array(count)
  const speed = new Float32Array(count)
  const size = new Float32Array(count)
  const mix = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    angle[i] = Math.random() * Math.PI * 2
    phase[i] = Math.random()
    speed[i] = 0.012 + Math.random() * 0.02
    size[i] = 1.5 + Math.random() * 3.5
    mix[i] = Math.random()
  }
  geo.setAttribute('position', new BufferAttribute(pos, 3))
  geo.setAttribute('aAngle', new BufferAttribute(angle, 1))
  geo.setAttribute('aPhase', new BufferAttribute(phase, 1))
  geo.setAttribute('aSpeed', new BufferAttribute(speed, 1))
  geo.setAttribute('aSize', new BufferAttribute(size, 1))
  geo.setAttribute('aMix', new BufferAttribute(mix, 1))

  const uniforms = {
    uTime: { value: 0 },
    uRadius: { value: 1 },
    uMouse: { value: new Vector2(0, 0) },
    uPixelRatio: { value: pixelRatio },
    uColorA: { value: new Color('#1c8f70') },
    uColorB: { value: new Color('#d8efe7') },
    uOpacity: { value: 0.55 },
  }

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const points = new Points(geo, material)
  points.frustumCulled = false
  scene.add(points)

  function resize() {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    const aspect = w / h
    camera.left = -aspect
    camera.right = aspect
    camera.top = 1
    camera.bottom = -1
    camera.updateProjectionMatrix()
    uniforms.uRadius.value = Math.max(aspect, 1) * 1.15
  }
  resize()
  window.addEventListener('resize', resize)

  const target = new Vector2(0, 0)
  const onMove = (e) => {
    const r = container.getBoundingClientRect()
    target.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1))
  }
  if (!mobile) window.addEventListener('pointermove', onMove, { passive: true })

  let visible = true
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  io.observe(container)

  let raf = 0
  let last = performance.now()
  const start = last
  function frame(now) {
    raf = requestAnimationFrame(frame)
    if (!visible) return
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    uniforms.uTime.value += dt
    uniforms.uMouse.value.lerp(target, 0.04)
    renderer.render(scene, camera)
  }

  if (reduced) {
    // A single still frame: no drift, no cursor lean.
    uniforms.uTime.value = 12
    renderer.render(scene, camera)
  } else {
    uniforms.uTime.value = (start % 1000) / 100
    raf = requestAnimationFrame(frame)
  }
  container.classList.add('is-ready')

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    geo.dispose()
    material.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
