import React from 'react'
import {
  FiUser,
  FiPackage,
  FiShoppingCart,
  FiHelpCircle,
  FiLogOut,
  FiLogIn,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi'

function NavProfileDropdown({
  profileOpen,
  userData,
  userInitial,
  getCartCount,
  setProfileOpen,
  navigate,
  handleLogout
}) {
  if (!profileOpen) return null

  const dropdownItem = `
    flex items-center justify-between w-full
    px-4 py-2.5 text-sm font-medium
    hover:bg-slate-50 hover:text-[#0c7c86]
    transition-colors duration-150 text-slate-700
    group cursor-pointer rounded-xl
  `

  return (
    <div className='
      absolute right-0 top-[calc(100%+10px)]
      w-72 bg-white text-slate-800
      rounded-2xl shadow-xl shadow-slate-900/10
      border border-slate-200/90
      overflow-hidden z-50
      animate-fade-in origin-top-right
    '>
      {/* User Header Info Card */}
      {userData ? (
        <div className='p-4 border-b border-slate-100 bg-gradient-to-br from-[#0c7c86]/5 via-white to-slate-50'>
          <div className='flex items-center gap-3'>
            <div className='relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#0c7c86] to-[#12a1af] text-white flex items-center justify-center text-base font-bold shadow-sm ring-2 ring-white'>
              {userInitial}
              <span className='absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='font-bold text-slate-900 truncate text-sm leading-tight'>
                {userData.name}
              </p>
              <p className='text-xs text-slate-500 truncate mt-0.5'>
                {userData.email}
              </p>
              <div className='mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 w-fit'>
                <FiCheckCircle size={10} className='text-emerald-500' />
                Verified Member
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4 border-b border-slate-100 bg-slate-50/60 text-center'>
          <p className='font-bold text-slate-900 text-sm'>Welcome to ShopIn</p>
          <p className='text-xs text-slate-500 mt-0.5'>Sign in to view your orders & cart</p>
        </div>
      )}

      {/* Dropdown Navigation Actions */}
      <div className='p-2'>
        {userData ? (
          <>
            <button
              onClick={() => { setProfileOpen(false); navigate('/profile') }}
              className={dropdownItem}
            >
              <span className='flex items-center gap-2.5'>
                <FiUser className='text-[#0c7c86]' size={16} />
                <span>My Profile</span>
              </span>
              <FiArrowRight size={14} className='text-slate-300 group-hover:text-[#0c7c86] transition-colors' />
            </button>

            <button
              onClick={() => { setProfileOpen(false); navigate('/orders') }}
              className={dropdownItem}
            >
              <span className='flex items-center gap-2.5'>
                <FiPackage className='text-[#0c7c86]' size={16} />
                <span>My Orders</span>
              </span>
              <FiArrowRight size={14} className='text-slate-300 group-hover:text-[#0c7c86] transition-colors' />
            </button>

            <button
              onClick={() => { setProfileOpen(false); navigate('/cart') }}
              className={dropdownItem}
            >
              <span className='flex items-center gap-2.5'>
                <FiShoppingCart className='text-[#0c7c86]' size={16} />
                <span>Shopping Cart</span>
              </span>
              {getCartCount() > 0 ? (
                <span className='px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#0c7c86]/10 text-[#0c7c86]'>
                  {getCartCount()}
                </span>
              ) : (
                <FiArrowRight size={14} className='text-slate-300 group-hover:text-[#0c7c86] transition-colors' />
              )}
            </button>

            <button
              onClick={() => { setProfileOpen(false); navigate('/contact') }}
              className={dropdownItem}
            >
              <span className='flex items-center gap-2.5'>
                <FiHelpCircle className='text-slate-400 group-hover:text-[#0c7c86]' size={16} />
                <span>Help & Support</span>
              </span>
              <FiArrowRight size={14} className='text-slate-300 group-hover:text-[#0c7c86] transition-colors' />
            </button>

            <div className='h-px bg-slate-100 my-1.5' />

            <button
              onClick={handleLogout}
              className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer font-medium'
            >
              <FiLogOut size={16} />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => { setProfileOpen(false); navigate('/login') }}
            className='w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm text-white bg-[#0c7c86] hover:bg-[#09676f] rounded-xl transition-colors cursor-pointer font-semibold shadow-xs'
          >
            <FiLogIn size={16} />
            <span>Log In / Sign Up</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default NavProfileDropdown
