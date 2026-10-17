import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'


export default function useDashboardData() {
  const { serverUrl } = useContext(authDataContext)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          axios.post(`${serverUrl}product/list`),
          axios.get(`${serverUrl}order/admin/all`, { withCredentials: true })
        ])
        setProducts(prodRes.data?.product || [])
        setOrders(orderRes.data?.success ? orderRes.data.orders : [])
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [serverUrl])

  // Derived stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0)
  const paidRevenue = orders.filter(o => o.payment).reduce((sum, o) => sum + (o.amount || 0), 0)

  const ordersByStatus = {
    placed: orders.filter(o => o.status === 'Order Placed').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
  }

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
    .slice(0, 5)

  return {
    products, orders, loading,
    totalRevenue, paidRevenue,
    ordersByStatus, recentOrders,
  }
}
