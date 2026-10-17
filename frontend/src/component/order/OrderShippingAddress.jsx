import React from 'react'

function OrderShippingAddress({ address }) {
  if (!address) return null

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Shipping Address
        </h3>
      </div>
      <div className="p-5 text-sm text-slate-600 space-y-1">
        <p className="text-slate-900 font-bold">
          {address.firstName} {address.lastName || ''}
        </p>
        <p>{address.street}</p>
        <p>{address.city}, {address.state} {address.zipcode}</p>
        <p>{address.country || 'India'}</p>
        {address.phone && (
          <p className="text-slate-500 pt-1">📞 {address.phone}</p>
        )}
        {address.email && (
          <p className="text-slate-500">✉️ {address.email}</p>
        )}
      </div>
    </div>
  )
}

export default OrderShippingAddress
