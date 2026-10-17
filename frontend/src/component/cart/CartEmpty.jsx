import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import Footer from '../Footer'

function CartEmpty() {
  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Animated empty bag icon */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
            <FiShoppingBag size={48} className="text-slate-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#0c7c86] text-white flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold">0</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Your bag is empty
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          Looks like you haven't added anything yet. Explore our collections to find something you'll love.
        </p>

        <Link
          to="/collection"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#0c7c86]/25 group"
        >
          <span>Browse Collections</span>
          <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default CartEmpty
