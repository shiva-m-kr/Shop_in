import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

function QuickAction({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className='w-full flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-[#0c7c86]/40 hover:bg-[#0c7c86]/5 transition-all cursor-pointer group'
    >
      <span className='text-sm font-semibold text-slate-700 group-hover:text-[#0c7c86] transition-colors'>
        {label}
      </span>
      <FiArrowRight
        size={16}
        className='text-slate-400 group-hover:text-[#0c7c86] group-hover:translate-x-0.5 transition-all'
      />
    </button>
  )
}

export default QuickAction
