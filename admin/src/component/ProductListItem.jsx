import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

function ProductListItem({ item, onRemove }) {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_3fr_1.5fr_1fr_auto] items-center gap-4 p-3.5 bg-white border border-slate-200/80 rounded-xl hover:shadow-xs hover:border-[#0c7c86]/40 transition-all'>
      <img
        className='w-14 h-14 object-cover rounded-xl border border-slate-200/80 bg-slate-50 shrink-0'
        src={item.image1 || 'https://via.placeholder.com/64?text=No+Image'}
        alt={item.name}
      />

      <div className='min-w-0'>
        <p className='font-semibold text-slate-800 text-sm truncate'>{item.name}</p>
        <span className='inline-block md:hidden text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-1'>
          {item.category}
        </span>
      </div>

      <div className='hidden md:block'>
        <span className='text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full'>
          {item.category}
        </span>
      </div>

      <p className='font-bold text-sm text-[#0c7c86]'>₹{item.price}</p>

      <div className='flex justify-end'>
        <button
          onClick={() => onRemove(item._id)}
          className='p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-xl transition-colors cursor-pointer'
          title='Delete Product'
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default ProductListItem
