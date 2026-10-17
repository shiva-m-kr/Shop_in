import React from 'react'
import {
  FiPackage,
  FiShoppingCart,
  FiPhoneCall,
  FiExternalLink
} from 'react-icons/fi'

function ProfileShortcuts({ navigate, getCartCount }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
      {/* Orders */}
      <div
        onClick={() => navigate('/orders')}
        className='bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#0c7c86]/40 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between'
      >
        <div className='flex items-center gap-3.5'>
          <div className='w-11 h-11 rounded-xl bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center text-xl group-hover:scale-105 transition-transform'>
            <FiPackage />
          </div>
          <div>
            <p className='text-xs text-slate-500 font-medium'>View & Track</p>
            <h4 className='font-bold text-slate-900 text-sm group-hover:text-[#0c7c86] transition-colors'>
              My Orders
            </h4>
          </div>
        </div>
        <FiExternalLink className='text-slate-400 group-hover:text-[#0c7c86] transition-colors text-sm' />
      </div>

      {/* Cart */}
      <div
        onClick={() => navigate('/cart')}
        className='bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#0c7c86]/40 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between'
      >
        <div className='flex items-center gap-3.5'>
          <div className='w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform'>
            <FiShoppingCart />
          </div>
          <div>
            <p className='text-xs text-slate-500 font-medium'>Shopping Bag</p>
            <h4 className='font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors'>
              Cart ({getCartCount()})
            </h4>
          </div>
        </div>
        <FiExternalLink className='text-slate-400 group-hover:text-amber-600 transition-colors text-sm' />
      </div>

      {/* Support */}
      <div
        onClick={() => navigate('/contact')}
        className='bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#0c7c86]/40 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between'
      >
        <div className='flex items-center gap-3.5'>
          <div className='w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-105 transition-transform'>
            <FiPhoneCall />
          </div>
          <div>
            <p className='text-xs text-slate-500 font-medium'>24/7 Help</p>
            <h4 className='font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors'>
              Support & FAQ
            </h4>
          </div>
        </div>
        <FiExternalLink className='text-slate-400 group-hover:text-indigo-600 transition-colors text-sm' />
      </div>
    </div>
  )
}

export default ProfileShortcuts
