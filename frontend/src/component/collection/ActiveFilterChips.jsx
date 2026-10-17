import React from 'react'
import { FiX } from 'react-icons/fi'

function ActiveFilterChips({
  search,
  setSearch,
  activeFilters,
  setSelectedCategories,
  setSelectedSubCategories,
  clearAll
}) {
  if (activeFilters.length === 0 && !search.trim()) return null

  return (
    <div className='flex flex-wrap gap-2 mt-4'>
      {search.trim() && (
        <span className='flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#0c7c86]/10 border border-[#0c7c86]/25 text-[#0c7c86] shadow-xs'>
          🔍 "{search}"
          <button
            onClick={() => setSearch('')}
            className='hover:text-slate-900 transition-colors cursor-pointer'
            aria-label='Clear search'
          >
            <FiX size={12} />
          </button>
        </span>
      )}
      {activeFilters.map(f => (
        <span
          key={f}
          className='flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#0c7c86]/10 border border-[#0c7c86]/25 text-[#0c7c86] shadow-xs'
        >
          {f}
          <button
            onClick={() => {
              setSelectedCategories(prev => prev.filter(v => v !== f))
              setSelectedSubCategories(prev => prev.filter(v => v !== f))
            }}
            className='hover:text-slate-900 transition-colors cursor-pointer'
            aria-label={`Remove ${f} filter`}
          >
            <FiX size={12} />
          </button>
        </span>
      ))}
      <button
        onClick={clearAll}
        className='text-xs text-slate-500 hover:text-red-500 transition-colors underline ml-1 cursor-pointer font-medium'
      >
        Clear all
      </button>
    </div>
  )
}

export default ActiveFilterChips
