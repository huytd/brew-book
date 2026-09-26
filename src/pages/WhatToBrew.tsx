import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  equipment,
  equipmentById,
  equipmentSubstitutes,
  GROUP_LABELS,
  ingredientById,
  ingredients,
  recipes,
} from '../lib/data'
import { ASSUMED_EQUIPMENT, ASSUMED_INGREDIENTS, suggest, type MatchResult, type Vocab } from '../lib/match'
import { usePersistentSet } from '../lib/storage'
import type { IngredientGroup } from '../lib/types'
import { Cup } from '../components/Cup'
import { IconCheck, IconChevron } from '../components/Icons'
import { ItemIcon } from '../components/itemIcons'

const vocab: Vocab = {
  ingredientSubs: new Map(ingredients.map((i) => [i.id, i.substitutes])),
  equipmentSubs: equipmentSubstitutes,
  equivalent: new Set(ingredients.filter((i) => i.group === 'coffee').map((i) => i.id)),
}

const GROUP_ORDER: IngredientGroup[] = ['coffee', 'dairy', 'sweetener', 'flavor', 'basics', 'spirit', 'other']

const pickableIngredients = ingredients.filter((i) => !ASSUMED_INGREDIENTS.has(i.id))
const pickableEquipment = equipment.filter((e) => !ASSUMED_EQUIPMENT.has(e.id))

const nameOf = (kind: 'ingredient' | 'equipment', id: string) =>
  (kind === 'ingredient' ? ingredientById.get(id)?.name : equipmentById.get(id)?.name) ?? id

export function WhatToBrew() {
  const pantry = usePersistentSet('brewbook:pantry')
  const gear = usePersistentSet('brewbook:equipment')
  const resultsRef = useRef<HTMLElement>(null)

  const { ready, almost } = suggest(recipes, pantry.set, gear.set, vocab)

  const total = pantry.list.length + gear.list.length

  return (
    <div className="page brew">
      <section className="hero compact">
        <h1>
          What can I <em>brew</em>?
        </h1>
        <p className="lede">
          Tap what's in your kitchen and we'll find recipes you can make right now. Water, a kettle and a pot are
          assumed.
        </p>
      </section>

      <div className="brew-layout">
        <div className="picker">
          {GROUP_ORDER.map((g) => {
            const items = pickableIngredients.filter((i) => i.group === g)
            if (!items.length) return null
            const selected = items.filter((i) => pantry.set.has(i.id)).length
            return (
              <PickerGroup
                key={g}
                title={GROUP_LABELS[g]}
                selected={selected}
                defaultOpen={g === 'coffee' || g === 'dairy'}
                items={items}
                has={(id) => pantry.set.has(id)}
                toggle={pantry.toggle}
              />
            )
          })}
          <PickerGroup
            title="Equipment"
            selected={pickableEquipment.filter((e) => gear.set.has(e.id)).length}
            defaultOpen
            items={pickableEquipment}
            has={(id) => gear.set.has(id)}
            toggle={gear.toggle}
          />
          {total > 0 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                pantry.clear()
                gear.clear()
              }}
            >
              Clear everything
            </button>
          )}
        </div>

        <section className="results" ref={resultsRef} aria-labelledby="results-h" aria-live="polite">
          <h2 id="results-h" className="sr-only">
            Suggestions
          </h2>
          {total === 0 ? (
            <div className="empty soft">
              <p className="empty-title">Your counter is empty</p>
              <p>Start with your coffee and your brewer. For example, ground coffee and a French press.</p>
            </div>
          ) : (
            <>
              <ResultGroup
                title="Ready to brew"
                tone="ready"
                results={ready}
                emptyText="Nothing complete yet. Check “Almost there” below for what's missing."
              />
              <ResultGroup
                title="Almost there"
                tone="almost"
                results={almost}
                emptyText="Add a few more ingredients to see near-matches."
              />
            </>
          )}
        </section>
      </div>

      {total > 0 && (
        <div className="brew-bar">
          <button
            type="button"
            className="btn btn-primary brew-bar-btn"
            onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span className="brew-bar-count">{ready.length}</span> ready
            <span className="brew-bar-sep" aria-hidden="true">
              ·
            </span>
            {almost.length} almost
          </button>
        </div>
      )}
    </div>
  )
}

function PickerGroup({
  title,
  selected,
  defaultOpen,
  items,
  has,
  toggle,
}: {
  title: string
  selected: number
  defaultOpen?: boolean
  items: { id: string; name: string }[]
  has: (id: string) => boolean
  toggle: (id: string) => void
}) {
  return (
    <details className="picker-group" open={defaultOpen}>
      <summary>
        <span className="picker-title">{title}</span>
        {selected > 0 && <span className="count-badge">{selected}</span>}
        <IconChevron className="chev" />
      </summary>
      <div className="picker-grid">
        {items.map((i) => {
          const on = has(i.id)
          return (
            <button key={i.id} type="button" className="picker-tile" aria-pressed={on} onClick={() => toggle(i.id)}>
              {on && (
                <span className="picker-badge" aria-hidden="true">
                  <IconCheck width={12} height={12} />
                </span>
              )}
              <span className="picker-plate">
                <ItemIcon id={i.id} size={42} />
              </span>
              <span className="picker-label">{i.name}</span>
            </button>
          )
        })}
      </div>
    </details>
  )
}

function ResultGroup({
  title,
  tone,
  results,
  emptyText,
}: {
  title: string
  tone: 'ready' | 'almost'
  results: MatchResult[]
  emptyText: string
}) {
  return (
    <div className={`result-group tone-${tone}`}>
      <h3 className="result-title">
        <span className="dot" aria-hidden="true" />
        {title} <span className="muted">({results.length})</span>
      </h3>
      {results.length === 0 ? (
        <p className="muted small">{emptyText}</p>
      ) : (
        <ul className="match-list">
          {results.map((m) => (
            <li key={m.recipe.id}>
              <Link to={`/recipe/${m.recipe.id}`} className={`match cat-${m.recipe.category}`}>
                <span className="match-art">
                  <Cup recipe={m.recipe} size={64} steam={false} />
                </span>
                <span className="match-body">
                  <span className="match-name">{m.recipe.name}</span>
                  {m.missing.length > 0 && (
                    <span className="match-note missing">
                      Missing:{' '}
                      {m.missing.map((x, idx) => (
                        <span key={x.id}>
                          {idx > 0 && ', '}
                          <span className="missing-item">
                            <ItemIcon id={x.id} size={16} />
                            <span>{nameOf(x.kind, x.id)}</span>
                          </span>
                        </span>
                      ))}
                    </span>
                  )}
                  {m.substitutions.length > 0 && (
                    <span className="match-note">
                      Using{' '}
                      {m.substitutions.map((s) => `${nameOf(s.kind, s.use)} for ${nameOf(s.kind, s.need)}`).join(', ')}
                    </span>
                  )}
                  {m.missing.length === 0 && m.substitutions.length === 0 && (
                    <span className="match-note">{m.recipe.description}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
