import * as THREE from 'three'

// Star texture generator
function createGearTexture(size = 128, teeth = 8) {
  const cvs = document.createElement('canvas')
  cvs.width = cvs.height = size
  const ctx = cvs.getContext('2d')
  ctx.translate(size / 2, size / 2)
  ctx.fillStyle = '#fff'
  const outerR = size / 2
  const innerR = size / 3
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2
    ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR)
    ctx.lineTo(
      Math.cos(angle + Math.PI / teeth) * innerR,
      Math.sin(angle + Math.PI / teeth) * innerR,
    )
  }
  ctx.closePath()
  ctx.fill()

  const tex = new THREE.CanvasTexture(cvs)
  tex.needsUpdate = true
  tex.minFilter = THREE.LinearFilter
  return tex
}

const container = document.getElementById('hero-section')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x02020a)

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 4000)
camera.position.set(0, 0, 10)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
renderer.setSize(innerWidth, innerHeight)
container.appendChild(renderer.domElement)

const PARTICLE_COUNT = Math.min(15000, Math.floor((innerWidth * innerHeight) / 12))
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(PARTICLE_COUNT * 3)
const colors = new Float32Array(PARTICLE_COUNT * 3)
const speeds = new Float32Array(PARTICLE_COUNT)

const colorNear = new THREE.Color('#EA580C') // orange-600
const colorFar = new THREE.Color('#7C2D12') // dark burnt orange

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const z = THREE.MathUtils.randFloat(-2000, 2000)
  const radius = THREE.MathUtils.randFloat(10, 900)
  const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
  const x = Math.cos(theta) * radius * THREE.MathUtils.randFloat(0.2, 1.0)
  const y = Math.sin(theta) * radius * THREE.MathUtils.randFloat(0.2, 1.0)
  const i3 = i * 3
  positions[i3] = x
  positions[i3 + 1] = y
  positions[i3 + 2] = z
  const t = THREE.MathUtils.clamp((z + 2000) / 4000, 0, 1)
  const col = colorNear.clone().lerp(colorFar, Math.pow(t, 1.2))
  colors[i3] = col.r
  colors[i3 + 1] = col.g
  colors[i3 + 2] = col.b
  speeds[i] = THREE.MathUtils.randFloat(0.2, 1.6)
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
geometry.setAttribute('speed', new THREE.Float32BufferAttribute(speeds, 1))

const material = new THREE.PointsMaterial({
  size: 14,
  sizeAttenuation: true,
  vertexColors: true,
  transparent: true,
  opacity: 0.95,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  map: createGearTexture(64, 8), // gears!
  alphaTest: 0.0,
})

const points = new THREE.Points(geometry, material)
scene.add(points)

let baseSpeed = 2.0
let pointer = new THREE.Vector2(0, 0)
let targetRot = { x: 0, y: 0 }
let currentRot = { x: 0, y: 0 }

window.addEventListener(
  'mousemove',
  (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1
    pointer.y = (e.clientY / innerHeight) * -2 + 1
    targetRot.x = pointer.y * 0.08
    targetRot.y = pointer.x * 0.12
  },
  { passive: true },
)

window.addEventListener(
  'touchmove',
  (e) => {
    const t = e.touches?.[0]
    if (!t) return
    pointer.x = (t.clientX / innerWidth) * 2 - 1
    pointer.y = (t.clientY / innerHeight) * -2 + 1
    targetRot.x = pointer.y * 0.08
    targetRot.y = pointer.x * 0.12
  },
  { passive: true },
)

addEventListener(
  'resize',
  () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  },
  { passive: true },
)

let last = performance.now()
function animate(t) {
  const dt = Math.min((t - last) / 1000, 0.066)
  last = t
  currentRot.x += (targetRot.x - currentRot.x) * 0.06
  currentRot.y += (targetRot.y - currentRot.y) * 0.06
  camera.rotation.x = currentRot.x
  camera.rotation.y = currentRot.y

  const posAttr = geometry.getAttribute('position')
  const speedAttr = geometry.getAttribute('speed')
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3 + 2
    posAttr.array[idx] += baseSpeed * speedAttr.array[i] * 0.8 * dt * 60 * 0.6
    if (posAttr.array[idx] > camera.position.z + 50) {
      posAttr.array[idx] = THREE.MathUtils.randFloat(-2200, -1200)
      posAttr.array[i * 3] =
        Math.cos(i + Math.random()) * THREE.MathUtils.randFloat(20, 900) + currentRot.y * 120
      posAttr.array[i * 3 + 1] =
        Math.sin(i + Math.random()) * THREE.MathUtils.randFloat(20, 900) + currentRot.x * 120
    }
  }
  posAttr.needsUpdate = true
  camera.position.z -= baseSpeed * 0.02 * dt * 60
  if (camera.position.z < -120) camera.position.z = 10
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

// Wait for DOM to be fully loaded and check for exploreBtn periodically
function setupExploreButton() {
  const exploreBtn = document.getElementById('exploreBtn')
  if (exploreBtn) {
    exploreBtn.addEventListener('focus', () => {
      baseSpeed = 100
    })
    exploreBtn.addEventListener('blur', () => {
      baseSpeed = 2
    })
    exploreBtn.addEventListener('mouseenter', () => {
      baseSpeed = 50
    })
    exploreBtn.addEventListener('mouseleave', () => {
      baseSpeed = 2
    })
  } else {
    setTimeout(setupExploreButton, 500)
  }
}

// Start trying to find the button after a short delay
setTimeout(setupExploreButton, 1000)
