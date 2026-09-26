import { useSearchParams } from 'react-router-dom'
import { CATEGORY_LABELS, ingredientById, recipes } from '../lib/data'
import type { Category } from '../lib/types'
import { RecipeCard } from '../components/RecipeCard'
import { IconSearch } from '../components/Icons'

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

type Toggle = 'hot' | 'iced' | 'no-machine' | 'easy' | 'quick'

const TOGGLES: { id: Toggle; label: string }[] = [
  { id: 'hot', label: 'Hot' },
  { id: 'iced', label: 'Iced' },
  { id: 'no-machine', label: 'No espresso machine' },
  { id: 'easy', label: 'Easy' },
  { id: 'quick', label: 'Under 5 min' },
]

export function Browse() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const cat = params.get('cat') as Category | null
  const toggles = new Set((params.get('f') ?? '').split(',').filter(Boolean) as Toggle[])

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    setParams(next, { replace: true })
  }

  const flip = (t: Toggle) => {
    const next = new Set(toggles)
    if (next.has(t)) next.delete(t)
    else {
      next.add(t)
      if (t === 'hot') next.delete('iced')
      if (t === 'iced') next.delete('hot')
    }
    update({ f: [...next].join(',') || null })
  }

  const needle = q.trim().toLowerCase()
  const results = recipes.filter((r) => {
    if (cat && r.category !== cat) return false
    if (toggles.has('hot') && r.temperature === 'iced') return false
    if (toggles.has('iced') && r.temperature === 'hot') return false
    if (toggles.has('no-machine') && r.equipment.includes('espresso-machine')) return false
    if (toggles.has('easy') && r.difficulty !== 'easy') return false
    if (toggles.has('quick') && r.timeMinutes > 5) return false
    if (!needle) return true
    const hay = [
      r.name,
      r.description,
      r.origin ?? '',
      ...r.tags,
      ...r.ingredients.map((i) => ingredientById.get(i.id)?.name ?? ''),
    ]
      .join(' ')
      .toLowerCase()
    return needle.split(/\s+/).every((w) => hay.includes(w))
  })

  return (
    <div className="page">
      <section className="hero">
        <h1>
          What are we <em>brewing</em> today?
        </h1>
        <p className="lede">
          {recipes.length} recipes, from a proper espresso to Hanoi egg coffee. Every one is checked against at least
          two sources.
        </p>
        <label className="search">
          <IconSearch />
          <span className="sr-only">Search recipes</span>
          <input
            type="search"
            placeholder="Search latte, cinnamon, Vietnam…"
            value={q}
            onChange={(e) => update({ q: e.target.value || null })}
          />
        </label>
      </section>

      <div className="chip-scroller" role="group" aria-label="Category">
        <button type="button" className="chip" aria-pressed={!cat} onClick={() => update({ cat: null })}>
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={cat === c}
            onClick={() => update({ cat: cat === c ? null : c })}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>
      <div className="chip-scroller filters" role="group" aria-label="Filters">
        {TOGGLES.map((t) => (
          <button
            key={t.id}
            type="button"
            className="chip chip-outline"
            aria-pressed={toggles.has(t.id)}
            onClick={() => flip(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? 'recipe' : 'recipes'}
      </p>

      {results.length ? (
        <div className="grid">
          {results.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="empty-title">Nothing brewing here.</p>
          <p>Try a different search or clear some filters.</p>
          <button type="button" className="btn" onClick={() => setParams({}, { replace: true })}>
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
