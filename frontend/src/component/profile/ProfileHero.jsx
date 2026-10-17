import React from 'react'
import { FiMail, FiCalendar, FiShield, FiCheckCircle } from 'react-icons/fi'

function ProfileHero({ userData, joinedDate }) {
  return (
    <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 mb-8 relative overflow-hidden'>
      <div className='absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-[#0c7c86]/10 to-transparent rounded-full blur-2xl pointer-events-none' />

      <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10'>
        {/* Avatar */}
        <div className='relative'>
          <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#0c7c86] to-[#12a1af] text-white flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg shadow-[#0c7c86]/20 ring-4 ring-white'>
            {userData?.name ? userData.name.slice(0, 1).toUpperCase() : 'U'}
          </div>
          <span className='absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full' title='Active status' />
        </div>

        {/* Info */}
        <div className='flex-1 text-center sm:text-left'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>
                {userData?.name || 'Customer'}
              </h2>
              <p className='text-slate-500 text-sm mt-1 flex items-center justify-center sm:justify-start gap-2'>
                <FiMail className='text-slate-400' />
                <span>{userData?.email}</span>
              </p>
            </div>

            <div className='flex items-center justify-center sm:justify-end gap-2'>
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60'>
                <FiCheckCircle size={13} className='text-emerald-600' />
                Verified Customer
              </span>
            </div>
          </div>

          {/* Badges / Meta */}
          <div className='flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500'>
            <span className='flex items-center gap-1.5'>
              <FiCalendar className='text-[#0c7c86]' />
              Joined: {joinedDate}
            </span>
            <span className='flex items-center gap-1.5'>
              <FiShield className='text-[#0c7c86]' />
              Account Secured
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHero
