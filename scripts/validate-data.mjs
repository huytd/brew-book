// Validates recipe JSON against the ingredient/equipment vocabulary.
// Run: node scripts/validate-data.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../src/data/', import.meta.url).pathname
const vocab = JSON.parse(readFileSync(join(root, 'ingredients.json'), 'utf8'))
const ingIds = new Set(vocab.ingredients.map((i) => i.id))
const eqIds = new Set(vocab.equipment.map((e) => e.id))

const CATEGORIES = ['espresso', 'milk', 'brew-method', 'iced', 'international', 'sweet', 'cocktail']
const CUPS = ['demitasse', 'cappuccino', 'latte-glass', 'mug', 'tall-iced', 'irish-glass', 'carafe']
const DIFF = ['easy', 'medium', 'advanced']
const TEMP = ['hot', 'iced', 'either']

const errors = []
const seen = new Set()
let count = 0

for (const i of vocab.ingredients) {
  for (const s of i.substitutes) if (!ingIds.has(s)) errors.push(`ingredient ${i.id}: unknown substitute ${s}`)
}
for (const [k, subs] of Object.entries(vocab.equipmentSubstitutes)) {
  if (!eqIds.has(k)) errors.push(`equipmentSubstitutes: unknown key ${k}`)
  for (const s of subs) if (!eqIds.has(s)) errors.push(`equipmentSubstitutes.${k}: unknown ${s}`)
}

for (const file of readdirSync(join(root, 'recipes'))) {
  const recipes = JSON.parse(readFileSync(join(root, 'recipes', file), 'utf8'))
  for (const r of recipes) {
    count++
    const at = `${file} › ${r.id}`
    if (seen.has(r.id)) errors.push(`${at}: duplicate id`)
    seen.add(r.id)
    if (!CATEGORIES.includes(r.category)) errors.push(`${at}: bad category ${r.category}`)
    if (!CUPS.includes(r.cup)) errors.push(`${at}: bad cup ${r.cup}`)
    if (!DIFF.includes(r.difficulty)) errors.push(`${at}: bad difficulty`)
    if (!TEMP.includes(r.temperature)) errors.push(`${at}: bad temperature`)
    for (const k of ['name', 'description']) if (!r[k]) errors.push(`${at}: missing ${k}`)
    if (!(r.timeMinutes > 0) || !(r.servings > 0)) errors.push(`${at}: bad time/servings`)
    if (!r.ingredients?.length) errors.push(`${at}: no ingredients`)
    for (const i of r.ingredients ?? []) {
      if (!ingIds.has(i.id)) errors.push(`${at}: unknown ingredient ${i.id}`)
      if (!(i.amount > 0) || !i.unit) errors.push(`${at}: bad amount/unit for ${i.id}`)
    }
    for (const e of [...(r.equipment ?? []), ...(r.optionalEquipment ?? [])]) {
      if (!eqIds.has(e)) errors.push(`${at}: unknown equipment ${e}`)
    }
    if (!r.steps?.length) errors.push(`${at}: no steps`)
    for (const s of r.steps ?? []) if (typeof s.text !== 'string') errors.push(`${at}: step missing text`)
    if (!r.sources || r.sources.length < 2) errors.push(`${at}: needs ≥2 sources`)
    for (const s of r.sources ?? []) if (!/^https:\/\//.test(s.url)) errors.push(`${at}: bad source url ${s.url}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  console.error(`\n✗ ${errors.length} error(s) in ${count} recipes`)
  process.exit(1)
}
console.log(`✓ ${count} recipes valid`)
