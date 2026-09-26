/* eslint-disable react/only-export-components */
import type { ReactNode } from 'react'

const P = {
  coffee: '#6F4E37',
  espresso: '#3A2218',
  bean: '#7B4A2D',
  crema: '#C98A4B',
  caramel: '#C98A4B',
  cream: '#F7EEDF',
  milk: '#FFFFFF',
  oat: '#E8DCCB',
  chocolate: '#4A2A1C',
  sugar: '#FFFFFF',
  honey: '#E0A43A',
  maple: '#E0A43A',
  lemon: '#F2D24B',
  orange: '#E8923A',
  mint: '#7A9B5C',
  red: '#C2412D',
  pumpkin: '#D9772E',
  glass: '#D6E7EE',
  ice: '#D6E7EE',
  metal: '#B9B2A8',
  wood: '#A87A4F',
  coconut: '#F4EEE2',
  egg: '#F2C94C',
  tonic: '#E9F1F2',
  spirit: '#C77D2E',
} as const

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const ITEM_ICONS: Record<string, ReactNode> = {
  /* ─── Coffee ──────────────────────────────────────────────── */
  'whole-beans': (
    <>
      <ellipse cx="11" cy="17" rx="5.5" ry="8" transform="rotate(-20 11 17)" fill={P.bean} />
      <ellipse cx="21" cy="15" rx="5.5" ry="8" transform="rotate(25 21 15)" fill={P.bean} />
      <ellipse cx="11" cy="17" rx="5.5" ry="8" transform="rotate(-20 11 17)" {...s} />
      <path d="M12.5 10 C10 14, 13 19, 9.5 24" {...s} />
      <ellipse cx="21" cy="15" rx="5.5" ry="8" transform="rotate(25 21 15)" {...s} />
      <path d="M18.5 8 C22 12, 19 17, 23.5 22" {...s} />
    </>
  ),

  'ground-coffee': (
    <>
      <path d="M8 11 L24 11 L25 27 L7 27 Z" fill={P.coffee} />
      <path d="M10 6 L22 6 L24 11 L8 11 Z" fill={P.oat} />
      <ellipse cx="16" cy="19" rx="3.5" ry="4.5" fill={P.bean} />
      <path d="M8 11 L24 11 L25 27 L7 27 Z" {...s} />
      <path d="M10 6 L22 6 L24 11 L8 11 Z" {...s} />
      <path d="M13 6 L13 11 M19 6 L19 11" {...s} />
      <ellipse cx="16" cy="19" rx="3.5" ry="4.5" {...s} />
      <path d="M16 15.5 Q15 19 16 22.5" {...s} />
    </>
  ),

  'dark-roast': (
    <>
      <ellipse cx="16" cy="18" rx="8" ry="10" transform="rotate(-15 16 18)" fill={P.espresso} />
      <ellipse cx="16" cy="18" rx="8" ry="10" transform="rotate(-15 16 18)" {...s} />
      <path d="M17.5 9 C14 14, 18 21, 14.5 27" {...s} />
      <path d="M12 4 Q14 2 13 1 M18 5 Q20 3 19 2" {...s} />
    </>
  ),

  'espresso-beans': (
    <>
      <ellipse cx="11" cy="19" rx="5" ry="7" transform="rotate(-25 11 19)" fill={P.espresso} />
      <ellipse cx="20" cy="18" rx="5" ry="7" transform="rotate(25 20 18)" fill={P.espresso} />
      <circle cx="16" cy="7" r="3" fill={P.crema} />
      <ellipse cx="11" cy="19" rx="5" ry="7" transform="rotate(-25 11 19)" {...s} />
      <path d="M12 13 C10 16, 13 20, 10 24" {...s} />
      <ellipse cx="20" cy="18" rx="5" ry="7" transform="rotate(25 20 18)" {...s} />
      <path d="M18 12 C21 15, 18 19, 22 23" {...s} />
      <circle cx="16" cy="7" r="3" {...s} />
      <path d="M16 4 L16 1" {...s} />
    </>
  ),

  'instant-coffee': (
    <>
      <rect x="8" y="10" width="16" height="17" rx="3" fill={P.coffee} />
      <rect x="10" y="6" width="12" height="4" rx="1" fill={P.metal} />
      <rect x="11" y="15" width="10" height="8" rx="1" fill={P.milk} />
      <rect x="8" y="10" width="16" height="17" rx="3" {...s} />
      <rect x="10" y="6" width="12" height="4" rx="1" {...s} />
      <rect x="11" y="15" width="10" height="8" rx="1" {...s} />
      <path d="M13 18 L19 18 M13 20.5 L17 20.5" {...s} />
    </>
  ),

  'cold-brew-concentrate': (
    <>
      <path d="M10 16 L22 16 L22 24 Q22 27 16 27 Q10 27 10 24 Z" fill={P.espresso} />
      <rect x="12" y="4" width="8" height="3" rx="1" fill={P.wood} />
      <path d="M13 7 L19 7 L19 12 L23 15 L23 25 Q23 28 16 28 Q9 28 9 25 L9 15 L13 12 Z" {...s} />
      <rect x="12" y="4" width="8" height="3" rx="1" {...s} />
      <path d="M12 20 Q16 18 20 20" {...s} />
    </>
  ),

  /* ─── Dairy & Milks ───────────────────────────────────────── */
  'whole-milk': (
    <>
      <path d="M8 10 L24 10 L24 27 L8 27 Z" fill={P.milk} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" fill={P.cream} />
      <path d="M8 10 L24 10 L24 27 L8 27 Z" {...s} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" {...s} />
      <path d="M16 5 L16 10" {...s} />
      <path d="M11 18 Q16 21 21 18" {...s} />
    </>
  ),

  'two-percent-milk': (
    <>
      <path d="M8 10 L24 10 L24 27 L8 27 Z" fill={P.milk} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" fill={P.glass} />
      <path d="M8 10 L24 10 L24 27 L8 27 Z" {...s} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" {...s} />
      <path d="M16 5 L16 10" {...s} />
      <path d="M13.5 16 C13.5 14.5, 17.5 14.5, 17.5 17 C17.5 19, 13.5 20.5, 13.5 22.5 L18.5 22.5" {...s} />
    </>
  ),

  'oat-milk': (
    <>
      <path d="M8 10 L24 10 L24 27 L8 27 Z" fill={P.oat} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" fill={P.milk} />
      <path d="M8 10 L24 10 L24 27 L8 27 Z" {...s} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" {...s} />
      <path d="M16 5 L16 10" {...s} />
      <path d="M16 23 L16 14" {...s} />
      <path d="M16 16 Q13.5 15 14 17 Q16 17.5 16 16" {...s} />
      <path d="M16 18 Q18.5 17 18 19 Q16 19.5 16 18" {...s} />
      <path d="M16 20 Q13.5 19 14 21 Q16 21.5 16 20" {...s} />
    </>
  ),

  'almond-milk': (
    <>
      <path d="M8 10 L24 10 L24 27 L8 27 Z" fill={P.milk} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" fill={P.cream} />
      <path d="M16 14 C13 18, 13 22, 16 24 C19 22, 19 18, 16 14 Z" fill={P.wood} />
      <path d="M8 10 L24 10 L24 27 L8 27 Z" {...s} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" {...s} />
      <path d="M16 5 L16 10" {...s} />
      <path d="M16 14 C13 18, 13 22, 16 24 C19 22, 19 18, 16 14 Z" {...s} />
    </>
  ),

  'coconut-milk': (
    <>
      <path d="M8 10 L24 10 L24 27 L8 27 Z" fill={P.coconut} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" fill={P.wood} />
      <path d="M12 18 Q16 24 20 18 Z" fill={P.wood} />
      <ellipse cx="16" cy="18" rx="4" ry="1.5" fill={P.coconut} />
      <path d="M8 10 L24 10 L24 27 L8 27 Z" {...s} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" {...s} />
      <path d="M16 5 L16 10" {...s} />
      <path d="M12 18 Q16 24 20 18" {...s} />
      <ellipse cx="16" cy="18" rx="4" ry="1.5" {...s} />
    </>
  ),

  'heavy-cream': (
    <>
      <path d="M9 16 L22 16 L22 25 Q22 27 16 27 Q9 27 9 25 Z" fill={P.cream} />
      <path d="M13 12 Q16 8 18 10 Q20 12 17 14 Z" fill={P.milk} />
      <path d="M7 14 L22 14 L22 25 Q22 27 16 27 Q9 27 9 25 L7 14 Z" {...s} />
      <path d="M22 16 Q26 16 26 21 Q26 24 21 24" {...s} />
      <path d="M13 12 Q16 8 18 10 Q20 12 17 14" {...s} />
    </>
  ),

  'half-and-half': (
    <>
      <path d="M8 10 L16 10 L16 27 L8 27 Z" fill={P.milk} />
      <path d="M16 10 L24 10 L24 27 L16 27 Z" fill={P.cream} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" fill={P.oat} />
      <path d="M8 10 L24 10 L24 27 L8 27 Z" {...s} />
      <path d="M11 5 L21 5 L24 10 L8 10 Z" {...s} />
      <path d="M16 5 L16 27" {...s} />
    </>
  ),

  'whipped-cream': (
    <>
      <path d="M8 24 Q6 20 9 18 Q8 14 12 13 Q15 6 17 6 Q16 10 20 11 Q24 13 23 18 Q26 21 24 24 Z" fill={P.cream} />
      <path d="M8 24 Q6 20 9 18 Q8 14 12 13 Q15 6 17 6 Q16 10 20 11 Q24 13 23 18 Q26 21 24 24 Z" {...s} />
      <path d="M17 6 Q14 14 16 24 M12 13 Q15 17 21 22 M20 11 Q19 16 24 20" {...s} />
      <ellipse cx="16" cy="24" rx="8" ry="2" {...s} />
    </>
  ),

  'sweetened-condensed-milk': (
    <>
      <path d="M8 9 L24 9 L24 25 Q16 28 8 25 Z" fill={P.metal} />
      <rect x="8" y="13" width="16" height="8" fill={P.caramel} />
      <ellipse cx="16" cy="9" rx="8" ry="2.5" {...s} fill={P.metal} />
      <path d="M8 9 L8 25 Q16 28 24 25 L24 9" {...s} />
      <path d="M8 13 Q16 16 24 13 M8 21 Q16 24 24 21" {...s} />
    </>
  ),

  'evaporated-milk': (
    <>
      <path d="M8 9 L24 9 L24 25 Q16 28 8 25 Z" fill={P.metal} />
      <rect x="8" y="13" width="16" height="8" fill={P.milk} />
      <ellipse cx="16" cy="9" rx="8" ry="2.5" {...s} fill={P.metal} />
      <path d="M8 9 L8 25 Q16 28 24 25 L24 9" {...s} />
      <path d="M8 13 Q16 16 24 13 M8 21 Q16 24 24 21" {...s} />
      <path d="M16 15 Q14 18 16 19 Q18 18 16 15 Z" {...s} fill={P.glass} />
    </>
  ),

  'vanilla-ice-cream': (
    <>
      <path d="M10 16 L22 16 L16 28 Z" fill={P.wood} />
      <circle cx="16" cy="12" r="6.5" fill={P.cream} />
      <path d="M10 16 L22 16 L16 28 Z" {...s} />
      <circle cx="16" cy="12" r="6.5" {...s} />
      <path d="M12 19 L19 23 M13 23 L20 19" {...s} />
    </>
  ),

  butter: (
    <>
      <path d="M8 15 L16 18 L24 14 L24 20 L16 24 L8 20 Z" fill={P.egg} />
      <path d="M8 15 L16 18 L24 14 L16 11 Z" fill={P.lemon} />
      <path d="M8 15 L16 18 L24 14 L16 11 Z" {...s} />
      <path d="M8 15 L8 20 L16 24 L24 20 L24 14" {...s} />
      <path d="M16 18 L16 24" {...s} />
      <path d="M5 23 Q16 27 27 23" {...s} />
    </>
  ),

  egg: (
    <>
      <path
        d="M16 5 C11 5, 8 13, 8 20 C8 25, 11.5 28, 16 28 C20.5 28, 24 25, 24 20 C24 13, 21 5, 16 5 Z"
        fill={P.cream}
      />
      <circle cx="16" cy="19" r="4.5" fill={P.egg} />
      <path d="M16 5 C11 5, 8 13, 8 20 C8 25, 11.5 28, 16 28 C20.5 28, 24 25, 24 20 C24 13, 21 5, 16 5 Z" {...s} />
      <circle cx="16" cy="19" r="4.5" {...s} />
    </>
  ),

  /* ─── Sweeteners ──────────────────────────────────────────── */
  sugar: (
    <>
      <path d="M6 16 L13 13 L18 15 L18 22 L11 25 L6 22 Z" fill={P.sugar} />
      <path d="M15 11 L22 8 L27 10 L27 17 L22 20 L15 17 Z" fill={P.sugar} />
      <path d="M15 11 L22 8 L27 10 L20 13 Z" {...s} />
      <path d="M27 10 L27 17 L22 20 L20 13" {...s} />
      <path d="M6 16 L13 13 L18 15 L11 18 Z" {...s} />
      <path d="M6 16 L6 22 L11 25 L18 22 L18 15" {...s} />
      <path d="M11 18 L11 25" {...s} />
    </>
  ),

  'brown-sugar': (
    <>
      <path d="M6 16 L13 13 L18 15 L18 22 L11 25 L6 22 Z" fill={P.caramel} />
      <path d="M15 11 L22 8 L27 10 L27 17 L22 20 L15 17 Z" fill={P.caramel} />
      <path d="M15 11 L22 8 L27 10 L20 13 Z" {...s} />
      <path d="M27 10 L27 17 L22 20 L20 13" {...s} />
      <path d="M6 16 L13 13 L18 15 L11 18 Z" {...s} />
      <path d="M6 16 L6 22 L11 25 L18 22 L18 15" {...s} />
      <path d="M11 18 L11 25" {...s} />
    </>
  ),

  piloncillo: (
    <>
      <path d="M12 9 Q16 11 20 9 L26 25 Q16 28 6 25 Z" fill={P.caramel} />
      <ellipse cx="16" cy="9" rx="4" ry="1.5" fill={P.wood} />
      <path d="M12 9 L6 25 Q16 28 26 25 L20 9" {...s} />
      <ellipse cx="16" cy="9" rx="4" ry="1.5" {...s} />
      <path d="M9 17 Q16 20 23 17" {...s} />
    </>
  ),

  honey: (
    <>
      <path d="M10 11 Q7 19 10 24 Q16 27 22 24 Q25 19 22 11 Z" fill={P.wood} />
      <path d="M11 14 Q16 16 21 14 Q22 20 18 22 Q13 22 11 14 Z" fill={P.honey} />
      <ellipse cx="16" cy="11" rx="6" ry="2" {...s} fill={P.wood} />
      <path d="M10 11 Q7 19 10 24 Q16 27 22 24 Q25 19 22 11" {...s} />
      <path d="M16 11 L22 4 M20 4 L23 7" {...s} />
      <path d="M13 12 Q14 17 15 17 Q16 17 16 12" {...s} fill={P.honey} />
    </>
  ),

  'maple-syrup': (
    <>
      <path d="M10 14 Q8 21 10 25 Q16 28 22 25 Q24 21 22 14 Z" fill={P.maple} />
      <rect x="13" y="4" width="6" height="3" rx="1" fill={P.wood} />
      <path d="M13 6 L19 6 L19 10 L22 13 Q25 19 22 25 Q16 28 10 25 Q7 19 10 13 L13 10 Z" {...s} />
      <rect x="13" y="4" width="6" height="3" rx="1" {...s} />
      <path d="M19 11 Q23 11 23 15 Q23 17 21 17" {...s} />
      <path d="M16 16 L17 18 L19 17 L18 19 L20 20 L17 21 L16 23 L15 21 L12 20 L14 19 L13 17 L15 18 Z" {...s} />
    </>
  ),

  'simple-syrup': (
    <>
      <rect x="10" y="14" width="12" height="13" rx="2" fill={P.glass} />
      <rect x="13" y="9" width="6" height="3" rx="0.5" fill={P.metal} />
      <rect x="10" y="12" width="12" height="15" rx="2" {...s} />
      <rect x="13" y="9" width="6" height="3" rx="0.5" {...s} />
      <path d="M16 9 L16 5 M16 5 L11 5" {...s} />
      <path d="M16 4 L18 4" {...s} />
      <path d="M11 18 Q16 17 21 18" {...s} />
    </>
  ),

  'vanilla-syrup': (
    <>
      <rect x="10" y="14" width="12" height="13" rx="2" fill={P.caramel} />
      <rect x="13" y="9" width="6" height="3" rx="0.5" fill={P.metal} />
      <rect x="10" y="12" width="12" height="15" rx="2" {...s} />
      <rect x="13" y="9" width="6" height="3" rx="0.5" {...s} />
      <path d="M16 9 L16 5 M16 5 L11 5" {...s} />
      <path d="M16 4 L18 4" {...s} />
      <path d="M16 16 Q18 20 15 24" {...s} />
    </>
  ),

  'caramel-sauce': (
    <>
      <rect x="10" y="12" width="12" height="14" rx="2" fill={P.caramel} />
      <path d="M12 12 L15 5 L17 5 L20 12" fill={P.cream} />
      <rect x="10" y="12" width="12" height="14" rx="2" {...s} />
      <path d="M12 12 L15 5 L17 5 L20 12 Z" {...s} />
      <path d="M10 16 L22 16 M10 22 L22 22" {...s} />
    </>
  ),

  'chocolate-sauce': (
    <>
      <rect x="10" y="12" width="12" height="14" rx="2" fill={P.chocolate} />
      <path d="M12 12 L15 5 L17 5 L20 12" fill={P.cream} />
      <rect x="10" y="12" width="12" height="14" rx="2" {...s} />
      <path d="M12 12 L15 5 L17 5 L20 12 Z" {...s} />
      <path d="M10 16 L22 16 M10 22 L22 22" {...s} />
    </>
  ),

  /* ─── Flavor & Spices ─────────────────────────────────────── */
  'cocoa-powder': (
    <>
      <path d="M9 11 L23 11 L23 25 Q16 27 9 25 Z" fill={P.chocolate} />
      <ellipse cx="16" cy="11" rx="7" ry="2.5" fill={P.metal} />
      <ellipse cx="16" cy="11" rx="7" ry="2.5" {...s} />
      <path d="M9 11 L9 25 Q16 28 23 25 L23 11" {...s} />
      <ellipse cx="16" cy="19" rx="3" ry="2" transform="rotate(-20 16 19)" {...s} />
      <path d="M15 17.5 Q16 19 17 20.5" {...s} />
    </>
  ),

  'dark-chocolate': (
    <>
      <rect x="9" y="8" width="14" height="16" rx="2" fill={P.chocolate} />
      <path d="M8 17 L13 15 L19 15 L24 17 L23 26 L9 26 Z" fill={P.red} />
      <rect x="9" y="8" width="14" height="16" rx="2" {...s} />
      <path d="M9 13 L23 13 M16 8 L16 18" {...s} />
      <path d="M8 17 L13 15 L19 15 L24 17 L23 26 L9 26 Z" {...s} />
    </>
  ),

  cinnamon: (
    <>
      <path d="M8 10 L18 26 L21 24 L11 8 Z" fill={P.wood} />
      <path d="M21 10 L11 26 L8 24 L18 8 Z" fill={P.bean} />
      <path d="M8 10 L18 26 L21 24 L11 8 Z" {...s} />
      <ellipse cx="9.5" cy="9" rx="2" ry="1.2" transform="rotate(30 9.5 9)" {...s} />
      <path d="M21 10 L11 26 L8 24 L18 8 Z" {...s} />
      <ellipse cx="19.5" cy="9" rx="2" ry="1.2" transform="rotate(-30 19.5 9)" {...s} />
    </>
  ),

  cardamom: (
    <>
      <path d="M10 22 C6 18, 6 12, 12 8 C16 12, 16 18, 10 22 Z" fill={P.mint} />
      <path d="M20 24 C16 20, 16 14, 22 10 C26 14, 26 20, 20 24 Z" fill={P.mint} />
      <path d="M10 22 C6 18, 6 12, 12 8 C16 12, 16 18, 10 22 Z" {...s} />
      <path d="M10 22 L12 8 M7.5 15 Q10 16 13.5 14" {...s} />
      <path d="M20 24 C16 20, 16 14, 22 10 C26 14, 26 20, 20 24 Z" {...s} />
      <path d="M20 24 L22 10 M17.5 17 Q20 18 23.5 16" {...s} />
    </>
  ),

  nutmeg: (
    <>
      <ellipse cx="16" cy="16" rx="8" ry="10" transform="rotate(-15 16 16)" fill={P.wood} />
      <ellipse cx="16" cy="16" rx="8" ry="10" transform="rotate(-15 16 16)" {...s} />
      <path d="M12 11 Q15 13 14 17 M17 11 Q18 15 16 20 M19 14 Q21 18 18 22 M11 18 Q14 20 13 23" {...s} />
    </>
  ),

  'pumpkin-puree': (
    <>
      <ellipse cx="16" cy="18" rx="10" ry="8" fill={P.pumpkin} />
      <path d="M15 10 L15 7 Q17 6 18 7 L17 10" fill={P.mint} />
      <ellipse cx="16" cy="18" rx="10" ry="8" {...s} />
      <path d="M16 10 C12 10, 10 13, 10 18 C10 23, 12 26, 16 26" {...s} />
      <path d="M16 10 C20 10, 22 13, 22 18 C22 23, 20 26, 16 26" {...s} />
      <path d="M15 10 L15 7 Q17 6 18 7 L17 10 Z" {...s} />
    </>
  ),

  'pumpkin-pie-spice': (
    <>
      <rect x="10" y="13" width="12" height="13" rx="2" fill={P.pumpkin} />
      <rect x="11" y="7" width="10" height="4" rx="1" fill={P.metal} />
      <rect x="10" y="11" width="12" height="15" rx="2" {...s} />
      <rect x="11" y="7" width="10" height="4" rx="1" {...s} />
      <circle cx="14" cy="9" r="0.75" fill="currentColor" />
      <circle cx="16" cy="9" r="0.75" fill="currentColor" />
      <circle cx="18" cy="9" r="0.75" fill="currentColor" />
      <rect x="12" y="16" width="8" height="5" rx="1" {...s} fill={P.cream} />
    </>
  ),

  'vanilla-extract': (
    <>
      <rect x="8" y="13" width="9" height="13" rx="1.5" fill={P.espresso} />
      <rect x="10" y="8" width="5" height="4" rx="1" fill={P.cream} />
      <rect x="9.5" y="16" width="6" height="6" rx="0.5" fill={P.cream} />
      <rect x="8" y="12" width="9" height="14" rx="1.5" {...s} />
      <rect x="10" y="8" width="5" height="4" rx="1" {...s} />
      <rect x="9.5" y="16" width="6" height="6" rx="0.5" {...s} />
      <path d="M19 6 Q25 15 22 26" {...s} />
    </>
  ),

  orange: (
    <>
      <circle cx="16" cy="16" r="10" fill={P.orange} />
      <circle cx="16" cy="16" r="7.5" fill={P.cream} />
      <circle cx="16" cy="16" r="10" {...s} />
      <circle cx="16" cy="16" r="7.5" {...s} />
      <path d="M16 8.5 L16 23.5 M8.5 16 L23.5 16 M10.7 10.7 L21.3 21.3 M10.7 21.3 L21.3 10.7" {...s} />
      <circle cx="16" cy="16" r="1.5" fill={P.orange} />
    </>
  ),

  lemon: (
    <>
      <circle cx="16" cy="16" r="10" fill={P.lemon} />
      <circle cx="16" cy="16" r="7.5" fill={P.cream} />
      <circle cx="16" cy="16" r="10" {...s} />
      <circle cx="16" cy="16" r="7.5" {...s} />
      <path d="M16 8.5 L16 23.5 M8.5 16 L23.5 16 M10.7 10.7 L21.3 21.3 M10.7 21.3 L21.3 10.7" {...s} />
      <circle cx="16" cy="16" r="1.5" fill={P.lemon} />
    </>
  ),

  salt: (
    <>
      <path d="M11 13 L21 13 L22 25 Q22 26 16 26 Q10 26 10 25 Z" fill={P.glass} />
      <path d="M11 13 Q16 6 21 13 Z" fill={P.metal} />
      <path d="M11 13 L21 13 L22 25 Q22 26 16 26 Q10 26 10 25 Z" {...s} />
      <path d="M11 13 Q16 6 21 13 Z" {...s} />
      <path d="M11 20 Q16 19 21 20" {...s} />
      <circle cx="16" cy="10" r="0.75" fill="currentColor" />
    </>
  ),

  'star-anise': (
    <>
      <path d="M16 6 L18 13 L25 11 L20 16 L25 21 L18 19 L16 26 L14 19 L7 21 L12 16 L7 11 L14 13 Z" fill={P.bean} />
      <circle cx="16" cy="16" r="3" fill={P.wood} />
      <path d="M16 6 L18 13 L25 11 L20 16 L25 21 L18 19 L16 26 L14 19 L7 21 L12 16 L7 11 L14 13 Z" {...s} />
      <circle cx="16" cy="16" r="3" {...s} />
    </>
  ),

  mint: (
    <>
      <path d="M16 16 C10 15, 8 8, 15 5 C22 5, 21 13, 16 16 Z" fill={P.mint} />
      <path d="M16 18 C11 21, 10 27, 18 27 C23 25, 21 19, 16 18 Z" fill={P.mint} />
      <path d="M16 16 C10 15, 8 8, 15 5 C22 5, 21 13, 16 16 Z" {...s} />
      <path d="M16 18 C11 21, 10 27, 18 27 C23 25, 21 19, 16 18 Z" {...s} />
      <path d="M15 5 Q16 11 16 16 M18 27 Q17 22 16 18" {...s} />
      <path d="M16 16 L16 21" {...s} />
    </>
  ),

  cloves: (
    <>
      <path d="M11 25 L14 14 L18 14 L15 25 Z" fill={P.bean} />
      <circle cx="16" cy="11" r="3.5" fill={P.bean} />
      <path d="M19 25 L22 19 L25 20 L22 26 Z" fill={P.chocolate} />
      <circle cx="24" cy="18" r="2.5" fill={P.chocolate} />
      <path d="M11 25 L14 14 L18 14 L15 25 Z" {...s} />
      <circle cx="16" cy="11" r="3.5" {...s} />
      <path d="M13 14 L12 11 M18 14 L19 11" {...s} />
      <path d="M19 25 L22 19 L25 20 L22 26 Z" {...s} />
      <circle cx="24" cy="18" r="2.5" {...s} />
    </>
  ),

  cayenne: (
    <>
      <path d="M10 11 Q12 21 24 24 Q18 18 16 11 Z" fill={P.red} />
      <path d="M10 11 Q13 13 16 11 L16 12 Q13 13 10 12 Z" fill={P.mint} />
      <path d="M10 11 Q12 21 24 24 Q18 18 16 11 Z" {...s} />
      <path d="M10 11 Q13 13 16 11" {...s} />
      <path d="M13 11 Q12 6 8 6" {...s} />
    </>
  ),

  /* ─── Spirits ─────────────────────────────────────────────── */
  whiskey: (
    <>
      <rect x="9" y="13" width="14" height="13" rx="1.5" fill={P.spirit} />
      <rect x="12" y="3" width="8" height="3" rx="1" fill={P.wood} />
      <rect x="11" y="16" width="10" height="6" rx="0.5" fill={P.cream} />
      <rect x="9" y="11" width="14" height="15" rx="1.5" {...s} />
      <path d="M13 11 L13 6 L19 6 L19 11" {...s} />
      <rect x="12" y="3" width="8" height="3" rx="1" {...s} />
      <rect x="11" y="16" width="10" height="6" rx="0.5" {...s} />
    </>
  ),

  'coffee-liqueur': (
    <>
      <path d="M10 15 Q10 12 16 11 Q22 12 22 15 L22 26 L10 26 Z" fill={P.espresso} />
      <rect x="13" y="3" width="6" height="2.5" rx="1" fill={P.crema} />
      <rect x="11.5" y="16" width="9" height="7" rx="1" fill={P.cream} />
      <path d="M10 15 Q10 11 14 10 L14 5 L18 5 L18 10 Q22 11 22 15 L22 26 L10 26 Z" {...s} />
      <rect x="13" y="3" width="6" height="2.5" rx="1" {...s} />
      <rect x="11.5" y="16" width="9" height="7" rx="1" {...s} />
    </>
  ),

  vodka: (
    <>
      <rect x="11" y="13" width="10" height="13" rx="1" fill={P.glass} />
      <rect x="13.5" y="2.5" width="5" height="2.5" rx="0.5" fill={P.metal} />
      <path d="M11 13 L14 10 L14 4 L18 4 L18 10 L21 13 L21 26 Q21 27 16 27 Q11 27 11 26 Z" {...s} />
      <rect x="13.5" y="2.5" width="5" height="2.5" rx="0.5" {...s} />
      <path d="M13 16 L19 16 M13 19 L19 19 M14 22 L18 22" {...s} />
    </>
  ),

  'licor-43': (
    <>
      <path d="M10 17 Q8 26 16 26 Q24 26 22 17 L19 11 L13 11 Z" fill={P.egg} />
      <rect x="12" y="3" width="8" height="2.5" rx="0.5" fill={P.spirit} />
      <circle cx="16" cy="19" r="4" fill={P.cream} />
      <path d="M10 17 Q8 26 16 26 Q24 26 22 17 L19 11 L19 5 L13 5 L13 11 Z" {...s} />
      <rect x="12" y="3" width="8" height="2.5" rx="0.5" {...s} />
      <circle cx="16" cy="19" r="4" {...s} />
      <path d="M14.5 18 L14.5 20 M14.5 20 L16 20 M16 17 L16 21" {...s} strokeWidth={1.2} />
    </>
  ),

  /* ─── Basics ──────────────────────────────────────────────── */
  water: (
    <>
      <path
        d="M16 5 C16 5, 8 16, 8 20 C8 24.5, 11.5 28, 16 28 C20.5 28, 24 24.5, 24 20 C24 16, 16 5, 16 5 Z"
        fill={P.glass}
      />
      <path d="M16 5 C16 5, 8 16, 8 20 C8 24.5, 11.5 28, 16 28 C20.5 28, 24 24.5, 24 20 C24 16, 16 5, 16 5 Z" {...s} />
      <path d="M12 18 Q12 23 15 25" {...s} strokeWidth={1.5} />
    </>
  ),

  ice: (
    <>
      <path d="M6 16 L12 13 L18 15 L18 22 L12 25 L6 22 Z" fill={P.ice} />
      <path d="M14 10 L20 7 L26 9 L26 16 L20 19 L14 16 Z" fill={P.ice} />
      <path d="M14 10 L20 7 L26 9 L20 12 Z" {...s} />
      <path d="M26 9 L26 16 L20 19 L20 12" {...s} />
      <path d="M6 16 L12 13 L18 15 L12 18 Z" {...s} />
      <path d="M6 16 L6 22 L12 25 L18 22 L18 15" {...s} />
      <path d="M12 18 L12 25" {...s} />
    </>
  ),

  'tonic-water': (
    <>
      <path d="M10 11 L22 11 L21 26 Q21 27 16 27 Q11 27 11 26 Z" fill={P.tonic} />
      <path d="M9 8 L23 8 L21 26 Q21 27 16 27 Q11 27 11 26 Z" {...s} />
      <circle cx="14" cy="15" r="1.2" {...s} fill={P.glass} />
      <circle cx="18" cy="18" r="1.5" {...s} fill={P.glass} />
      <circle cx="13" cy="22" r="1.2" {...s} fill={P.glass} />
      <circle cx="17" cy="12" r="0.8" {...s} fill={P.glass} />
    </>
  ),

  'sparkling-water': (
    <>
      <path d="M10 11 L22 11 L21 26 Q21 27 16 27 Q11 27 11 26 Z" fill={P.glass} />
      <path d="M9 8 L23 8 L21 26 Q21 27 16 27 Q11 27 11 26 Z" {...s} />
      <circle cx="13" cy="14" r="1" {...s} fill={P.tonic} />
      <circle cx="18" cy="16" r="1.2" {...s} fill={P.tonic} />
      <circle cx="15" cy="21" r="1" {...s} fill={P.tonic} />
      <circle cx="14" cy="25" r="0.8" {...s} fill={P.tonic} />
      <path d="M12 5 L12 7 M16 4 L16 6 M20 5 L20 7" {...s} />
    </>
  ),

  /* ─── Equipment ───────────────────────────────────────────── */
  'espresso-machine': (
    <>
      <rect x="6" y="6" width="20" height="20" rx="2" fill={P.metal} />
      <rect x="8" y="16" width="16" height="8" rx="1" fill={P.espresso} />
      <rect x="6" y="6" width="20" height="20" rx="2" {...s} />
      <rect x="8" y="16" width="16" height="8" rx="1" {...s} />
      <rect x="14" y="16" width="4" height="3" {...s} fill={P.metal} />
      <path d="M18 18 L24 20" {...s} strokeWidth={2} />
      <circle cx="11" cy="11" r="2.5" {...s} />
    </>
  ),

  'moka-pot': (
    <>
      <path d="M10 19 L12 27 L20 27 L22 19 Z" fill={P.metal} />
      <path d="M9 11 L10 18 L22 18 L23 11 L18 11 L16 7 L14 11 Z" fill={P.metal} />
      <circle cx="16" cy="6.5" r="1.5" fill={P.espresso} />
      <path d="M9 11 L10 18 L22 18 L23 11 Z" {...s} />
      <path d="M8 11 L16 8 L24 11" {...s} />
      <circle cx="16" cy="6.5" r="1.5" {...s} />
      <path d="M10 19 L12 27 L20 27 L22 19 Z" {...s} />
      <path d="M9 18.5 L23 18.5" {...s} />
      <path d="M16 11 L16 18 M16 19 L16 27" {...s} />
      <path d="M22 12 Q27 14 26 19 Q25 23 21 24" {...s} />
    </>
  ),

  'french-press': (
    <>
      <rect x="9" y="10" width="14" height="16" rx="1" fill={P.glass} />
      <rect x="9" y="17" width="14" height="9" fill={P.coffee} />
      <circle cx="16" cy="3" r="1.5" fill={P.metal} />
      <rect x="9" y="10" width="14" height="16" rx="1" {...s} />
      <path d="M8 10 L24 10" {...s} />
      <path d="M16 3 L16 17" {...s} />
      <circle cx="16" cy="3" r="1.5" {...s} />
      <path d="M9 17 L23 17" {...s} />
      <path d="M8 13 L24 13 M8 23 L24 23" {...s} />
      <path d="M23 13 Q27 13 27 18 Q27 23 23 23" {...s} />
    </>
  ),

  'pour-over': (
    <>
      <path d="M7 9 L25 9 L18 20 L14 20 Z" fill={P.oat} />
      <path d="M12 21 L11 27 Q16 28 21 27 L20 21 Z" fill={P.glass} />
      <path d="M7 9 L25 9 L18 20 L14 20 Z" {...s} />
      <path d="M6 20.5 L26 20.5" {...s} />
      <path d="M11 9 L14 18 M16 9 L16 19 M21 9 L18 18" {...s} />
      <path d="M12 21 L11 27 Q16 28 21 27 L20 21" {...s} />
      <path d="M24 11 Q28 13 24 16" {...s} />
    </>
  ),

  chemex: (
    <>
      <path d="M8 7 L24 7 L17 16 L24 26 Q24 27 16 27 Q8 27 8 26 L15 16 Z" fill={P.glass} />
      <rect x="12" y="15" width="8" height="5" rx="1" fill={P.wood} />
      <path d="M8 7 L24 7 L17 16 L24 26 Q24 27 16 27 Q8 27 8 26 L15 16 Z" {...s} />
      <rect x="12" y="15" width="8" height="5" rx="1" {...s} />
      <path d="M16 17 L16 22 M14 22 L18 22" {...s} />
    </>
  ),

  aeropress: (
    <>
      <rect x="11" y="13" width="10" height="11" fill={P.espresso} />
      <rect x="12" y="7" width="8" height="7" fill={P.metal} />
      <path d="M9 24 L23 24 L21 27 L11 27 Z" fill={P.espresso} />
      <rect x="11" y="13" width="10" height="11" {...s} />
      <rect x="12" y="7" width="8" height="7" {...s} />
      <path d="M9 6 L23 6" {...s} />
      <path d="M9 24 L23 24 L21 27 L11 27 Z" {...s} />
      <circle cx="16" cy="16" r="0.75" fill={P.cream} />
      <circle cx="16" cy="19" r="0.75" fill={P.cream} />
    </>
  ),

  'drip-machine': (
    <>
      <path d="M8 6 L22 6 L22 12 L16 12 L16 23 L24 23 L24 26 L8 26 Z" fill={P.metal} />
      <path d="M14 15 L22 15 L23 23 L13 23 Z" fill={P.glass} />
      <path d="M14 19 L22 19 L23 23 L13 23 Z" fill={P.coffee} />
      <path d="M8 6 L22 6 L22 12 L16 12 L16 23 L24 23 L24 26 L8 26 Z" {...s} />
      <path d="M14 15 L22 15 L23 23 L13 23 Z" {...s} />
      <path d="M22 16 Q25 16 25 19 Q25 22 22 22" {...s} />
    </>
  ),

  'phin-filter': (
    <>
      <rect x="10" y="12" width="12" height="11" fill={P.metal} />
      <rect x="9" y="9" width="14" height="3" rx="1" fill={P.metal} />
      <circle cx="16" cy="7" r="1.5" fill={P.metal} />
      <rect x="10" y="12" width="12" height="11" {...s} />
      <rect x="9" y="9" width="14" height="3" rx="1" {...s} />
      <path d="M5 23 L27 23" {...s} strokeWidth={2} />
      <circle cx="16" cy="7" r="1.5" {...s} />
      <path d="M10 15 L22 15 M10 19 L22 19" {...s} />
    </>
  ),

  cezve: (
    <>
      <path d="M10 13 L8 24 Q16 28 22 24 L20 13 Z" fill={P.caramel} />
      <rect x="23" y="5" width="6" height="3" rx="1" transform="rotate(-40 26 6.5)" fill={P.wood} />
      <path d="M10 13 L8 24 Q16 28 22 24 L20 13 Z" {...s} />
      <ellipse cx="15" cy="13" rx="5" ry="1.5" {...s} />
      <path d="M19 14 L24 9.5" {...s} strokeWidth={2} />
      <rect x="23" y="5" width="6" height="3" rx="1" transform="rotate(-40 26 6.5)" {...s} />
    </>
  ),

  'milk-frother': (
    <>
      <rect x="8" y="5" width="6" height="11" rx="1.5" fill={P.metal} />
      <circle cx="23" cy="24" r="3" fill={P.milk} />
      <rect x="8" y="5" width="6" height="11" rx="1.5" {...s} />
      <circle cx="11" cy="8" r="1" fill="currentColor" />
      <path d="M11 16 L20 25" {...s} strokeWidth={1.5} />
      <circle cx="21" cy="26" r="2.5" {...s} />
      <circle cx="24" cy="23" r="2" {...s} />
    </>
  ),

  blender: (
    <>
      <path d="M10 8 L20 8 L18 19 L11 19 Z" fill={P.glass} />
      <path d="M10 19 L22 19 L23 27 L9 27 Z" fill={P.metal} />
      <path d="M10 8 L20 8 L18 19 L11 19 Z" {...s} />
      <path d="M9 8 L21 8" {...s} />
      <path d="M10 10 L6 10 L6 16 L11 16" {...s} />
      <path d="M10 19 L22 19 L23 27 L9 27 Z" {...s} />
      <circle cx="16" cy="23" r="2" {...s} />
    </>
  ),

  grinder: (
    <>
      <rect x="9" y="14" width="14" height="12" rx="2" fill={P.wood} />
      <path d="M12 14 L20 14 L18 11 L14 11 Z" fill={P.metal} />
      <circle cx="24" cy="5" r="1.5" fill={P.wood} />
      <rect x="9" y="14" width="14" height="12" rx="2" {...s} />
      <path d="M12 14 L20 14 L18 11 L14 11 Z" {...s} />
      <path d="M16 11 L16 7 M16 7 L24 5" {...s} />
      <circle cx="24" cy="5" r="1.5" {...s} />
      <path d="M12 21 L20 21" {...s} />
      <circle cx="16" cy="21" r="1" fill="currentColor" />
    </>
  ),

  kettle: (
    <>
      <path d="M10 14 Q8 26 16 26 Q24 26 22 14 Z" fill={P.metal} />
      <path d="M10 14 Q8 26 16 26 Q24 26 22 14 Z" {...s} />
      <path d="M12 14 L20 14" {...s} />
      <circle cx="16" cy="12" r="1.5" {...s} fill={P.metal} />
      <path d="M11 14 C11 7, 21 7, 21 14" {...s} strokeWidth={2} />
      <path d="M9 19 L4 14 L6 13 L11 16" {...s} />
    </>
  ),

  'gooseneck-kettle': (
    <>
      <path d="M11 14 L9 25 Q16 27 23 25 L21 14 Z" fill={P.metal} />
      <path d="M11 14 L9 25 Q16 27 23 25 L21 14 Z" {...s} />
      <path d="M11 14 L21 14" {...s} />
      <circle cx="16" cy="12" r="1.5" {...s} fill={P.metal} />
      <path d="M10 22 C6 22, 4 16, 5 12 C5.5 10, 7 9, 6 8" {...s} strokeWidth={2} />
      <path d="M21 15 L26 15 L26 22 L22 24" {...s} strokeWidth={2} />
    </>
  ),

  whisk: (
    <>
      <rect x="6" y="6" width="4" height="9" rx="1.5" transform="rotate(-45 8 10)" fill={P.wood} />
      <rect x="6" y="6" width="4" height="9" rx="1.5" transform="rotate(-45 8 10)" {...s} />
      <path d="M13 13 C14 18, 22 26, 26 26 C26 22, 18 14, 13 13 Z" {...s} />
      <path d="M14 12 C18 14, 26 20, 26 24 C24 26, 20 26, 12 14" {...s} />
      <path d="M13 13 L25 25" {...s} />
    </>
  ),

  'cocktail-shaker': (
    <>
      <path d="M10 15 L12 26 L20 26 L22 15 Z" fill={P.metal} />
      <path d="M11 15 L13 9 L19 9 L21 15 Z" fill={P.metal} />
      <rect x="13" y="5" width="6" height="4" rx="1" fill={P.metal} />
      <path d="M10 15 L12 26 L20 26 L22 15 Z" {...s} />
      <path d="M10 15 L22 15" {...s} />
      <path d="M11 15 L13 9 L19 9 L21 15 Z" {...s} />
      <rect x="13" y="5" width="6" height="4" rx="1" {...s} />
      <path d="M13 17 L14 24" {...s} strokeWidth={1} />
    </>
  ),

  saucepan: (
    <>
      <path d="M7 15 L8 24 Q13 26 19 24 L20 15 Z" fill={P.metal} />
      <ellipse cx="13.5" cy="15" rx="6.5" ry="2" fill={P.metal} />
      <path d="M7 15 L8 24 Q13 26 19 24 L20 15 Z" {...s} />
      <ellipse cx="13.5" cy="15" rx="6.5" ry="2" {...s} />
      <path d="M20 16 L29 16" {...s} strokeWidth={2.5} />
      <circle cx="27" cy="16" r="0.75" fill="currentColor" />
    </>
  ),

  'large-jar': (
    <>
      <rect x="9" y="11" width="14" height="15" rx="2" fill={P.glass} />
      <rect x="11" y="7" width="10" height="4" rx="1" fill={P.metal} />
      <rect x="9" y="11" width="14" height="15" rx="2" {...s} />
      <rect x="11" y="7" width="10" height="4" rx="1" {...s} />
      <path d="M11 9 L21 9 M11 10.5 L21 10.5" {...s} />
      <path d="M11 15 L14 15 M11 18 L15 18 M11 21 L14 21" {...s} />
    </>
  ),

  scale: (
    <>
      <rect x="6" y="14" width="20" height="12" rx="3" fill={P.metal} />
      <rect x="11" y="18" width="10" height="5" rx="1" fill={P.glass} />
      <rect x="6" y="14" width="20" height="12" rx="3" {...s} />
      <rect x="11" y="18" width="10" height="5" rx="1" {...s} />
      <ellipse cx="16" cy="14" rx="8" ry="2" {...s} />
      <path d="M13 20.5 L15 20.5 M17 20.5 L19 20.5" {...s} strokeWidth={1} />
    </>
  ),
}

const Fallback = <circle cx="16" cy="16" r="10" {...s} />

export function ItemIcon({ id, size = 28, className }: { id: string; size?: number; className?: string }) {
  const content = ITEM_ICONS[id] ?? Fallback
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className={className ? `item-icon ${className}` : 'item-icon'}
    >
      {content}
    </svg>
  )
}
