export type Category = 'espresso' | 'milk' | 'brew-method' | 'iced' | 'international' | 'sweet' | 'cocktail'

export type Difficulty = 'easy' | 'medium' | 'advanced'
export type Temperature = 'hot' | 'iced' | 'either'

export interface RecipeIngredient {
  id: string
  amount: number
  unit: string
  optional?: boolean
  note?: string
}

export interface Step {
  text: string
  /** Seconds, for steps with a wait (bloom, steep, brew) — drives the timer. */
  timerSeconds?: number
}

export interface Recipe {
  id: string
  name: string
  category: Category
  description: string
  origin?: string
  difficulty: Difficulty
  timeMinutes: number
  servings: number
  temperature: Temperature
  ratio?: string
  ingredients: RecipeIngredient[]
  equipment: string[]
  optionalEquipment?: string[]
  steps: Step[]
  tips?: string[]
  tags: string[]
  cup: CupStyle
  sources: { name: string; url: string }[]
}

/** Which SVG cup illustration to render, and its layer colours. */
export type CupStyle = 'demitasse' | 'cappuccino' | 'latte-glass' | 'mug' | 'tall-iced' | 'irish-glass' | 'carafe'

export type IngredientGroup = 'coffee' | 'dairy' | 'sweetener' | 'flavor' | 'spirit' | 'basics' | 'other'

export interface Ingredient {
  id: string
  name: string
  group: IngredientGroup
  substitutes: string[]
}

export interface Equipment {
  id: string
  name: string
}
