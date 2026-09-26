import { useId, type ReactNode } from 'react'
import type { CupStyle, Recipe } from '../lib/types'

const C = {
  espresso: '#3A2218',
  filter: '#5B3520',
  strongMilk: '#A36A3C',
  latte: '#C9955F',
  milk: '#F4E9D8',
  foam: '#FAF2E6',
  cream: '#FFFaF0',
  crema: '#C98A4B',
  condensed: '#F0DDB6',
  chocolate: '#4A2A1C',
  egg: '#F2D58A',
  dalgona: '#C47F3F',
  coconut: '#F7F2E8',
  tonic: '#E8E4D6',
  lemon: '#7A4A22',
  icecream: '#FFF6E2',
}

interface Shape {
  /** Interior of the vessel; liquid is clipped to it. */
  vessel: string
  top: number
  bottom: number
  fill: number
  extras?: ReactNode
  front?: ReactNode
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const SHAPES: Record<CupStyle, Shape> = {
  demitasse: {
    vessel: 'M38 54 L82 54 L79 84 Q78 92 70 92 L50 92 Q42 92 41 84 Z',
    top: 54,
    bottom: 92,
    fill: 0.72,
    extras: (
      <>
        <ellipse cx="60" cy="97" rx="34" ry="5" {...stroke} />
        <path d="M80 62 q13 0 13 10 q0 10 -15 10" {...stroke} />
      </>
    ),
  },
  cappuccino: {
    vessel: 'M26 50 L94 50 Q94 90 60 92 Q26 90 26 50 Z',
    top: 50,
    bottom: 92,
    fill: 0.86,
    extras: (
      <>
        <ellipse cx="60" cy="97" rx="40" ry="5" {...stroke} />
        <path d="M92 60 q14 0 14 11 q0 11 -18 11" {...stroke} />
      </>
    ),
  },
  mug: {
    vessel: 'M32 38 L86 38 L86 88 Q86 98 76 98 L42 98 Q32 98 32 88 Z',
    top: 38,
    bottom: 98,
    fill: 0.85,
    extras: <path d="M86 50 q17 0 17 15 q0 15 -17 15" {...stroke} />,
  },
  'latte-glass': {
    vessel: 'M38 24 L82 24 L78 96 Q78 102 72 102 L48 102 Q42 102 42 96 Z',
    top: 24,
    bottom: 102,
    fill: 0.88,
  },
  'tall-iced': {
    vessel: 'M34 20 L86 20 L79 100 Q78 106 72 106 L48 106 Q42 106 41 100 Z',
    top: 20,
    bottom: 106,
    fill: 0.86,
    front: <path d="M70 6 L62 70" {...stroke} strokeWidth={4} />,
  },
  'irish-glass': {
    vessel: 'M34 22 L86 22 L82 64 Q79 78 60 78 Q41 78 38 64 Z',
    top: 22,
    bottom: 78,
    fill: 0.85,
    extras: (
      <>
        <path d="M60 78 L60 98" {...stroke} />
        <ellipse cx="60" cy="101" rx="18" ry="4" {...stroke} />
      </>
    ),
  },
  carafe: {
    vessel: 'M54 58 L66 58 Q94 70 92 92 Q90 104 60 104 Q30 104 28 92 Q26 70 54 58 Z',
    top: 58,
    bottom: 104,
    fill: 0.7,
    extras: (
      <>
        <path d="M36 14 L84 14 L66 58 L54 58 Z" {...stroke} />
        <rect x="50" y="50" width="20" height="10" rx="3" fill="#A87A4F" stroke="currentColor" strokeWidth={2.5} />
      </>
    ),
  },
}

interface Layer {
  color: string
  frac: number
}

interface Look {
  layers: Layer[]
  topper?: { color: string; frac: number; bubbly?: boolean }
  ice: boolean
  scoop?: boolean
}

const MILKS = ['whole-milk', 'two-percent-milk', 'oat-milk', 'almond-milk', 'half-and-half', 'evaporated-milk']

/** Derive a plausible cross-section of the drink from its recipe. */
function lookFor(recipe: Recipe): Look {
  const req = new Set(recipe.ingredients.filter((i) => !i.optional).map((i) => i.id))
  const all = new Set(recipe.ingredients.map((i) => i.id))
  const has = (id: string) => req.has(id)
  const iced = recipe.temperature === 'iced'
  const hasMilk = MILKS.some(has)
  const frothed = hasMilk && recipe.equipment.includes('milk-frother')
  const layered = recipe.tags.includes('layered')
  const milkAmt = recipe.ingredients
    .filter((i) => MILKS.includes(i.id))
    .reduce((s, i) => s + (i.unit === 'ml' ? i.amount : 0), 0)
  const coffeeColor = recipe.category === 'brew-method' || recipe.category === 'international' ? C.filter : C.espresso

  switch (recipe.id) {
    case 'dalgona-coffee':
      return {
        layers: [{ color: C.milk, frac: 0.7 }],
        topper: { color: C.dalgona, frac: 0.3, bubbly: true },
        ice: true,
      }
    case 'vietnamese-egg-coffee':
      return {
        layers: [{ color: C.espresso, frac: 0.55 }],
        topper: { color: C.egg, frac: 0.45, bubbly: true },
        ice: false,
      }
    case 'vietnamese-coconut-coffee':
      return {
        layers: [
          { color: C.coconut, frac: 0.7 },
          { color: C.filter, frac: 0.3 },
        ],
        ice: false,
      }
    case 'espresso-tonic':
      return {
        layers: [
          { color: C.tonic, frac: 0.65 },
          { color: C.espresso, frac: 0.35 },
        ],
        ice: true,
      }
    case 'mazagran':
      return { layers: [{ color: C.lemon, frac: 1 }], ice: true }
    case 'affogato':
      return { layers: [{ color: C.espresso, frac: 0.45 }], ice: false, scoop: true }
    case 'cafe-bombon':
      return {
        layers: [
          { color: C.condensed, frac: 0.45 },
          { color: C.espresso, frac: 0.55 },
        ],
        ice: false,
      }
  }

  const layers: Layer[] = []
  if (layered) {
    if (has('vanilla-syrup')) layers.push({ color: C.condensed, frac: 0.1 })
    layers.push({ color: C.milk, frac: 0.55 }, { color: C.strongMilk, frac: 0.2 })
  } else {
    if (has('sweetened-condensed-milk') && !iced) layers.push({ color: C.condensed, frac: 0.2 })
    if (has('chocolate-sauce') || has('cocoa-powder')) layers.push({ color: C.chocolate, frac: 0.1 })
    const main = hasMilk ? (milkAmt >= 150 ? C.latte : C.strongMilk) : coffeeColor
    layers.push({ color: iced && has('sweetened-condensed-milk') ? C.latte : main, frac: 1 })
  }

  let topper: Look['topper']
  if (all.has('whipped-cream') || has('heavy-cream'))
    topper = { color: C.cream, frac: recipe.cup === 'irish-glass' ? 0.25 : 0.28, bubbly: true }
  else if (frothed)
    topper = { color: C.foam, frac: recipe.id === 'cappuccino' ? 0.34 : 0.12, bubbly: recipe.id === 'cappuccino' }
  else if (recipe.category === 'espresso' && !iced) topper = { color: C.crema, frac: 0.12 }
  else if (recipe.id === 'greek-frappe' || recipe.id === 'turkish-coffee' || recipe.id === 'cafe-cubano')
    topper = { color: C.crema, frac: 0.18, bubbly: true }

  return { layers, topper, ice: iced && all.has('ice') }
}

export function Cup({ recipe, size = 120, steam = true }: { recipe: Recipe; size?: number; steam?: boolean }) {
  const id = useId().replace(/:/g, '')
  const shape = SHAPES[recipe.cup]
  const look = lookFor(recipe)
  const height = shape.bottom - shape.top
  const liquidTop = shape.bottom - height * shape.fill

  // Stack layers from the bottom; the topper takes a share of the fill from the top.
  const topperH = look.topper ? height * shape.fill * look.topper.frac : 0
  const bodyH = height * shape.fill - topperH
  const totalFrac = look.layers.reduce((s, l) => s + l.frac, 0)
  const heights = look.layers.map((l) => (bodyH * l.frac) / totalFrac)
  const rects = look.layers.map((l, i) => {
    const y = shape.bottom - heights.slice(0, i + 1).reduce((a, b) => a + b, 0)
    return <rect key={i} x="0" y={y} width="120" height={heights[i] + 0.5} fill={l.color} />
  })

  const hot = recipe.temperature !== 'iced'
  const steamY = recipe.cup === 'carafe' ? 12 : shape.top

  return (
    <svg
      className="cup"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label={`Illustration of ${recipe.name}`}
    >
      <defs>
        <clipPath id={`v${id}`}>
          <path d={shape.vessel} />
        </clipPath>
      </defs>
      {steam && hot && (
        <g className="steam" {...stroke} strokeWidth={2.5} opacity={0.45}>
          <path d={`M52 ${steamY - 6} q-5 -7 0 -13 q5 -6 0 -13`} />
          <path d={`M66 ${steamY - 4} q-5 -7 0 -13 q5 -6 0 -13`} />
        </g>
      )}
      <path d={shape.vessel} fill="var(--cup-glass)" />
      <g clipPath={`url(#v${id})`}>
        {rects}
        {look.topper && (
          <>
            <rect x="0" y={liquidTop} width="120" height={topperH + 0.5} fill={look.topper.color} />
            {look.topper.bubbly &&
              [0.2, 0.4, 0.6, 0.8].map((f, i) => (
                <circle key={i} cx={20 + f * 80} cy={liquidTop + 2} r={5 + (i % 2) * 2} fill={look.topper!.color} />
              ))}
          </>
        )}
        {look.ice &&
          [
            [44, 0.15],
            [60, 0.35],
            [48, 0.55],
          ].map(([x, f], i) => (
            <rect
              key={i}
              x={x}
              y={liquidTop + height * shape.fill * f}
              width="16"
              height="14"
              rx="3"
              fill="rgba(255,255,255,0.35)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              transform={`rotate(${i * 12 - 10} ${x + 8} ${liquidTop + 7})`}
            />
          ))}
      </g>
      {look.scoop && (
        <circle cx="60" cy={liquidTop - 2} r="17" fill={C.icecream} stroke="currentColor" strokeWidth="2" />
      )}
      {shape.extras}
      <path d={shape.vessel} {...stroke} />
      {shape.front}
    </svg>
  )
}
