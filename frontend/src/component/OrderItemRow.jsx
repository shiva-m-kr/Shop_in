import React from 'react'
import { Link } from 'react-router-dom'

function OrderItemRow({ item, currency }) {
  const qty = item.quantity || 1
  const lineTotal = item.price * qty

  return (
    <div className="flex gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
      {/* Image */}
      <Link
        to={`/product/${item._id}`}
        className="shrink-0 w-16 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-2xs"
      >
        <img
          src={item.image1}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${item._id}`}
            className="text-sm font-semibold text-slate-900 hover:text-[#0c7c86] transition-colors truncate block"
          >
            {item.name}
          </Link>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            {item.size && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-medium text-slate-700">
                Size: {item.size}
              </span>
            )}
            <span>Qty: {qty}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400">{currency}{item.price} × {qty}</span>
          <span className="text-sm font-extrabold text-slate-900">{currency}{lineTotal}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderItemRow
