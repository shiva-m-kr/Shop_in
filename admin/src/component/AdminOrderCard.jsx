import React, { useState } from 'react'
import AdminOrderStatusBadge from './AdminOrderStatusBadge'
import AdminOrderAddress from './AdminOrderAddress'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

function AdminOrderCard({ order, statuses, onStatusUpdate, isUpdating }) {
  const [expanded, setExpanded] = useState(false)

  const orderDate = new Date(order.date || order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
  const shortId = '#' + order._id.slice(-8).toUpperCase()
  const itemCount = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <div className='bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden hover:border-[#0c7c86]/40 transition-all'>
      <div
        className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 cursor-pointer hover:bg-slate-50/60 transition-colors'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='flex items-center gap-3.5 flex-wrap'>
          <span className='text-sm font-mono font-bold text-slate-800'>{shortId}</span>
          <span className='text-xs font-medium text-slate-400'>{orderDate}</span>
          <AdminOrderStatusBadge status={order.status} />
        </div>

        <div className='flex items-center gap-4'>
          <span className='text-xs sm:text-sm text-slate-500 font-medium'>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
          <span className='text-base font-bold text-[#0c7c86]'>₹{order.amount}</span>
          {expanded ? <FiChevronUp size={18} className='text-slate-400' /> : <FiChevronDown size={18} className='text-slate-400' />}
        </div>
      </div>

      {expanded && (
        <div className='border-t border-slate-100 p-4 md:p-6 bg-slate-50/30'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2 space-y-2.5'>
              <h4 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>Order Items</h4>
              {order.items.map((item, i) => (
                <div key={i} className='flex items-center gap-3.5 bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs'>
                  <img
                    src={item.image1}
                    alt={item.name}
                    className='w-12 h-12 rounded-lg object-cover bg-slate-50 border border-slate-100 shrink-0'
                  />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-slate-800 truncate'>{item.name}</p>
                    <p className='text-xs text-slate-500 mt-0.5'>
                      Size: {item.size} • Qty: {item.quantity || 1} • ₹{item.price}
                    </p>
                  </div>
                  <p className='text-sm font-bold text-[#0c7c86] shrink-0'>
                    ₹{item.price * (item.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>

            <AdminOrderAddress
              order={order}
              statuses={statuses}
              onStatusUpdate={onStatusUpdate}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrderCard
