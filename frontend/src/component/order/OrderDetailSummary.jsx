import React from 'react'
import { FiDownload } from 'react-icons/fi'

function OrderDetailSummary({
  order,
  itemsSubtotal,
  deliveryFee,
  currency,
  onDownloadInvoice,
  downloading
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Summary
        </h3>
      </div>
      <div className="p-5 space-y-3 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="text-slate-800 font-semibold">{currency}{itemsSubtotal}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Delivery</span>
          <span className="text-slate-800 font-semibold">{currency}{deliveryFee > 0 ? deliveryFee : 0}</span>
        </div>
        <div className="h-px bg-slate-100 my-1" />
        <div className="flex justify-between text-base font-bold">
          <span className="text-slate-900">Total</span>
          <span className="text-[#0c7c86] font-extrabold text-lg">{currency}{order.amount}</span>
        </div>
        <div className="h-px bg-slate-100 my-1" />
        <div className="flex justify-between text-slate-500">
          <span>Payment</span>
          <span className="text-slate-800 font-semibold">{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Status</span>
          <span className={`font-semibold ${order.payment ? 'text-emerald-600' : 'text-amber-600'}`}>
            {order.payment ? 'Paid' : 'Pending'}
          </span>
        </div>

        {onDownloadInvoice && (
          <div className="pt-2">
            {order.payment ? (
              <button
                onClick={onDownloadInvoice}
                disabled={downloading}
                className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#0c7c86] text-[#0c7c86] hover:bg-[#0c7c86]/5 font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {downloading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#0c7c86] border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Invoice...</span>
                  </>
                ) : (
                  <>
                    <FiDownload size={14} />
                    <span>Download Invoice (PDF)</span>
                  </>
                )}
              </button>
            ) : (
              <p className="text-[11px] text-slate-400 text-center italic">
                Invoice available upon payment verification
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetailSummary
