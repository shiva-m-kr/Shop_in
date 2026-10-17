import React from 'react'
import { FiTruck, FiShield, FiClock } from 'react-icons/fi'

function FooterFeatures() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 mb-12 border-b border-white/10">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a5faf7] group-hover:bg-[#0c7c86]/20 transition-all duration-300">
          <FiTruck size={22} />
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide">Free & Express Delivery</h4>
          <p className="text-xs text-gray-400 mt-0.5">On orders over minimum order</p>
        </div>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a5faf7] group-hover:bg-[#0c7c86]/20 transition-all duration-300">
          <FiShield size={22} />
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide">100% Secure Checkout</h4>
          <p className="text-xs text-gray-400 mt-0.5">Bank-grade encryption for all payments</p>
        </div>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a5faf7] group-hover:bg-[#0c7c86]/20 transition-all duration-300">
          <FiClock size={22} />
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide">365* Dedicated Support</h4>
          <p className="text-xs text-gray-400 mt-0.5">Ready to assist whenever you need us</p>
        </div>
      </div>
    </div>
  )
}

export default FooterFeatures
