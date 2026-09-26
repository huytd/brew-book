import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DRINK_CELL, FALLBACK_DRINK_CELL } from './drinkCells'

const dir = join(__dirname, '../data/recipes')
const ids: string[] = readdirSync(dir).flatMap((f) =>
  JSON.parse(readFileSync(join(dir, f), 'utf8')).map((r: { id: string }) => r.id),
)

describe('DRINK_CELL', () => {
  it('maps every recipe, with no extra keys', () => {
    expect(Object.keys(DRINK_CELL).sort()).toEqual([...ids].sort())
  })

  it('gives each recipe its own cell, leaving the fallback cell free', () => {
    const cells = Object.values(DRINK_CELL)
    expect(new Set(cells).size).toBe(cells.length)
    expect(cells).not.toContain(FALLBACK_DRINK_CELL)
    expect(Math.max(...cells)).toBeLessThan(FALLBACK_DRINK_CELL)
  })
})
