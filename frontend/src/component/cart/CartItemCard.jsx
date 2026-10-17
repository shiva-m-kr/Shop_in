import React from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'

function CartItemCard({
  product,
  size,
  qty,
  itemId,
  currency,
  updateCartQuantity,
  removeFromCart
}) {
  return (
    <div className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group">
      {/* Product Image */}
      <Link
        to={`/product/${itemId}`}
        className="shrink-0 w-20 h-24 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-slate-50 border border-slate-100"
      >
        <img
          src={product.image1}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${itemId}`}
            className="text-sm sm:text-base font-semibold text-slate-900 hover:text-[#0c7c86] transition-colors truncate block"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-medium text-slate-700">
              Size: {size}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline capitalize">{product.category}</span>
          </div>
        </div>

        {/* Price + Quantity + Remove (bottom row) */}
        <div className="flex items-center justify-between mt-4 gap-3">
          {/* Price */}
          <span className="text-base sm:text-lg font-extrabold text-slate-900 whitespace-nowrap">
            {currency}{product.price * qty}
          </span>

          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
              <button
                onClick={() => {
                  if (qty <= 1) {
                    removeFromCart(itemId, size)
                  } else {
                    updateCartQuantity(itemId, size, qty - 1)
                  }
                }}
                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-l-xl transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="w-9 text-center text-sm font-bold text-slate-800 select-none">
                {qty}
              </span>
              <button
                onClick={() => updateCartQuantity(itemId, size, qty + 1)}
                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-r-xl transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(itemId, size)}
              className="ml-2 p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
              aria-label="Remove item"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
