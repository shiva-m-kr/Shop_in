import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'

function ProductLoading() {
  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 border-4 border-[#0c7c86] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading Product Details...</h2>
        <p className="text-slate-500 text-sm mb-6">Fetching the latest specifications and images.</p>
        <Link
          to="/collection"
          className="inline-block px-6 py-2.5 rounded-xl bg-[#0c7c86] text-white text-sm font-semibold hover:bg-[#096068] transition-colors"
        >
          Browse All Collections
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default ProductLoading
