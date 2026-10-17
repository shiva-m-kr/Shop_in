import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import OrderStatusBadge from './OrderStatusBadge'
import { AuthDataContext } from '../context/authContext'
import { downloadOrderInvoice } from '../utils/downloadInvoice'
import { FiChevronRight, FiDownload, FiAlertCircle } from 'react-icons/fi'

function OrderCard({ order, currency }) {
  const { serverUrl } = useContext(AuthDataContext)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  const orderDate = new Date(order.date || order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const itemCount = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const shortId = order._id.slice(-8).toUpperCase()

  const handleDownloadInvoice = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      setDownloading(true)
      setDownloadError('')
      const result = await downloadOrderInvoice(order._id, serverUrl)
      if (!result.success) {
        setDownloadError(result.message || 'Download failed')
      }
    } catch {
      setDownloadError('Download failed')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Link
      to={`/orders/${order._id}`}
      className="block rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all group"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Order</span>
            <span className="text-sm font-mono font-bold text-slate-900">#{shortId}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">{orderDate}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {order.payment && (
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              title="Download Invoice (PDF)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0c7c86] bg-[#0c7c86]/5 hover:bg-[#0c7c86]/10 border border-[#0c7c86]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {downloading ? (
                <div className="w-3 h-3 border-2 border-[#0c7c86] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiDownload size={13} />
              )}
              <span className="hidden sm:inline">Invoice</span>
            </button>
          )}
          <OrderStatusBadge status={order.status} />
          <FiChevronRight size={16} className="text-slate-400 group-hover:text-[#0c7c86] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {downloadError && (
        <div className="mx-4 mt-3 p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-1.5">
          <FiAlertCircle size={13} className="shrink-0" />
          <span>{downloadError}</span>
        </div>
      )}

      {/* Items Preview */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3">
          {/* Show first 3 item images */}
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white bg-slate-50 shadow-xs shrink-0"
              >
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-10 h-10 rounded-lg border-2 border-white bg-slate-100 shadow-xs flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-slate-600">+{order.items.length - 3}</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {order.paymentMethod} • {order.payment ? 'Paid' : 'Pending'}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-base font-extrabold text-slate-900">{currency}{order.amount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OrderCard
