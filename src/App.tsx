import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FavoritesProvider } from './components/FavoritesProvider'
import { Browse } from './pages/Browse'
import { RecipeDetail } from './pages/RecipeDetail'
import { Saved } from './pages/Saved'
import { WhatToBrew } from './pages/WhatToBrew'

export default function App() {
  return (
    <FavoritesProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Browse />} />
            <Route path="brew" element={<WhatToBrew />} />
            <Route path="saved" element={<Saved />} />
            <Route path="recipe/:id" element={<RecipeDetail />} />
            <Route path="*" element={<Browse />} />
          </Route>
        </Routes>
      </HashRouter>
    </FavoritesProvider>
  )
}
