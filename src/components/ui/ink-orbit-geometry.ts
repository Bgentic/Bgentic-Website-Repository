// The ink orb's geometry, apart from its rendering: the seeded ink cloud, the loose dust round it, and the B its
// glass core is cut as. Pure data, built once per seed and cached.
import { clamp } from "@/lib/canvas"

/** a small, fast seeded random, so a seed always draws the same shape */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ------------------------------------------------------------- the ink cloud */

export type Cloud = { core: Float32Array; grain: Float32Array }
/** points along the ink's ribbons, each [x, y, z, width] */
export const CORE_N = 2800
/** loose grain scattered round the ribbons, each [x, y, z] */
export const GRAIN_N = 16000

// ink loops + bridges, sampled to a fixed-size point cloud so any two seeds morph grain-for-grain (original)
function buildCloud(seed: number): Cloud {
  const rand = mulberry32(seed * 2654435761 + 1)
  const unit = (): [number, number, number] => {
    const z = rand() * 2 - 1
    const a = rand() * Math.PI * 2
    const r = Math.sqrt(1 - z * z)
    return [r * Math.cos(a), r * Math.sin(a), z]
  }
  const cross = (a: number[], b: number[]): [number, number, number] => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
  const norm = (v: number[]): [number, number, number] => {
    const l = Math.hypot(v[0], v[1], v[2]) || 1
    return [v[0] / l, v[1] / l, v[2] / l]
  }
  const curves: number[][] = []
  const loops = 3 + Math.floor(rand() * 2)
  const W = 0.092
  for (let k = 0; k < loops; k++) {
    const n = unit()
    const u = norm(cross(n, Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]))
    const v = cross(n, u)
    const p = Array.from({ length: 8 }, () => rand() * Math.PI * 2)
    const R = 0.9 + rand() * 0.16
    const pts: number[] = []
    for (let i = 0; i <= 220; i++) {
      const t = (i / 220) * Math.PI * 2
      const r = R * (1 + 0.15 * Math.sin(2 * t + p[0]) + 0.07 * Math.sin(3 * t + p[1]) + 0.04 * Math.sin(5 * t + p[2]))
      const h = R * (0.24 * Math.sin(2 * t + p[3]) + 0.08 * Math.sin(3 * t + p[4]))
      const c = Math.cos(t) * r
      const s = Math.sin(t) * r
      const w = W * (0.3 + 0.7 * Math.pow(0.5 + 0.5 * Math.sin(3 * t + p[5]), 1.5)) * (0.72 + 0.28 * Math.sin(7 * t + p[6]))
      pts.push(u[0] * c + v[0] * s + n[0] * h, u[1] * c + v[1] * s + n[1] * h, u[2] * c + v[2] * s + n[2] * h, Math.max(0.018, w))
    }
    curves.push(pts)
  }
  for (let b = 0; b < 3; b++) {
    const A = curves[Math.floor(rand() * loops)]
    const B = curves[Math.floor(rand() * loops)]
    const ia = Math.floor(rand() * (A.length / 4)) * 4
    const ib = Math.floor(rand() * (B.length / 4)) * 4
    const a = [A[ia], A[ia + 1], A[ia + 2]]
    const c = [B[ib], B[ib + 1], B[ib + 2]]
    const mid = norm([(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2])
    const lift = 1.08 + rand() * 0.18
    const m = [mid[0] * lift, mid[1] * lift, mid[2] * lift]
    const pts: number[] = []
    for (let i = 0; i <= 40; i++) {
      const t = i / 40
      const q = 1 - t
      pts.push(
        q * q * a[0] + 2 * q * t * m[0] + t * t * c[0],
        q * q * a[1] + 2 * q * t * m[1] + t * t * c[1],
        q * q * a[2] + 2 * q * t * m[2] + t * t * c[2],
        W * (0.16 + 0.42 * Math.sin(Math.PI * t)),
      )
    }
    curves.push(pts)
  }
  const segs: { c: number[]; i: number; len: number }[] = []
  let total = 0
  for (const c of curves) {
    for (let i = 0; i + 4 < c.length; i += 4) {
      const len = Math.hypot(c[i + 4] - c[i], c[i + 5] - c[i + 1], c[i + 6] - c[i + 2])
      segs.push({ c, i, len })
      total += len
    }
  }
  const core = new Float32Array(CORE_N * 4)
  const tan = new Float32Array(CORE_N * 3)
  let si = 0
  let acc = 0
  for (let k = 0; k < CORE_N; k++) {
    const target = ((k + 0.5) / CORE_N) * total
    while (si < segs.length - 1 && acc + segs[si].len < target) acc += segs[si++].len
    const { c, i, len } = segs[si]
    const f = len ? clamp((target - acc) / len, 0, 1) : 0
    for (let d = 0; d < 4; d++) core[k * 4 + d] = c[i + d] + (c[i + 4 + d] - c[i + d]) * f
    tan.set(norm([c[i + 4] - c[i], c[i + 5] - c[i + 1], c[i + 6] - c[i + 2]]), k * 3)
  }
  const grain = new Float32Array(GRAIN_N * 3)
  for (let g = 0; g < GRAIN_N; g++) {
    const k = Math.floor(rand() * CORE_N)
    const T = [tan[k * 3], tan[k * 3 + 1], tan[k * 3 + 2]]
    const d = unit()
    const dot = d[0] * T[0] + d[1] * T[1] + d[2] * T[2]
    const o = norm([d[0] - dot * T[0], d[1] - dot * T[1], d[2] - dot * T[2]])
    const w = core[k * 4 + 3]
    const r = rand() < 0.05 ? w * (1.3 + rand() * 1.6) : w * (0.35 + 0.82 * Math.sqrt(rand()))
    for (let a = 0; a < 3; a++) grain[g * 3 + a] = core[k * 4 + a] + o[a] * r
  }
  return { core, grain }
}

