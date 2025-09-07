export type Wishlist = {
  ids: string[]
}

export const emptyWishlist: Wishlist = { ids: [] }

export function hasWish(w: Wishlist, id: string) {
  return w.ids.includes(id)
}

export function toggleWish(w: Wishlist, id: string): Wishlist {
  return hasWish(w, id) ? { ids: w.ids.filter((x) => x !== id) } : { ids: [...w.ids, id] }
}

export function addWish(w: Wishlist, id: string): Wishlist {
  return hasWish(w, id) ? w : { ids: [...w.ids, id] }
}

export function removeWish(w: Wishlist, id: string): Wishlist {
  return { ids: w.ids.filter((x) => x !== id) }
}

export function countWish(w: Wishlist) {
  return w.ids.length
}
