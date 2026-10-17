import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiHome, FiPlusCircle, FiList, FiPackage } from 'react-icons/fi'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/add', label: 'Add Items', icon: FiPlusCircle },
  { path: '/lists', label: 'List Items', icon: FiList },
  { path: '/orders', label: 'Orders', icon: FiPackage },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className='fixed top-15 left-0 z-40 w-[18%] min-w-[68px] md:min-w-[210px] h-[calc(100vh-3.75rem)] bg-white/95 backdrop-blur-md border-r border-slate-200/80 shadow-xs flex flex-col justify-between p-2.5 md:p-4'>
      <div>
        <p className='hidden md:block text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-3'>
          Navigation
        </p>
        <nav className='flex flex-col gap-1.5'>
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = isActive(path)
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`
                  w-full flex items-center justify-center md:justify-start gap-3
                  px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                  cursor-pointer group relative
                  ${active
                    ? 'bg-[#0c7c86]/10 text-[#0c7c86] border border-[#0c7c86]/25 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-[#0c7c86] hover:bg-slate-100/70 border border-transparent font-medium'}
                `}
                title={label}
              >
                {active && (
                  <span className='hidden md:block absolute left-1 top-2 bottom-2 w-1 bg-[#0c7c86] rounded-full' />
                )}
                <Icon size={19} className='shrink-0 group-hover:scale-105 transition-transform' />
                <span className='hidden md:inline truncate'>{label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className='pt-3 border-t border-slate-100'>
        <div className='hidden md:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/60'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
          </span>
          <div className='flex flex-col min-w-0'>
            <span className='text-[11px] font-semibold text-slate-800 leading-tight'>Admin Panel</span>
            <span className='text-[10px] text-slate-400 truncate'>ShopIn v1.0</span>
          </div>
        </div>
        <div className='md:hidden flex justify-center py-1'>
          <span className='w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200' title='Admin Online' />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
