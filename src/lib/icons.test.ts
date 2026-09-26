import { describe, expect, it } from 'vitest'
import ingredientsJson from '../data/ingredients.json'
import { ITEM_ICONS } from '../components/itemIcons'

describe('ITEM_ICONS', () => {
  it('has an icon for every ingredient and equipment id, with no extra keys', () => {
    const expected = [
      ...ingredientsJson.ingredients.map((i) => i.id),
      ...ingredientsJson.equipment.map((e) => e.id),
    ].sort()
    const actual = Object.keys(ITEM_ICONS).sort()
    expect(actual).toEqual(expected)
  })
})
