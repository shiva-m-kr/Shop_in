import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

function AdminOrderFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  statuses,
  totalFiltered
}) {
  return (
    <div className='bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs mb-6'>
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
        <div className='relative flex-1'>
          <FiSearch size={16} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            type='text'
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder='Search by ID, customer name, email, phone...'
            className='w-full pl-9.5 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all'
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer'
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className='px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all cursor-pointer'
        >
          <option value='All'>All Statuses</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <span className='text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl self-center whitespace-nowrap'>
          {totalFiltered} order{totalFiltered !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

export default AdminOrderFilters
