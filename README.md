# Brew Book ☕

A mobile-first coffee recipe site. Browse 59 recipes, or use **What to Brew**: tick off what's in your kitchen and it suggests what you can make now, plus near-misses with the missing items listed.

Static React app (Vite + TypeScript). There's no server; favorites, pantry and theme are stored in `localStorage`.

```sh
npm install
npm run dev        # local dev server
npm test           # matching-engine unit tests
npm run validate   # check recipe JSON against the ingredient vocabulary
npm run build      # validate + type-check + static build into dist/
```

`dist/` uses relative paths and hash routing, so it can be served from any static host or subpath (GitHub Pages, Netlify, Vercel, S3…).

## Data

- `src/data/recipes/*.json`: recipes, one file per category. Each recipe cites at least two online sources. Quantities were cross-checked against them, and the method text is written in our own words.
- `src/data/ingredients.json`: the shared vocabulary of ingredient and equipment ids, including **substitutes** (e.g. heavy cream counts as whipped cream, and oat milk as whole milk). Recipes may only use ids defined here, and `npm run validate` enforces this.

## Matching rules (`src/lib/match.ts`)

- A recipe is **ready** when every non-optional ingredient and piece of equipment is available directly or via a listed substitute. It is **almost there** when only 1–2 are missing.
- Water, a kettle and a saucepan are assumed. Having pre-ground coffee removes the need for a grinder.
- Swaps between different forms of coffee (beans, ground, espresso roast) are allowed silently. Other substitutions are shown, e.g. "Using Oat milk for Whole milk".
- Results are sorted by fewest missing items, then fewest substitutions, then most optional extras on hand, then easiest first.
