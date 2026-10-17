import React from 'react'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

function AdminOrderAddress({ order, statuses, onStatusUpdate, isUpdating }) {
  const { address } = order

  return (
    <div className='space-y-4'>
      <div>
        <h4 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>Shipping Address</h4>
        <div className='bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 text-xs sm:text-sm'>
          <p className='font-bold text-slate-800'>{address?.firstName} {address?.lastName || ''}</p>
          <p className='text-slate-600 flex items-start gap-1.5'>
            <FiMapPin size={13} className='mt-0.5 shrink-0 text-slate-400' />
            {address?.street}, {address?.city}, {address?.state} {address?.zipcode}
          </p>
          {address?.phone && (
            <p className='text-slate-500 flex items-center gap-1.5'>
              <FiPhone size={12} className='shrink-0' /> {address.phone}
            </p>
          )}
          {address?.email && (
            <p className='text-slate-500 flex items-center gap-1.5'>
              <FiMail size={12} className='shrink-0' /> {address.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <h4 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>Payment Details</h4>
        <div className='bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs sm:text-sm'>
          <div className='flex justify-between'>
            <span className='text-slate-500'>Method</span>
            <span className='font-semibold text-slate-700'>{order.paymentMethod}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-slate-500'>Payment Status</span>
            <div className='flex items-center gap-2'>
              <span className={`font-semibold ${order.payment ? 'text-emerald-600' : 'text-amber-600'}`}>
                {order.payment ? 'Paid' : 'Pending'}
              </span>
              <button
                type='button'
                onClick={() => onStatusUpdate(order._id, order.status, !order.payment)}
                disabled={isUpdating}
                className='text-[11px] font-semibold underline text-[#0c7c86] hover:text-[#09676f] cursor-pointer disabled:opacity-50'
              >
                {order.payment ? 'Mark Unpaid' : 'Mark Paid'}
              </button>
            </div>
          </div>
          <div className='flex justify-between border-t border-slate-200/60 pt-2'>
            <span className='text-slate-500 font-medium'>Total Amount</span>
            <span className='font-bold text-[#0c7c86] text-base'>₹{order.amount}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>Update Order Status</h4>
        <select
          value={order.status}
          onChange={(e) => onStatusUpdate(order._id, e.target.value)}
          disabled={isUpdating}
          className='w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#0c7c86] transition-colors cursor-pointer disabled:opacity-50'
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {isUpdating && <p className='text-xs font-medium text-[#0c7c86] mt-1 animate-pulse'>Updating status...</p>}
      </div>
    </div>
  )
}

export default AdminOrderAddress
