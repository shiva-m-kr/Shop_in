import React from 'react'
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiTag
} from 'react-icons/fi'

function CartSummary({
  itemCount,
  currency,
  subtotal,
  delivery_fee,
  total,
  navigate
}) {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-24 space-y-4">
        {/* Summary Card */}
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Order Summary
            </h3>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
              <span className="text-slate-800 font-semibold">{currency}{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Delivery</span>
              <span className="text-slate-800 font-semibold">{currency}{delivery_fee}</span>
            </div>

            {/* Promo Code Section (visual only) */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <FiTag size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none"
                disabled
              />
              <button className="text-xs font-semibold text-[#0c7c86] opacity-50 cursor-not-allowed">
                Apply
              </button>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-2xl font-black text-[#0c7c86]">{currency}{total}</span>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full py-3.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#0c7c86]/25 flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
              onClick={() => navigate('/place-order')}
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Tax calculated at checkout. Free delivery on orders above {currency}999.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <FiShield className="text-[#0c7c86]" size={18} />
            <span className="text-[10px] font-medium text-slate-600 leading-tight">Secure<br />Payment</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <FiTruck className="text-[#0c7c86]" size={18} />
            <span className="text-[10px] font-medium text-slate-600 leading-tight">Fast<br />Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <FiRefreshCw className="text-[#0c7c86]" size={18} />
            <span className="text-[10px] font-medium text-slate-600 leading-tight">30-Day<br />Returns</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
