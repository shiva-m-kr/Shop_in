import React from 'react'
import {
  FiX,
  FiUser,
  FiPackage,
  FiShoppingCart,
  FiHelpCircle,
  FiLogOut,
  FiArrowRight
} from 'react-icons/fi'

function NavMobileDrawer({
  profileOpen,
  setProfileOpen,
  userData,
  userInitial,
  navigate,
  getCartCount,
  handleLogout
}) {
  if (!profileOpen) return null

  return (
    <div className='md:hidden fixed inset-0 z-50 flex flex-col justify-end'>
      {/* Backdrop */}
      <div
        onClick={() => setProfileOpen(false)}
        className='fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in'
      />

      {/* Bottom Sheet Card */}
      <div className='relative z-10 w-full bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-6 animate-slide-up pb-10'>
        {/* Grab handle */}
        <div className='w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4' />

        {/* Header */}
        <div className='flex items-center justify-between pb-4 border-b border-slate-100'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-[#0c7c86] to-[#12a1af] text-white flex items-center justify-center text-lg font-bold shadow-sm'>
              {userInitial}
            </div>
            <div>
              <h3 className='font-bold text-slate-900 text-base leading-tight'>
                {userData?.name || 'Account'}
              </h3>
              <p className='text-xs text-slate-500 truncate max-w-[200px] mt-0.5'>
                {userData?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => setProfileOpen(false)}
            className='p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors cursor-pointer'
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Links List */}
        <div className='py-3 space-y-1'>
          <button
            onClick={() => { setProfileOpen(false); navigate('/profile') }}
            className='w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors'
          >
            <span className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center'>
                <FiUser size={18} />
              </div>
              <span>My Profile</span>
            </span>
            <FiArrowRight size={16} className='text-slate-400' />
          </button>

          <button
            onClick={() => { setProfileOpen(false); navigate('/orders') }}
            className='w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors'
          >
            <span className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center'>
                <FiPackage size={18} />
              </div>
              <span>My Orders</span>
            </span>
            <FiArrowRight size={16} className='text-slate-400' />
          </button>

          <button
            onClick={() => { setProfileOpen(false); navigate('/cart') }}
            className='w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors'
          >
            <span className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center'>
                <FiShoppingCart size={18} />
              </div>
              <span>Shopping Cart</span>
            </span>
            {getCartCount() > 0 ? (
              <span className='px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#0c7c86] text-white'>
                {getCartCount()}
              </span>
            ) : (
              <FiArrowRight size={16} className='text-slate-400' />
            )}
          </button>

          <button
            onClick={() => { setProfileOpen(false); navigate('/contact') }}
            className='w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors'
          >
            <span className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center'>
                <FiHelpCircle size={18} />
              </div>
              <span>Contact Support</span>
            </span>
            <FiArrowRight size={16} className='text-slate-400' />
          </button>
        </div>

        {/* Logout Action */}
        <div className='pt-2 border-t border-slate-100'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-semibold text-sm transition-colors cursor-pointer border border-rose-200/50'
          >
            <FiLogOut size={16} /> Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavMobileDrawer
