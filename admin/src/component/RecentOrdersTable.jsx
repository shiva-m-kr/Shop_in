import React from 'react'
import AdminOrderStatusBadge from './AdminOrderStatusBadge'

function RecentOrdersTable({ orders }) {
  if (orders.length === 0) {
    return (
      <p className='text-center text-slate-400 py-10 text-sm'>No orders yet.</p>
    )
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/80'>
            <th className='text-left py-3 px-3'>Order ID</th>
            <th className='text-left py-3 px-3'>Customer</th>
            <th className='text-left py-3 px-3 hidden sm:table-cell'>Items</th>
            <th className='text-right py-3 px-3'>Amount</th>
            <th className='text-left py-3 px-3'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const shortId = '#' + order._id.slice(-8).toUpperCase()
            const name = order.address?.firstName || 'N/A'
            const itemCount = order.items.reduce((s, i) => s + (i.quantity || 1), 0)
            return (
              <tr key={order._id} className='border-b border-slate-100 hover:bg-slate-50/80 transition-colors'>
                <td className='py-3.5 px-3 font-mono font-semibold text-slate-800'>{shortId}</td>
                <td className='py-3.5 px-3 text-slate-700 font-medium'>{name}</td>
                <td className='py-3.5 px-3 text-slate-500 hidden sm:table-cell'>{itemCount}</td>
                <td className='py-3.5 px-3 text-right font-bold text-[#0c7c86]'>₹{order.amount}</td>
                <td className='py-3.5 px-3'><AdminOrderStatusBadge status={order.status} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecentOrdersTable
