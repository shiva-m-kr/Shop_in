import React from 'react'

const STATUS_COLORS = {
  placed: { bg: 'bg-sky-500', text: 'text-sky-700' },
  processing: { bg: 'bg-amber-500', text: 'text-amber-700' },
  shipped: { bg: 'bg-indigo-500', text: 'text-indigo-700' },
  delivered: { bg: 'bg-emerald-500', text: 'text-emerald-700' },
  cancelled: { bg: 'bg-rose-500', text: 'text-rose-700' },
}

const STATUS_LABELS = {
  placed: 'Order Placed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

function OrderStatusChart({ ordersByStatus, total }) {
  if (total === 0) {
    return <p className='text-center text-slate-400 py-8 text-sm'>No orders to display.</p>
  }

  return (
    <div className='space-y-3.5'>
      {Object.entries(ordersByStatus).map(([key, count]) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0
        const { bg, text } = STATUS_COLORS[key] || STATUS_COLORS.placed
        return (
          <div key={key} className='flex items-center gap-3'>
            <span className={`text-xs font-semibold w-24 truncate ${text}`}>
              {STATUS_LABELS[key]}
            </span>
            <div className='flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden'>
              <div
                className={`h-full rounded-full ${bg} transition-all duration-700`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className='text-xs font-semibold text-slate-500 w-10 text-right'>{count}</span>
          </div>
        )
      })}
    </div>
  )
}

export default OrderStatusChart
