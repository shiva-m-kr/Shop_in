import React from 'react'
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { CATEGORIES, SUB_CATEGORIES } from './collectionData'

function CollectionSidebar({
  showFilters,
  setShowFilters,
  catOpen,
  setCatOpen,
  subCatOpen,
  setSubCatOpen,
  selectedCategories,
  setSelectedCategories,
  selectedSubCategories,
  setSelectedSubCategories,
  toggleValue
}) {
  return (
    <aside className='w-full md:w-56 shrink-0'>
      {/* Mobile toggle */}
      <button
        onClick={() => setShowFilters(p => !p)}
        className='md:hidden w-full flex items-center justify-between px-4 py-3 mb-4 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-semibold shadow-xs'
      >
        <span className='flex items-center gap-2'>
          <FiFilter size={16} /> Filters
        </span>
        {showFilters ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-5`}>
        {/* Categories */}
        <div className='rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden'>
          <button
            onClick={() => setCatOpen(p => !p)}
            className='w-full flex items-center justify-between px-4 py-3 text-sm font-bold bg-[#33535d] text-white transition-colors cursor-pointer'
          >
            Categories
            {catOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
          </button>
          {catOpen && (
            <div className='p-4 space-y-3 bg-white'>
              {CATEGORIES.map(cat => (
                <label
                  key={cat}
                  className='flex items-center gap-3 cursor-pointer group'
                >
                  <div
                    className={`relative flex items-center justify-center w-4.5 h-4.5 rounded border transition-colors ${
                      selectedCategories.includes(cat)
                        ? 'bg-[#0c7c86] border-[#0c7c86]'
                        : 'bg-slate-50 border-slate-300 group-hover:border-[#0c7c86]'
                    }`}
                  >
                    <input
                      type='checkbox'
                      id={`cat-${cat}`}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleValue(setSelectedCategories, cat)}
                      className='absolute inset-0 opacity-0 cursor-pointer w-full h-full'
                    />
                    {selectedCategories.includes(cat) && (
                      <svg className='w-3 h-3 text-white' viewBox='0 0 12 12' fill='none'>
                        <path d='M2 6l3 3 5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    )}
                  </div>
                  <span className='text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors select-none'>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sub Categories */}
        <div className='rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden'>
          <button
            onClick={() => setSubCatOpen(p => !p)}
            className='w-full flex items-center justify-between px-4 py-3 text-sm font-bold bg-[#33535d] text-white transition-colors cursor-pointer'
          >
            Sub Categories
            {subCatOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
          </button>
          {subCatOpen && (
            <div className='p-4 space-y-3 bg-white'>
              {SUB_CATEGORIES.map(sub => (
                <label
                  key={sub}
                  className='flex items-center gap-3 cursor-pointer group'
                >
                  <div
                    className={`relative flex items-center justify-center w-4.5 h-4.5 rounded border transition-colors ${
                      selectedSubCategories.includes(sub)
                        ? 'bg-[#0c7c86] border-[#0c7c86]'
                        : 'bg-slate-50 border-slate-300 group-hover:border-[#0c7c86]'
                    }`}
                  >
                    <input
                      type='checkbox'
                      id={`sub-${sub}`}
                      checked={selectedSubCategories.includes(sub)}
                      onChange={() => toggleValue(setSelectedSubCategories, sub)}
                      className='absolute inset-0 opacity-0 cursor-pointer w-full h-full'
                    />
                    {selectedSubCategories.includes(sub) && (
                      <svg className='w-3 h-3 text-white' viewBox='0 0 12 12' fill='none'>
                        <path d='M2 6l3 3 5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    )}
                  </div>
                  <span className='text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors select-none'>
                    {sub}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default CollectionSidebar
