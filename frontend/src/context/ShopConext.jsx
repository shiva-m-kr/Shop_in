import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext, useCallback } from 'react'
import { AuthDataContext } from './AuthContext.jsx'
import { UserDataContext } from './UserContext.jsx'
import {
  loadGuestCart,
  saveGuestCart,
  clearGuestCart,
  calculateCartCount,
  calculateCartSubtotal
} from '../utils/cartStorage.js'

export const shopContext = React.createContext(null)
export const shopDataContext = shopContext

function ShopConext({ children }) {
  const [products, setProducts] = useState([])
  const { serverUrl } = useContext(AuthDataContext)
  const { userData } = useContext(UserDataContext)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [cartItem, setCartItem] = useState({})
  const currency = "₹"
  const delivery_fee = 40

  const getProducts = async () => {
    try {
      const url = `${serverUrl}/api/product/list`
      const result = await axios.post(url)
      setProducts(result.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchServerCart = useCallback(async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/cart`, { withCredentials: true })
      setCartItem(res.data.cartData || {})
    } catch (error) {
      console.log('fetchServerCart error:', error)
    }
  }, [serverUrl])

  const mergeGuestCartToServer = useCallback(async () => {
    const guestCart = loadGuestCart()
    const hasGuestItems = Object.keys(guestCart).length > 0

    if (hasGuestItems) {
      try {
        const res = await axios.post(
          `${serverUrl}/api/cart/merge`,
          { guestCart },
          { withCredentials: true }
        )
        setCartItem(res.data.cartData || {})
        clearGuestCart()
      } catch (error) {
        console.log('mergeGuestCart error:', error)
        await fetchServerCart()
      }
    } else {
      await fetchServerCart()
    }
  }, [serverUrl, fetchServerCart])

  const addToCart = async (itemId, size, quantity = 1) => {
    if (!size) {
      alert('Please select a size')
      return
    }

    setCartItem(prev => {
      const updated = structuredClone(prev)
      if (!updated[itemId]) updated[itemId] = {}
      updated[itemId][size] = (updated[itemId][size] || 0) + quantity
      return updated
    })

    if (userData) {
      try {
        const res = await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId, size, quantity },
          { withCredentials: true }
        )
        setCartItem(res.data.cartData)
      } catch (error) {
        console.log('addToCart API error:', error)
      }
    } else {
      const guest = loadGuestCart()
      if (!guest[itemId]) guest[itemId] = {}
      guest[itemId][size] = (guest[itemId][size] || 0) + quantity
      saveGuestCart(guest)
    }
  }

  const updateCartQuantity = async (itemId, size, quantity) => {
    setCartItem(prev => {
      const updated = structuredClone(prev)
      if (quantity <= 0) {
        if (updated[itemId]) {
          delete updated[itemId][size]
          if (Object.keys(updated[itemId]).length === 0) {
            delete updated[itemId]
          }
        }
      } else {
        if (!updated[itemId]) updated[itemId] = {}
        updated[itemId][size] = quantity
      }
      return updated
    })

    if (userData) {
      try {
        const res = await axios.put(
          `${serverUrl}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        )
        setCartItem(res.data.cartData)
      } catch (error) {
        console.log('updateCartQuantity API error:', error)
      }
    } else {
      const guest = loadGuestCart()
      if (quantity <= 0) {
        if (guest[itemId]) {
          delete guest[itemId][size]
          if (Object.keys(guest[itemId]).length === 0) {
            delete guest[itemId]
          }
        }
      } else {
        if (!guest[itemId]) guest[itemId] = {}
        guest[itemId][size] = quantity
      }
      saveGuestCart(guest)
    }
  }

  const removeFromCart = async (itemId, size) => {
    await updateCartQuantity(itemId, size, 0)
  }

  const clearCart = () => {
    setCartItem({})
    if (!userData) {
      clearGuestCart()
    }
  }

  const getCartCount = () => calculateCartCount(cartItem)
  const getCartSubtotal = () => calculateCartSubtotal(cartItem, products)

  useEffect(() => {
    if (userData) {
      mergeGuestCartToServer()
    } else {
      setCartItem(loadGuestCart())
    }
  }, [userData, mergeGuestCartToServer])

  useEffect(() => {
    getProducts()
  }, [])

  const value = {
    products, currency, delivery_fee, getProducts,
    showSearch, setShowSearch,
    search, setSearch,
    cartItem, setCartItem,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartSubtotal,
  }

  return (
    <shopContext.Provider value={value}>
      {children}
    </shopContext.Provider>
  )
}

export default ShopConext
