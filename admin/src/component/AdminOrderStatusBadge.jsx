import React from 'react'

const statusConfig = {
  'Order Placed': {
    bg: 'bg-sky-50',
    border: 'border-sky-200/80',
    text: 'text-sky-700',
    dot: 'bg-sky-500'
  },
  'Processing': {
    bg: 'bg-amber-50',
    border: 'border-amber-200/80',
    text: 'text-amber-700',
    dot: 'bg-amber-500'
  },
  'Shipped': {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200/80',
    text: 'text-indigo-700',
    dot: 'bg-indigo-500'
  },
  'Out for Delivery': {
    bg: 'bg-teal-50',
    border: 'border-teal-200/80',
    text: 'text-teal-700',
    dot: 'bg-teal-500'
  },
  'Delivered': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/80',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500'
  },
  'Cancelled': {
    bg: 'bg-rose-50',
    border: 'border-rose-200/80',
    text: 'text-rose-700',
    dot: 'bg-rose-500'
  }
}

function AdminOrderStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig['Order Placed']

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg} ${config.border} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  )
}

export default AdminOrderStatusBadge
