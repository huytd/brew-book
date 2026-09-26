import { describe, expect, it } from 'vitest'
import ingredientsJson from '../data/ingredients.json'
import { ICON_CELL } from './iconCells'

describe('ICON_CELL', () => {
  const ids = [...ingredientsJson.ingredients.map((i) => i.id), ...ingredientsJson.equipment.map((e) => e.id)]

  it('maps every ingredient and equipment id, with no extra keys', () => {
    expect(Object.keys(ICON_CELL).sort()).toEqual([...ids].sort())
  })

  it('uses every one of the 48 sprite cells and nothing outside them', () => {
    expect([...new Set(Object.values(ICON_CELL))].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 48 }, (_, i) => i + 1),
    )
  })
})
