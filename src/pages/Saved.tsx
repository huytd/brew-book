import { Link } from 'react-router-dom'
import { recipeById } from '../lib/data'
import { useFavorites } from '../lib/favorites'
import { RecipeCard } from '../components/RecipeCard'

export function Saved() {
  const { list } = useFavorites()
  const saved = list.map((id) => recipeById.get(id)).filter((r) => r !== undefined)

  return (
    <div className="page">
      <section className="hero compact">
        <h1>Saved</h1>
        <p className="lede">Your go-to brews, kept on this device.</p>
      </section>
      {saved.length ? (
        <div className="grid">
          {saved.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="empty-title">No saved recipes yet</p>
          <p>Tap the heart on any recipe to keep it here.</p>
          <Link to="/" className="btn">
            Browse recipes
          </Link>
        </div>
      )}
    </div>
  )
}
