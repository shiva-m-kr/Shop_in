import React from 'react'
import Title from '../Title'

function OrderCartTotals({ subtotal, delivery_fee, totalAmount }) {
  return (
    <div>
      <div className="mb-4 text-left">
        <Title text1="CART " text2="TOTALS" />
      </div>
      <div className="space-y-3 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="text-slate-800 font-semibold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Shipping Fee</span>
          <span className="text-slate-800 font-semibold">₹{delivery_fee}</span>
        </div>
        <div className="h-px bg-slate-100 my-2" />
        <div className="flex justify-between text-base font-bold text-slate-900">
          <span>Total</span>
          <span className="text-[#0c7c86] text-xl font-black">₹{totalAmount}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderCartTotals
