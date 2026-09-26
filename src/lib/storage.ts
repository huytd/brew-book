import { useCallback, useEffect, useState } from 'react'

export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or unavailable (private mode) — keep working in memory
    }
  }, [key, value])

  return [value, setValue] as const
}

/** A persisted list of ids with set-like helpers. */
export function usePersistentSet(key: string) {
  const [list, setList] = usePersistentState<string[]>(key, [])
  const toggle = useCallback(
    (id: string) => setList((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])),
    [setList],
  )
  const clear = useCallback(() => setList([]), [setList])
  return { set: new Set(list), list, toggle, clear, setList }
}
