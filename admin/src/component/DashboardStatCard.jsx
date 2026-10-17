import React from 'react'
function DashboardStatCard({ icon: Icon, label, value, sub, color = 'text-[#0c7c86]' }) {
  return (
    <div className='bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-3 shadow-xs hover:shadow-sm hover:border-[#0c7c86]/40 transition-all duration-200'>
      <div className='flex items-center justify-between'>
        <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        {sub && (
          <span className='text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60'>
            {sub}
          </span>
        )}
      </div>
      <div>
        <p className='text-2xl font-bold text-slate-900 tracking-tight'>{value}</p>
        <p className='text-xs font-medium text-slate-500 mt-1'>{label}</p>
      </div>
    </div>
  )
}

export default DashboardStatCard
