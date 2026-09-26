import vocab from '../data/ingredients.json'
import type { Category, Equipment, Ingredient, IngredientGroup, Recipe } from './types'

const modules = import.meta.glob<{ default: Recipe[] }>('../data/recipes/*.json', { eager: true })

const CATEGORY_ORDER: Category[] = ['espresso', 'milk', 'brew-method', 'iced', 'international', 'sweet', 'cocktail']

export const recipes: Recipe[] = Object.values(modules)
  .flatMap((m) => m.default)
  .sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.name.localeCompare(b.name),
  )

export const recipeById = new Map(recipes.map((r) => [r.id, r]))

export const ingredients = vocab.ingredients as Ingredient[]
export const ingredientById = new Map(ingredients.map((i) => [i.id, i]))

export const equipment = vocab.equipment as Equipment[]
export const equipmentById = new Map(equipment.map((e) => [e.id, e]))

export const equipmentSubstitutes = vocab.equipmentSubstitutes as Record<string, string[]>

export const CATEGORY_LABELS: Record<Category, string> = {
  espresso: 'Espresso',
  milk: 'Milk drinks',
  'brew-method': 'Brew methods',
  iced: 'Iced',
  international: 'Around the world',
  sweet: 'Sweet & seasonal',
  cocktail: 'Cocktails',
}

export const GROUP_LABELS: Record<IngredientGroup, string> = {
  coffee: 'Coffee',
  dairy: 'Milk & cream',
  sweetener: 'Sweeteners & sauces',
  flavor: 'Spices & flavours',
  spirit: 'Spirits',
  basics: 'Basics',
  other: 'Other',
}
