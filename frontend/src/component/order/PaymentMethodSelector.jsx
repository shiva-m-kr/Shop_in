import React from 'react'
import Title from '../Title'
import Razor from '../../assets/Razor.png'

function PaymentMethodSelector({ paymentMethod, setPaymentMethod }) {
  return (
    <div>
      <div className="mb-4 text-left">
        <Title text1="PAYMENT " text2="METHOD" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Razorpay */}
        <div
          onClick={() => setPaymentMethod('Razorpay')}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === 'Razorpay'
              ? 'border-[#0c7c86] bg-[#0c7c86]/5 ring-1 ring-[#0c7c86] shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
              paymentMethod === 'Razorpay' ? 'border-[#0c7c86]' : 'border-slate-300'
            }`}
          >
            {paymentMethod === 'Razorpay' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c7c86]" />
            )}
          </span>
          <img src={Razor} alt="Razorpay" className="h-14 object-contain" />
        </div>

        {/* Stripe */}
        <div
          onClick={() => setPaymentMethod('Stripe')}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === 'Stripe'
              ? 'border-[#0c7c86] bg-[#0c7c86]/5 ring-1 ring-[#0c7c86] shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
              paymentMethod === 'Stripe' ? 'border-[#0c7c86]' : 'border-slate-300'
            }`}
          >
            {paymentMethod === 'Stripe' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c7c86]" />
            )}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider">STRIPE</span>
        </div>

        {/* Cash on Delivery (COD) */}
        <div
          onClick={() => setPaymentMethod('COD')}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === 'COD'
              ? 'border-[#0c7c86] bg-[#0c7c86]/5 ring-1 ring-[#0c7c86] shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
              paymentMethod === 'COD' ? 'border-[#0c7c86]' : 'border-slate-300'
            }`}
          >
            {paymentMethod === 'COD' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c7c86]" />
            )}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800">COD</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodSelector
