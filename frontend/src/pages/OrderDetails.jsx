import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthDataContext } from '../context/AuthContext'
import { shopContext } from '../context/ShopConext'
import Title from '../component/Title'
import Footer from '../component/Footer'
import OrderStatusBadge from '../component/OrderStatusBadge'
import OrderItemRow from '../component/OrderItemRow'
import OrderDetailSummary from '../component/order/OrderDetailSummary'
import OrderShippingAddress from '../component/order/OrderShippingAddress'
import { downloadOrderInvoice } from '../utils/downloadInvoice'
import { FiChevronRight, FiArrowLeft, FiDownload, FiAlertCircle } from 'react-icons/fi'

function OrderDetails() {
  const { orderId } = useParams()
  const { serverUrl } = useContext(AuthDataContext)
  const { currency } = useContext(shopContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  const handleDownloadInvoice = async () => {
    if (!order?._id) return
    try {
      setDownloading(true)
      setDownloadError('')
      const result = await downloadOrderInvoice(order._id, serverUrl)
      if (!result.success) {
        setDownloadError(result.message || 'Failed to download invoice. Please try again.')
      }
    } catch {
      setDownloadError('An unexpected error occurred while downloading the invoice.')
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${serverUrl}/api/order/${orderId}`,
          { withCredentials: true }
        )
        if (response.data.success) {
          setOrder(response.data.order)
        }
      } catch (err) {
        console.error('Fetch order error:', err)
        setError(
          err.response?.data?.message || 'Failed to load order details.'
        )
      } finally {
        setLoading(false)
      }
    }

    if (orderId) fetchOrder()
  }, [orderId, serverUrl])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-[#0c7c86] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-500 text-sm">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Order not found'}</p>
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c7c86] hover:text-[#096068] transition-colors"
          >
            <FiArrowLeft size={14} />
            <span>Back to My Orders</span>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const orderDate = new Date(order.date || order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const itemsSubtotal = order.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  const deliveryFee = order.amount - itemsSubtotal
  const shortId = order._id.slice(-8).toUpperCase()

  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-[#0c7c86] transition-colors">Home</Link>
          <FiChevronRight size={14} className="text-slate-400" />
          <Link to="/orders" className="hover:text-[#0c7c86] transition-colors">My Orders</Link>
          <FiChevronRight size={14} className="text-slate-400" />
          <span className="text-[#0c7c86] font-semibold">#{shortId}</span>
        </nav>

        {/* Download Error Banner */}
        {downloadError && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <FiAlertCircle size={16} className="text-red-500 shrink-0" />
            <span>{downloadError}</span>
          </div>
        )}

        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Title text1="ORDER " text2={`#${shortId}`} />
            <p className="text-slate-500 text-sm mt-1">{orderDate}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <OrderStatusBadge status={order.status} />
            {order.payment && (
              <button
                onClick={handleDownloadInvoice}
                disabled={downloading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#0c7c86] hover:bg-[#0c7c86]/5 text-[#0c7c86] font-semibold text-xs sm:text-sm transition-all shadow-xs disabled:opacity-60 cursor-pointer"
                title="Download PDF Invoice"
              >
                {downloading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#0c7c86] border-t-transparent rounded-full animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <FiDownload size={15} />
                    <span>Download Invoice</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Items ({order.items.length})
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {order.items.map((item, index) => (
                  <OrderItemRow key={index} item={item} currency={currency} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Summary + Address */}
          <div className="space-y-4">
            <OrderDetailSummary
              order={order}
              itemsSubtotal={itemsSubtotal}
              deliveryFee={deliveryFee}
              currency={currency}
              onDownloadInvoice={handleDownloadInvoice}
              downloading={downloading}
            />
            <OrderShippingAddress address={order.address} />
          </div>
        </div>

        {/* Back to Orders */}
        <div className="mt-8">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c7c86] hover:text-[#096068] transition-colors group"
          >
            <FiArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to My Orders</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderDetails
