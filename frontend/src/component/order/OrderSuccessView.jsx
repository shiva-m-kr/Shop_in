import React, { useState, useContext } from 'react'
import Title from '../Title'
import Footer from '../Footer'
import { AuthDataContext } from '../../context/authContext'
import { downloadOrderInvoice } from '../../utils/downloadInvoice'
import { FiDownload, FiAlertCircle } from 'react-icons/fi'

function OrderSuccessView({
  confirmedOrder,
  totalAmount,
  paymentMethod,
  formData,
  navigate
}) {
  const { serverUrl } = useContext(AuthDataContext)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  const displayTotal = confirmedOrder?.amount || totalAmount
  const isPaid = Boolean(confirmedOrder?.payment)

  const handleDownloadInvoice = async () => {
    if (!confirmedOrder?._id) return
    try {
      setDownloading(true)
      setDownloadError('')
      const result = await downloadOrderInvoice(confirmedOrder._id, serverUrl)
      if (!result.success) {
        setDownloadError(result.message || 'Failed to download invoice. Please try again.')
      }
    } catch {
      setDownloadError('An unexpected error occurred while downloading invoice.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col justify-between">
      <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center text-3xl mb-4 shadow-sm">
          ✓
        </div>
        <Title text1="ORDER " text2="CONFIRMED" />
        <p className="text-slate-500 text-sm mt-3 mb-6">
          Thank you for shopping with us! Your order has been placed successfully.
        </p>

        {downloadError && (
          <div className="w-full mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left flex items-center gap-2">
            <FiAlertCircle size={15} className="shrink-0 text-red-500" />
            <span>{downloadError}</span>
          </div>
        )}

        <div className="w-full bg-white border border-slate-200/80 shadow-md rounded-2xl p-5 text-left text-sm space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-500">Order ID:</span>
            <span className="text-slate-900 font-semibold text-xs font-mono">{confirmedOrder?._id?.slice(-8).toUpperCase() || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment:</span>
            <span className="text-slate-800 font-medium">
              {confirmedOrder?.paymentMethod || paymentMethod} ({isPaid ? 'Paid' : 'Pending'})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total:</span>
            <span className="text-[#0c7c86] font-extrabold text-base">₹{displayTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Deliver to:</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px]">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
        </div>

        {/* Invoice Download Action */}
        <div className="w-full mb-6">
          {isPaid ? (
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="w-full py-3 px-4 rounded-xl bg-white border-2 border-[#0c7c86] hover:bg-[#0c7c86]/5 text-[#0c7c86] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0c7c86] border-t-transparent rounded-full animate-spin" />
                  <span>Preparing Invoice...</span>
                </>
              ) : (
                <>
                  <FiDownload size={16} />
                  <span>Download Invoice (PDF)</span>
                </>
              )}
            </button>
          ) : (
            <div className="w-full p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-slate-500 text-xs text-center">
              Invoice will be available for download once payment is verified upon delivery.
            </div>
          )}
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 py-2.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white text-sm font-semibold transition-all shadow-md shadow-[#0c7c86]/20 cursor-pointer"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/collection')}
            className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderSuccessView
