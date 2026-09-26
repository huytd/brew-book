import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Recipe } from '../lib/types'
import { CATEGORY_LABELS } from '../lib/data'
import { formatTime } from '../lib/format'
import { useFavorites } from '../lib/favorites'
import { Cup } from './Cup'
import { IconClock, IconFlame, IconHeart, IconSnow } from './Icons'

export function TempBadge({ recipe }: { recipe: Recipe }) {
  if (recipe.temperature === 'hot')
    return (
      <span className="meta">
        <IconFlame width={16} height={16} /> Hot
      </span>
    )
  if (recipe.temperature === 'iced')
    return (
      <span className="meta">
        <IconSnow width={16} height={16} /> Iced
      </span>
    )
  return <span className="meta">Hot or iced</span>
}

export function SaveButton({ id, name, className = '' }: { id: string; name: string; className?: string }) {
  const favs = useFavorites()
  const saved = favs.set.has(id)
  return (
    <button
      type="button"
      className={`icon-btn save-btn ${saved ? 'is-saved' : ''} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        favs.toggle(id)
      }}
    >
      <IconHeart filled={saved} />
    </button>
  )
}

export function RecipeCard({ recipe, children }: { recipe: Recipe; children?: ReactNode }) {
  return (
    <article className={`card cat-${recipe.category}`}>
      <Link to={`/recipe/${recipe.id}`} className="card-link">
        <div className="card-art">
          <Cup recipe={recipe} size={104} steam={false} />
        </div>
        <div className="card-body">
          <p className="eyebrow">{CATEGORY_LABELS[recipe.category]}</p>
          <h3 className="card-title">{recipe.name}</h3>
          <p className="card-desc">{recipe.description}</p>
          <div className="card-meta">
            <span className="meta">
              <IconClock width={16} height={16} /> {formatTime(recipe.timeMinutes)}
            </span>
            <TempBadge recipe={recipe} />
            <span className={`meta diff diff-${recipe.difficulty}`}>{recipe.difficulty}</span>
          </div>
          {children}
        </div>
      </Link>
      <SaveButton id={recipe.id} name={recipe.name} className="card-save" />
    </article>
  )
}
