import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { FiLogOut } from 'react-icons/fi'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)

  const logout = async () => {
    try {
      await axios.get(serverUrl + 'auth/logout', { withCredentials: true })
      getAdmin()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='fixed top-0 left-0 z-50 w-full h-15 bg-white/95 backdrop-blur-md text-slate-800 shadow-xs border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 md:px-8'>
      <div
        className='flex items-center gap-2.5 cursor-pointer group'
        onClick={() => navigate('/')}
      >
        <img
          src={logo}
          alt='ShopIn'
          className='w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm'
        />
        <div className='flex items-center gap-2'>
          <h1 className='text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#0c7c86] transition-colors'>
            Shop<span className='text-[#0c7c86]'>In</span>
          </h1>
          <span className='text-[10px] font-bold bg-[#0c7c86]/10 text-[#0c7c86] px-2 py-0.5 rounded-full border border-[#0c7c86]/25 uppercase tracking-wider'>
            Admin
          </span>
        </div>
      </div>

      <button
        onClick={logout}
        className='flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-full transition-all cursor-pointer shadow-xs'
        title='Logout'
      >
        <FiLogOut size={14} />
        <span className='hidden sm:inline'>Sign Out</span>
      </button>
    </header>
  )
}

export default Nav