import { describe, expect, it } from 'vitest'
import { matchRecipe, suggest, type Vocab } from './match'
import { formatAmount } from './format'
import vocabJson from '../data/ingredients.json'
import type { Recipe } from './types'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const vocab: Vocab = {
  ingredientSubs: new Map(vocabJson.ingredients.map((i) => [i.id, i.substitutes])),
  equipmentSubs: vocabJson.equipmentSubstitutes,
  equivalent: new Set(vocabJson.ingredients.filter((i) => i.group === 'coffee').map((i) => i.id)),
}

const dir = join(__dirname, '../data/recipes')
const all: Recipe[] = readdirSync(dir).flatMap((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
const byId = (id: string) => all.find((r) => r.id === id)!

const S = (...xs: string[]) => new Set(xs)

describe('matchRecipe', () => {
  it('is ready when everything required is present (water is assumed)', () => {
    const m = matchRecipe(
      byId('vietnamese-iced-coffee'),
      S('dark-roast', 'sweetened-condensed-milk', 'ice'),
      S('phin-filter'),
      vocab,
    )
    expect(m.status).toBe('ready')
    expect(m.missing).toEqual([])
  })

  it('treats kettle and saucepan as always available', () => {
    const m = matchRecipe(byId('cowboy-coffee'), S('ground-coffee'), S(), vocab)
    expect(m.status).toBe('ready')
  })

  it('uses ingredient substitutes and reports them', () => {
    const m = matchRecipe(byId('latte'), S('espresso-beans', 'oat-milk'), S('espresso-machine', 'milk-frother'), vocab)
    expect(m.status).toBe('ready')
    expect(m.substitutions).toEqual([{ kind: 'ingredient', need: 'whole-milk', use: 'oat-milk' }])
  })

  it('treats different forms of coffee as equivalent without flagging a swap', () => {
    const m = matchRecipe(byId('americano'), S('ground-coffee'), S('espresso-machine'), vocab)
    expect(m.status).toBe('ready')
    expect(m.substitutions).toEqual([])
  })

  it('does not substitute in the reverse direction when not listed', () => {
    // heavy-cream has no substitutes; half-and-half does not stand in for it
    const m = matchRecipe(
      byId('einspanner'),
      S('espresso-beans', 'half-and-half', 'sugar'),
      S('espresso-machine', 'whisk'),
      vocab,
    )
    expect(m.missing).toContainEqual({ kind: 'ingredient', id: 'heavy-cream' })
  })

  it('lets heavy whipping cream stand in for whipped cream', () => {
    const m = matchRecipe(byId('espresso-con-panna'), S('espresso-beans', 'heavy-cream'), S('espresso-machine'), vocab)
    expect(m.status).toBe('ready')
  })

  it('uses equipment substitutes (moka pot for espresso machine)', () => {
    const m = matchRecipe(byId('americano'), S('espresso-beans'), S('moka-pot'), vocab)
    expect(m.status).toBe('ready')
    expect(m.substitutions).toContainEqual({ kind: 'equipment', need: 'espresso-machine', use: 'moka-pot' })
  })

  it('skips the grinder when the user has pre-ground coffee', () => {
    const m = matchRecipe(byId('v60-pour-over'), S('ground-coffee'), S('pour-over'), vocab)
    expect(m.status).toBe('ready')
  })

  it('still requires a grinder for whole beans only', () => {
    const m = matchRecipe(byId('v60-pour-over'), S('whole-beans'), S('pour-over'), vocab)
    expect(m.missing).toEqual([{ kind: 'equipment', id: 'grinder' }])
    expect(m.status).toBe('almost')
  })

  it('ignores optional ingredients for status but counts them', () => {
    const base = matchRecipe(
      byId('mocha'),
      S('espresso-beans', 'chocolate-sauce', 'whole-milk'),
      S('espresso-machine', 'milk-frother'),
      vocab,
    )
    const extra = matchRecipe(
      byId('mocha'),
      S('espresso-beans', 'chocolate-sauce', 'whole-milk', 'whipped-cream'),
      S('espresso-machine', 'milk-frother'),
      vocab,
    )
    expect(base.status).toBe('ready')
    expect(base.optionalHave).toBe(0)
    expect(extra.optionalHave).toBe(1)
  })

  it('marks recipes missing more than 2 items as no match', () => {
    const m = matchRecipe(byId('espresso-martini'), S(), S(), vocab)
    expect(m.status).toBe('no')
  })
})

describe('suggest', () => {
  it('finds sensible matches for a typical pantry', () => {
    const { ready, almost } = suggest(
      all,
      S('ground-coffee', 'heavy-cream', 'whole-milk', 'sugar', 'ice'),
      S('french-press'),
      vocab,
    )
    const ids = ready.map((r) => r.recipe.id)
    expect(ids).toContain('french-press')
    expect(ids).toContain('cafe-au-lait')
    expect(ids).toContain('cowboy-coffee')
    expect(ids).not.toContain('latte')
    expect(almost.length).toBeGreaterThan(0)
    // ready list is sorted with fewest substitutions first
    for (let i = 1; i < ready.length; i++) {
      expect(ready[i - 1].substitutions.length).toBeLessThanOrEqual(ready[i].substitutions.length)
    }
  })

  it('returns nothing ready for an empty pantry except recipes needing only assumed items', () => {
    const { ready } = suggest(all, S(), S(), vocab)
    expect(ready).toEqual([])
  })
})

describe('formatAmount', () => {
  it('rounds metric and uses fractions for spoons', () => {
    expect(formatAmount(18, 'g', 2)).toBe('36 g')
    expect(formatAmount(0.5, 'tsp')).toBe('½ tsp')
    expect(formatAmount(1, 'tbsp', 1.5)).toBe('1½ tbsp')
    expect(formatAmount(1, 'cup', 2)).toBe('2 cups')
    expect(formatAmount(4, 'cubes')).toBe('4 cubes')
  })
})
