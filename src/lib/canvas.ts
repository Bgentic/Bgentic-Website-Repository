// Small helpers shared by the hero's canvases (the ink orb and the kinetic grid).
export function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}

/** "#rrggbb" or "#rgb" as [r, g, b] */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
