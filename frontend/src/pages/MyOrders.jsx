import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthDataContext } from '../context/AuthContext'
import { shopContext } from '../context/ShopConext'
import Title from '../component/Title'
import Footer from '../component/Footer'
import OrderCard from '../component/OrderCard'
import { FiPackage, FiArrowRight } from 'react-icons/fi'

function MyOrders() {
  const { serverUrl } = useContext(AuthDataContext)
  const { currency } = useContext(shopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(
        `${serverUrl}/api/order/userorders`,
        { withCredentials: true }
      )
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (err) {
      console.error('Fetch orders error:', err)
      setError(
        err.response?.data?.message ||
        'Failed to load orders. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Empty state
  if (!loading && orders.length === 0 && !error) {
    return (
      <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
              <FiPackage size={48} className="text-slate-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            No orders yet
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#0c7c86]/25 group"
          >
            <span>Browse Collections</span>
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Page Header */}
        <div className="mb-8">
          <Title text1="MY " text2="ORDERS" />
          <p className="text-slate-500 text-sm mt-2">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchOrders}
              className="text-xs font-semibold text-red-600 hover:text-red-700 underline cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#0c7c86] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-500 text-sm">Loading your orders...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} currency={currency} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MyOrders
