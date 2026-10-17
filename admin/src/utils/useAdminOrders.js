import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

export function useAdminOrders() {
  const { serverUrl } = useContext(authDataContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)

  const fetchOrders = async () => {
    try {
      setLoading(true); setError('')
      const res = await axios.get(`${serverUrl}order/admin/all`, { withCredentials: true })
      if (res.data.success) setOrders(res.data.orders)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus, newPayment) => {
    try {
      setUpdatingId(orderId)
      const payload = { orderId, status: newStatus }
      if (typeof newPayment === 'boolean') payload.payment = newPayment
      const res = await axios.post(`${serverUrl}order/admin/status`, payload, { withCredentials: true })
      if (res.data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? res.data.order : o))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter
    if (!search.trim()) return matchStatus
    const q = search.toLowerCase()
    return matchStatus && (
      order._id.toLowerCase().includes(q) ||
      (order.address?.firstName || '').toLowerCase().includes(q) ||
      (order.address?.lastName || '').toLowerCase().includes(q) ||
      (order.address?.email || '').toLowerCase().includes(q) ||
      (order.address?.phone || '').includes(q)
    )
  })

  return {
    orders, loading, error, search, setSearch,
    statusFilter, setStatusFilter, updatingId,
    filteredOrders, fetchOrders, handleStatusUpdate
  }
}
