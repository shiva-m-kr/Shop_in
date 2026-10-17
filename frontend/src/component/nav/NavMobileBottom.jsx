import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiGrid,
  FiSearch,
  FiShoppingCart,
  FiUser
} from 'react-icons/fi'

function NavMobileBottom({
  setShowSearch,
  navigate,
  getCartCount,
  profileOpen,
  setProfileOpen,
  pathname,
  userData,
  userInitial
}) {
  const getMobileNavStyle = ({ isActive }) => `
    flex flex-col items-center justify-center gap-1 w-16
    transition-all duration-200 ease-out
    ${isActive ? 'text-[#0c7c86] -translate-y-0.5 font-bold' : 'text-slate-500 hover:text-[#0c7c86]'}
  `

  return (
    <div className='
      md:hidden fixed bottom-0 left-0 z-40
      w-full h-17.5 pb-safe
      bg-white/95 backdrop-blur-md
      border-t border-slate-200
      shadow-lg
      flex items-center justify-around px-2
    '>
      <NavLink to='/' className={getMobileNavStyle}>
        <FiHome size={22} className="mb-0.5" />
        <span className="text-[10px] font-semibold">Home</span>
      </NavLink>

      <NavLink to='/collection' className={getMobileNavStyle}>
        <FiGrid size={22} className="mb-0.5" />
        <span className="text-[10px] font-semibold">Collection</span>
      </NavLink>

      {/* SEARCH MOBILE */}
      <button
        onClick={() => { setShowSearch(true); navigate('/collection') }}
        className='flex flex-col items-center justify-center gap-1 w-16 text-slate-500 hover:text-[#0c7c86] transition-all cursor-pointer'
      >
        <FiSearch size={22} className="mb-0.5" />
        <span className="text-[10px] font-semibold">Search</span>
      </button>

      {/* CART MOBILE */}
      <button
        onClick={() => navigate('/cart')}
        className='flex flex-col items-center justify-center gap-1 w-16 text-slate-500 hover:text-[#0c7c86] transition-all relative group cursor-pointer'
      >
        <div className='relative'>
          <FiShoppingCart size={22} className="mb-0.5 group-active:scale-95 transition-transform" />
          {getCartCount() > 0 && (
            <span className='
              absolute -top-1 -right-2
              w-4 h-4 flex items-center justify-center
              bg-[#0c7c86] text-white
              rounded-full text-[9px] font-bold border border-white
            '>
              {getCartCount()}
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold">Cart</span>
      </button>

      {/* PROFILE MOBILE TRIGGER */}
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all cursor-pointer ${
          profileOpen || pathname === '/profile' ? 'text-[#0c7c86] font-bold -translate-y-0.5' : 'text-slate-500 hover:text-[#0c7c86]'
        }`}
      >
        {userData ? (
          <div className='relative w-6 h-6 rounded-full bg-gradient-to-tr from-[#0c7c86] to-[#085a62] text-white flex items-center justify-center text-[10px] font-bold shadow-xs mb-0.5 ring-1 ring-white'>
            {userInitial}
            <span className='absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-white rounded-full' />
          </div>
        ) : (
          <FiUser size={22} className="mb-0.5" />
        )}
        <span className="text-[10px] font-semibold">Profile</span>
      </button>
    </div>
  )
}

export default NavMobileBottom
