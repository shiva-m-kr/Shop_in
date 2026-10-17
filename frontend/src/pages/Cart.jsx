import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shopContext } from '../context/ShopConext'
import Footer from '../component/Footer'
import CartEmpty from '../component/cart/CartEmpty'
import CartItemCard from '../component/cart/CartItemCard'
import CartSummary from '../component/cart/CartSummary'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'

function Cart() {
  const {
    cartItem,
    products,
    currency,
    delivery_fee,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartSubtotal
  } = useContext(shopContext)

  const navigate = useNavigate()
  const itemCount = getCartCount()
  const subtotal = getCartSubtotal()
  const total = subtotal > 0 ? subtotal + delivery_fee : 0

  // Build enriched cart items array
  const cartEntries = []
  for (const itemId in cartItem) {
    const product = products.find(p => String(p._id) === String(itemId))
    if (!product) continue
    for (const size in cartItem[itemId]) {
      const qty = cartItem[itemId][size]
      if (qty > 0) {
        cartEntries.push({ product, size, qty, itemId })
      }
    }
  }

  if (cartEntries.length === 0) {
    return <CartEmpty />
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 pt-6 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-32 md:pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-[#0c7c86] transition-colors">Home</Link>
          <FiChevronRight size={14} className="text-slate-400" />
          <span className="text-[#0c7c86] font-medium">Shopping Bag</span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Bag
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>

          <button
            onClick={clearCart}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Main Grid: Cart Items + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartEntries.map(({ product, size, qty, itemId }) => (
              <CartItemCard
                key={`${itemId}-${size}`}
                product={product}
                size={size}
                qty={qty}
                itemId={itemId}
                currency={currency}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            ))}

            {/* Continue Shopping */}
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c7c86] hover:text-[#096068] transition-colors mt-4 group"
            >
              <FiArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <CartSummary
            itemCount={itemCount}
            currency={currency}
            subtotal={subtotal}
            delivery_fee={delivery_fee}
            total={total}
            navigate={navigate}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cart
