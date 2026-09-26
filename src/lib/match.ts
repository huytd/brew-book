import type { Recipe } from './types'

/** Things we assume every kitchen has, so they never block a match. */
export const ASSUMED_INGREDIENTS = new Set(['water'])
export const ASSUMED_EQUIPMENT = new Set(['kettle', 'saucepan'])

export interface Vocab {
  ingredientSubs: Map<string, string[]>
  equipmentSubs: Record<string, string[]>
  /** Ingredients that are interchangeable forms of the same thing (e.g. beans vs. ground coffee); swapping between them isn't worth flagging. */
  equivalent?: Set<string>
}

export interface Substitution {
  kind: 'ingredient' | 'equipment'
  need: string
  use: string
}

export interface Missing {
  kind: 'ingredient' | 'equipment'
  id: string
}

export interface MatchResult {
  recipe: Recipe
  status: 'ready' | 'almost' | 'no'
  missing: Missing[]
  substitutions: Substitution[]
  optionalHave: number
}

export const ALMOST_THRESHOLD = 2

type Availability = { ok: true; via?: string } | { ok: false }

function check(id: string, have: Set<string>, subs: string[] | undefined): Availability {
  if (have.has(id)) return { ok: true }
  const via = subs?.find((s) => have.has(s))
  return via ? { ok: true, via } : { ok: false }
}

export function matchRecipe(
  recipe: Recipe,
  haveIngredients: Set<string>,
  haveEquipment: Set<string>,
  vocab: Vocab,
): MatchResult {
  const missing: Missing[] = []
  const substitutions: Substitution[] = []
  let optionalHave = 0

  for (const ing of recipe.ingredients) {
    if (ASSUMED_INGREDIENTS.has(ing.id)) continue
    const a = check(ing.id, haveIngredients, vocab.ingredientSubs.get(ing.id))
    if (ing.optional) {
      if (a.ok) optionalHave++
      continue
    }
    if (!a.ok) missing.push({ kind: 'ingredient', id: ing.id })
    else if (a.via && !(vocab.equivalent?.has(ing.id) && vocab.equivalent.has(a.via)))
      substitutions.push({ kind: 'ingredient', need: ing.id, use: a.via })
  }

  for (const eq of recipe.equipment) {
    if (ASSUMED_EQUIPMENT.has(eq)) continue
    // Pre-ground coffee makes a grinder unnecessary.
    if (eq === 'grinder' && haveIngredients.has('ground-coffee')) continue
    const a = check(eq, haveEquipment, vocab.equipmentSubs[eq])
    if (!a.ok) missing.push({ kind: 'equipment', id: eq })
    else if (a.via) substitutions.push({ kind: 'equipment', need: eq, use: a.via })
  }

  const status = missing.length === 0 ? 'ready' : missing.length <= ALMOST_THRESHOLD ? 'almost' : 'no'
  return { recipe, status, missing, substitutions, optionalHave }
}

const DIFFICULTY_RANK = { easy: 0, medium: 1, advanced: 2 }

export function compareMatches(a: MatchResult, b: MatchResult): number {
  return (
    a.missing.length - b.missing.length ||
    a.substitutions.length - b.substitutions.length ||
    b.optionalHave - a.optionalHave ||
    DIFFICULTY_RANK[a.recipe.difficulty] - DIFFICULTY_RANK[b.recipe.difficulty] ||
    a.recipe.name.localeCompare(b.recipe.name)
  )
}

export function suggest(
  recipes: Recipe[],
  haveIngredients: Set<string>,
  haveEquipment: Set<string>,
  vocab: Vocab,
): { ready: MatchResult[]; almost: MatchResult[] } {
  const results = recipes.map((r) => matchRecipe(r, haveIngredients, haveEquipment, vocab)).sort(compareMatches)
  return {
    ready: results.filter((r) => r.status === 'ready'),
    almost: results.filter((r) => r.status === 'almost'),
  }
}
