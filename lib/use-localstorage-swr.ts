import useSWR from "swr"

export function useLocalStorageSWR<T>(key: string, initial: T) {
  const fetcher = () => {
    if (typeof window === "undefined") return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  }

  const { data, mutate } = useSWR<T>(key, fetcher, { fallbackData: initial })

  const setData = (next: T | ((prev: T) => T)) => {
    const value = typeof next === "function" ? (next as (prev: T) => T)(data as T) : next
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
    mutate(value, false)
  }

  return { data: data as T, setData }
}
