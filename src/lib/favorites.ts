import { createContext, useContext } from 'react'
import type { usePersistentSet } from './storage'

export type Favorites = ReturnType<typeof usePersistentSet>

export const FavoritesContext = createContext<Favorites | null>(null)

export function useFavorites() {
  const v = useContext(FavoritesContext)
  if (!v) throw new Error('useFavorites outside FavoritesProvider')
  return v
}
