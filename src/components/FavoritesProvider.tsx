import type { ReactNode } from 'react'
import { FavoritesContext } from '../lib/favorites'
import { usePersistentSet } from '../lib/storage'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favs = usePersistentSet('brewbook:favorites')
  return <FavoritesContext.Provider value={favs}>{children}</FavoritesContext.Provider>
}
