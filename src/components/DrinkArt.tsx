import sprite from '../assets/drinks.webp'
import art from '../assets/drinks.json'
import { DRINK_CELL, DRINK_COLS as COLS, DRINK_ROWS as ROWS, FALLBACK_DRINK_CELL } from '../lib/drinkCells'
import type { Recipe } from '../lib/types'
import { Cup } from './Cup'

const filled = new Set(art.filledCells)

/** Illustrated drink from the sprite sheet; falls back to the drawn SVG cup while a recipe has no art yet. */
export function DrinkArt({ recipe, size, steam = true }: { recipe: Recipe; size: number; steam?: boolean }) {
  const cell = DRINK_CELL[recipe.id] ?? FALLBACK_DRINK_CELL
  if (!filled.has(cell)) return <Cup recipe={recipe} size={size} steam={steam} />
  const i = cell - 1
  const col = i % COLS
  const row = Math.floor(i / COLS)
  return (
    <span
      role="img"
      aria-label={`Illustration of ${recipe.name}`}
      className="drink-art"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sprite})`,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${(col * 100) / (COLS - 1)}% ${(row * 100) / (ROWS - 1)}%`,
      }}
    />
  )
}
