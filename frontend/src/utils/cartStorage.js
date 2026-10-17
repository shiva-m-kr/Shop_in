const CART_STORAGE_KEY = 'shopin_guest_cart'

export const loadGuestCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export const saveGuestCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (e) {
    console.log('Failed to save guest cart:', e)
  }
}

export const clearGuestCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY)
}

export const calculateCartCount = (cartItem) => {
  let count = 0
  for (const itemId in cartItem) {
    for (const size in cartItem[itemId]) {
      count += cartItem[itemId][size]
    }
  }
  return count
}

export const calculateCartSubtotal = (cartItem, products) => {
  let total = 0
  for (const itemId in cartItem) {
    const product = products.find(p => String(p._id) === String(itemId))
    if (!product) continue
    for (const size in cartItem[itemId]) {
      total += product.price * cartItem[itemId][size]
    }
  }
  return total
}