const clouds = new Map<number, Cloud>()
/** the cloud for a seed, built on first use and kept */
export function getCloud(seed: number) {
  let c = clouds.get(seed)
  if (!c) clouds.set(seed, (c = buildCloud(seed)))
  return c
}

/* ------------------------------------------------------------- the dust */

// Loose dust: free motes round the cloud, apart from the ink, so they persist through reforges. Each drifts on its
// own slow orbit and bobs a little (the sculpture moves them; this only places them).
export const DUST_N = 1200
/** each mote as [x, y, z, orbit speed, bob phase, size], from a fixed seed so the field is always the same */
export function buildDust() {
  const rand = mulberry32(0x5eed)
  const d = new Float32Array(DUST_N * 6) // x, y, z, orbit speed, bob phase, size
  for (let i = 0; i < DUST_N; i++) {
    const z = rand() * 2 - 1
    const a = rand() * Math.PI * 2
    const ring = Math.sqrt(1 - z * z)
    const r = clamp(1 + (rand() + rand() + rand() - 1.5) * 0.46, 0.45, 1.8)
    const speed = (0.03 + rand() * 0.09) * (rand() < 0.5 ? -1 : 1)
    d.set([ring * Math.cos(a) * r, z * r * 0.86, ring * Math.sin(a) * r, speed, rand() * Math.PI * 2, rand() < 0.07 ? 2 : 1], i * 6)
  }
  return d
}

/* ------------------------------------------------------------- the glass core's B */

// A heavy capital B, as an SVG path in a 108 x 140 box. The counters are cut out with the even-odd rule, so the ink
// shows through them.
export const B_GLYPH_W = 108
export const B_GLYPH_H = 140
export const B_GLYPH =
  "M3 0H60C86 0 100 14 100 35C100 50 91 61 77 65C95 69 108 82 108 101C108 125 90 140 62 140H3Q0 140 0 137V3Q0 0 3 0Z" +
  "M30 24H55C66 24 71 30 71 38.5C71 47 65 53 55 53H30Z" +
  "M30 77H59C72 77 78 84 78 96C78 108 71 116 59 116H30Z"
