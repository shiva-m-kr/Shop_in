import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri"
import { FiRotateCcw, FiHeadphones, FiTruck, FiShield, FiClock } from "react-icons/fi"

const policies = [
  {
    icon: RiExchangeFundsLine,
    title: 'Easy Exchange',
    desc: 'Seamless exchanges within 14 days — no questions asked.',
  },
  {
    icon: FiRotateCcw,
    title: '7-Day Return',
    desc: 'We accept returns free within 7 days of delivery.',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    desc: 'Our team is available round the clock to help you anytime.',
  },
]

function OurPolicy() {
  return (
    <section className='w-full bg-[#f4f9f9] pt-16 pb-12 relative overflow-hidden'>
      {/* Header */}
      <div className='text-center mb-12 relative z-10 px-4'>
        <Title text1='Our ' text2='Policy' />
        <p className='text-slate-500 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed'>
          Everything we stand for — transparency, trust, and total care.
        </p>
      </div>

      {/* 3 Crisp White Policy Cards */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-16'>
        {policies.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className='bg-white border border-slate-200/70 hover:border-[#0c7c86]/40 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg flex flex-col items-center group'
          >
            {/* Signature Dark Blue-Grey Circular Icon Badge */}
            <div className='w-12 h-12 rounded-full bg-[#183942] text-[#a5faf7] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs'>
              <Icon size={20} />
            </div>

            {/* Title */}
            <h3 className='text-slate-800 font-bold text-base mb-1.5 tracking-tight group-hover:text-[#0c7c86] transition-colors'>
              {title}
            </h3>

            {/* Description */}
            <p className='text-slate-500 text-xs leading-relaxed max-w-[240px]'>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Feature Bar */}
      <div className='w-full bg-[#eaf4f5] border-y border-teal-100/80 py-4 px-4 sm:px-8'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left'>
          <div className='flex items-center justify-center sm:justify-start gap-3'>
            <div className='w-9 h-9 rounded-full bg-white text-[#0c7c86] flex items-center justify-center shadow-xs'>
              <FiTruck size={17} />
            </div>
            <div>
              <p className='text-xs font-bold text-slate-800'>Free & Express Delivery</p>
              <p className='text-[11px] text-slate-500'>On all qualifying orders</p>
            </div>
          </div>
          <div className='flex items-center justify-center sm:justify-start gap-3'>
            <div className='w-9 h-9 rounded-full bg-white text-[#0c7c86] flex items-center justify-center shadow-xs'>
              <FiShield size={17} />
            </div>
            <div>
              <p className='text-xs font-bold text-slate-800'>100% Secure Checkout</p>
              <p className='text-[11px] text-slate-500'>Protected by Razorpay</p>
            </div>
          </div>
          <div className='flex items-center justify-center sm:justify-start gap-3'>
            <div className='w-9 h-9 rounded-full bg-white text-[#0c7c86] flex items-center justify-center shadow-xs'>
              <FiClock size={17} />
            </div>
            <div>
              <p className='text-xs font-bold text-slate-800'>24/7 Dedicated Support</p>
              <p className='text-[11px] text-slate-500'>Always here to assist you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
