import React, { useContext, useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { UserDataContext } from '../context/UserContext'
import { shopContext } from '../context/ShopConext'
import NavDesktopLinks from './nav/NavDesktopLinks'
import NavSearchInput from './nav/NavSearchInput'
import NavProfileDropdown from './nav/NavProfileDropdown'
import NavMobileBottom from './nav/NavMobileBottom'
import NavMobileDrawer from './nav/NavMobileDrawer'

import {
  FiShoppingCart,
  FiUser,
  FiChevronDown
} from 'react-icons/fi'

function Nav() {
  const { userData, logout } = useContext(UserDataContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopContext)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // Handle click outside & escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false)
      }
    }

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [profileOpen])

  // Close profile dropdown on route change
  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    setProfileOpen(false)
    navigate('/login')
  }

  const userInitial = userData?.name ? userData.name.trim().charAt(0).toUpperCase() : 'U'
  const userFirstName = userData?.name ? userData.name.trim().split(' ')[0] : 'Account'

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className='
        fixed top-0 left-0 z-40
        w-full h-17.5
        bg-white/95 backdrop-blur-md
        text-slate-800 shadow-xs border-b border-slate-200/80
        flex items-center justify-between
        px-4 sm:px-6 md:px-8 lg:px-12
      '>
        {/* LOGO */}
        <NavLink to='/' className='flex items-center gap-2.5 shrink-0 cursor-pointer group'>
          <img
            src={logo}
            alt='ShopIn Logo'
            className='w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm'
          />
          <h1 className='text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#0c7c86] transition-colors'>
            Shop<span className='text-[#0c7c86]'>In</span>
          </h1>
        </NavLink>

        {/* DESKTOP LINKS */}
        <NavDesktopLinks />

        {/* RIGHT SIDE */}
        <div className='hidden md:flex items-center gap-3'>
          {/* SEARCH */}
          <NavSearchInput
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            search={search}
            setSearch={setSearch}
            navigate={navigate}
          />

          {/* CART */}
          <button
            onClick={() => navigate('/cart')}
            className='relative p-2 text-slate-700 hover:text-[#0c7c86] hover:bg-slate-100 rounded-full transition-all cursor-pointer group'
            title='View Cart'
          >
            <FiShoppingCart size={21} className="group-hover:scale-105 transition-transform"/>
            {getCartCount() > 0 && (
              <span className='
                absolute top-0 right-0
                w-4.5 h-4.5
                flex items-center justify-center
                bg-[#0c7c86] text-white
                rounded-full text-[10px] font-bold
                border-2 border-white shadow-xs
              '>
                {getCartCount()}
              </span>
            )}
          </button>

          {/* DESKTOP PROFILE SECTION */}
          <div className='relative ml-1' ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`
                flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full
                border transition-all duration-200 cursor-pointer
                ${profileOpen
                  ? 'border-[#0c7c86] bg-[#0c7c86]/5 ring-2 ring-[#0c7c86]/20'
                  : 'border-slate-200 hover:border-[#0c7c86]/40 hover:bg-slate-50'}
              `}
              aria-label='User Profile Menu'
              aria-expanded={profileOpen}
            >
              <div className='relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#0c7c86] to-[#12a1af] text-white font-bold text-xs shadow-xs'>
                {userData ? userInitial : <FiUser size={15} />}
                {userData && (
                  <span className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full' />
                )}
              </div>

              {userData && (
                <span className='text-xs font-semibold text-slate-700 max-w-[85px] truncate hidden lg:inline-block'>
                  {userFirstName}
                </span>
              )}

              <FiChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${
                  profileOpen ? 'rotate-180 text-[#0c7c86]' : ''
                }`}
              />
            </button>

            <NavProfileDropdown
              profileOpen={profileOpen}
              userData={userData}
              userInitial={userInitial}
              getCartCount={getCartCount}
              setProfileOpen={setProfileOpen}
              navigate={navigate}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVBAR */}
      <NavMobileBottom
        setShowSearch={setShowSearch}
        navigate={navigate}
        getCartCount={getCartCount}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        pathname={location.pathname}
        userData={userData}
        userInitial={userInitial}
      />

      {/* MOBILE PROFILE DRAWER / BOTTOM SHEET */}
      <NavMobileDrawer
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        userData={userData}
        userInitial={userInitial}
        navigate={navigate}
        getCartCount={getCartCount}
        handleLogout={handleLogout}
      />
      
      {/* Spacer to prevent content hiding behind fixed navbar */}
      <div className="h-17.5 md:h-17.5"></div>
    </>
  )
}

export default Nav