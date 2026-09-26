const FRACTIONS: [number, string][] = [
  [0.125, '⅛'],
  [0.25, '¼'],
  [0.333, '⅓'],
  [0.5, '½'],
  [0.667, '⅔'],
  [0.75, '¾'],
]

/** Scale an amount and render it nicely: grams/ml as integers, spoons/cups as fractions. */
export function formatAmount(amount: number, unit: string, factor = 1): string {
  const v = amount * factor
  if (unit === 'g' || unit === 'ml') return `${Math.round(v)} ${unit}`
  const whole = Math.floor(v)
  const frac = v - whole
  let fracStr = ''
  if (frac > 0.06) {
    const [, glyph] = FRACTIONS.reduce((best, cur) => (Math.abs(cur[0] - frac) < Math.abs(best[0] - frac) ? cur : best))
    if (frac > 0.9) return `${whole + 1} ${pluralize(unit, whole + 1)}`
    fracStr = glyph
  }
  const num = whole > 0 ? `${whole}${fracStr}` : fracStr || '0'
  return `${num} ${pluralize(unit, v)}`
}

const NO_PLURAL = new Set(['g', 'ml', 'tsp', 'tbsp', 'pinch', 'splash', 'whole'])

function pluralize(unit: string, n: number) {
  if (n <= 1 || NO_PLURAL.has(unit) || unit.endsWith('s')) return unit
  if (unit.endsWith('h')) return unit + 'es'
  return unit + 's'
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.round(minutes / 60)
  return `${h} hr${h > 1 ? 's' : ''}`
}

export function formatSeconds(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}
