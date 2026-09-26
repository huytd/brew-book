import sprite from '../assets/ingredients.webp'
import { ICON_CELL, SPRITE_COLS as COLS, SPRITE_ROWS as ROWS } from '../lib/iconCells'

export function ItemIcon({ id, size = 28, className }: { id: string; size?: number; className?: string }) {
  const cell = ICON_CELL[id]
  const i = (cell ?? 1) - 1
  const col = i % COLS
  const row = Math.floor(i / COLS)
  return (
    <span
      aria-hidden="true"
      className={className ? `item-icon ${className}` : 'item-icon'}
      style={{
        width: size,
        height: size,
        backgroundImage: cell ? `url(${sprite})` : undefined,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${(col * 100) / (COLS - 1)}% ${(row * 100) / (ROWS - 1)}%`,
      }}
    />
  )
}
