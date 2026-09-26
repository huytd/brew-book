import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CATEGORY_LABELS, equipmentById, ingredientById, recipeById } from '../lib/data'
import { formatAmount, formatTime } from '../lib/format'
import { Cup } from '../components/Cup'
import { SaveButton, TempBadge } from '../components/RecipeCard'
import { Timer } from '../components/Timer'
import { IconBack, IconCheck, IconExternal, IconMinus, IconPlus } from '../components/Icons'

export function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = id ? recipeById.get(id) : undefined

  if (!recipe) {
    return (
      <div className="page empty">
        <p className="empty-title">We couldn't find that recipe.</p>
        <Link to="/" className="btn">
          Back to all recipes
        </Link>
      </div>
    )
  }

  // key resets checklist/servings state when navigating between recipes
  return (
    <RecipeView key={recipe.id} recipe={recipe} onBack={() => (history.length > 1 ? navigate(-1) : navigate('/'))} />
  )
}

function RecipeView({
  recipe,
  onBack,
}: {
  recipe: NonNullable<ReturnType<typeof recipeById.get>>
  onBack: () => void
}) {
  const [servings, setServings] = useState(recipe.servings)
  const [gotIngredients, setGotIngredients] = useState<Set<number>>(new Set())
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set())
  const factor = servings / recipe.servings

  const flip = (set: Set<number>, i: number) => {
    const next = new Set(set)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    return next
  }

  return (
    <article className={`page recipe cat-${recipe.category}`}>
      <div className="recipe-toolbar">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Back">
          <IconBack />
        </button>
        <SaveButton id={recipe.id} name={recipe.name} />
      </div>

      <header className="recipe-hero">
        <div className="recipe-art">
          <Cup recipe={recipe} size={180} />
        </div>
        <div>
          <p className="eyebrow">
            {CATEGORY_LABELS[recipe.category]}
            {recipe.origin && <> · {recipe.origin}</>}
          </p>
          <h1 className="recipe-title">{recipe.name}</h1>
          <p className="lede">{recipe.description}</p>
          <dl className="stats">
            <div>
              <dt>Time</dt>
              <dd>{formatTime(recipe.timeMinutes)}</dd>
            </div>
            {recipe.ratio && (
              <div>
                <dt>Ratio</dt>
                <dd>{recipe.ratio}</dd>
              </div>
            )}
            <div>
              <dt>Level</dt>
              <dd className="cap">{recipe.difficulty}</dd>
            </div>
            <div>
              <dt>Serve</dt>
              <dd>
                <TempBadge recipe={recipe} />
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="recipe-columns">
        <section className="panel" aria-labelledby="ing-h">
          <div className="panel-head">
            <h2 id="ing-h">Ingredients</h2>
            <div className="stepper" role="group" aria-label="Servings">
              <button
                type="button"
                className="icon-btn sm"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                disabled={servings <= 1}
                aria-label="Fewer servings"
              >
                <IconMinus width={16} height={16} />
              </button>
              <span aria-live="polite">
                {servings} {servings === 1 ? 'serving' : 'servings'}
              </span>
              <button
                type="button"
                className="icon-btn sm"
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                aria-label="More servings"
              >
                <IconPlus width={16} height={16} />
              </button>
            </div>
          </div>
          <ul className="checklist">
            {recipe.ingredients.map((ing, i) => {
              const checked = gotIngredients.has(i)
              return (
                <li key={i}>
                  <label className={`check-row ${checked ? 'is-checked' : ''}`}>
                    <input type="checkbox" checked={checked} onChange={() => setGotIngredients((s) => flip(s, i))} />
                    <span className="checkbox" aria-hidden="true">
                      <IconCheck width={14} height={14} />
                    </span>
                    <span className="amount">{formatAmount(ing.amount, ing.unit, factor)}</span>
                    <span className="ing-name">
                      {ingredientById.get(ing.id)?.name ?? ing.id}
                      {ing.optional && <span className="tag-optional">optional</span>}
                      {ing.note && <span className="ing-note">{ing.note}</span>}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>

          {(recipe.equipment.length > 0 || recipe.optionalEquipment?.length) && (
            <>
              <h3 className="subhead">Equipment</h3>
              <ul className="pill-list">
                {recipe.equipment.map((e) => (
                  <li key={e} className="pill">
                    {equipmentById.get(e)?.name ?? e}
                  </li>
                ))}
                {recipe.optionalEquipment?.map((e) => (
                  <li key={e} className="pill pill-muted">
                    {equipmentById.get(e)?.name ?? e} <span className="sr-only">(optional)</span>
                    <span aria-hidden="true">· optional</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="panel" aria-labelledby="steps-h">
          <div className="panel-head">
            <h2 id="steps-h">Method</h2>
            <span className="muted small">
              {doneSteps.size}/{recipe.steps.length} done
            </span>
          </div>
          <ol className="steps">
            {recipe.steps.map((step, i) => {
              const done = doneSteps.has(i)
              return (
                <li key={i} className={`step ${done ? 'is-done' : ''}`}>
                  <button
                    type="button"
                    className="step-num"
                    aria-pressed={done}
                    aria-label={`Mark step ${i + 1} ${done ? 'not done' : 'done'}`}
                    onClick={() => setDoneSteps((s) => flip(s, i))}
                  >
                    {done ? <IconCheck width={16} height={16} /> : i + 1}
                  </button>
                  <div className="step-body">
                    <p>{step.text}</p>
                    {step.timerSeconds && <Timer seconds={step.timerSeconds} />}
                  </div>
                </li>
              )
            })}
          </ol>

          {recipe.tips && recipe.tips.length > 0 && (
            <aside className="tips">
              <h3>Barista notes</h3>
              <ul>
                {recipe.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </aside>
          )}
        </section>
      </div>

      <footer className="sources">
        <h3 className="subhead">Sources</h3>
        <p className="muted small">Quantities checked against these sources. Method rewritten in our own words.</p>
        <ul>
          {recipe.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name}
                <IconExternal width={14} height={14} />
              </a>
            </li>
          ))}
        </ul>
        {recipe.tags.length > 0 && (
          <ul className="tag-list" aria-label="Tags">
            {recipe.tags.map((t) => (
              <li key={t}>
                <Link to={`/?q=${encodeURIComponent(t)}`}>#{t}</Link>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </article>
  )
}
