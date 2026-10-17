import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiGrid, FiInfo, FiPhone } from 'react-icons/fi'

function NavDesktopLinks() {
  const getDesktopNavStyle = ({ isActive }) => `
    relative flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium text-[14px]
    transition-all duration-200 ease-out group
    ${isActive
      ? 'bg-[#0c7c86]/10 text-[#0c7c86] border border-[#0c7c86]/25 font-semibold shadow-xs'
      : 'text-slate-600 hover:text-[#0c7c86] hover:bg-slate-100/70 border border-transparent'}
  `

  return (
    <div className='hidden md:flex items-center gap-2 lg:gap-5'>
      <NavLink to='/' className={getDesktopNavStyle}>
        <FiHome className="text-[17px]"/>
        <span>Home</span>
      </NavLink>

      <NavLink to='/collection' className={getDesktopNavStyle}>
        <FiGrid className="text-[17px]"/>
        <span>Collections</span>
      </NavLink>

      <NavLink to='/about' className={getDesktopNavStyle}>
        <FiInfo className="text-[17px]"/>
        <span>About</span>
      </NavLink>

      <NavLink to='/contact' className={getDesktopNavStyle}>
        <FiPhone className="text-[17px]"/>
        <span>Contact</span>
      </NavLink>
    </div>
  )
}

export default NavDesktopLinks
