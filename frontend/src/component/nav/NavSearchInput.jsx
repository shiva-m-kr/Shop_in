import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

function NavSearchInput({ showSearch, setShowSearch, search, setSearch, navigate }) {
  return (
    <div className='relative flex items-center'>
      {showSearch ? (
        <div className='flex items-center gap-2 animate-fade-in'>
          <input
            type='text'
            placeholder='Search products...'
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && search.trim()) {
                navigate('/collection')
              }
            }}
            className='
              w-48 lg:w-64
              px-4 py-2
              text-sm text-slate-800 placeholder-slate-400
              bg-slate-50 border border-slate-200
              rounded-full outline-none
              focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20
              transition-all duration-200
            '
          />
          <button
            onClick={() => { setShowSearch(false); setSearch('') }}
            className='p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-full transition-colors cursor-pointer'
            title='Close Search'
          >
            <FiX size={18}/>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSearch(true)}
          className='p-2 text-slate-600 hover:text-[#0c7c86] hover:bg-slate-100 rounded-full transition-all cursor-pointer'
          title='Search Products'
        >
          <FiSearch size={21}/>
        </button>
      )}
    </div>
  )
}

export default NavSearchInput
