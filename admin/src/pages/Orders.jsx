import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import AdminOrderCard from '../component/AdminOrderCard'
import AdminOrderFilters from '../component/AdminOrderFilters'
import DashboardStatCard from '../component/DashboardStatCard'
import { useAdminOrders } from '../utils/useAdminOrders'
import { FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi'

const STATUSES = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled']

function Orders() {
  const {
    orders, loading, error, search, setSearch,
    statusFilter, setStatusFilter, updatingId,
    filteredOrders, fetchOrders, handleStatusUpdate
  } = useAdminOrders()

  return (
    <div className='min-h-screen w-full bg-[#f4f9f9] text-slate-800 flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col h-screen overflow-hidden ml-[18%]'>
        <Nav />
        <main className='p-4 md:p-8 w-full flex-1 overflow-y-auto mt-15'>
          <div className='max-w-6xl mx-auto'>
            <div className='mb-6'>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>Order Management</h1>
              <p className='text-xs sm:text-sm text-slate-500 mt-1'>Monitor and process incoming customer orders</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
              <DashboardStatCard icon={FiPackage} label='Total Orders' value={orders.length} color='text-sky-600' />
              <DashboardStatCard icon={FiPackage} label='New Placed' value={orders.filter(o => o.status === 'Order Placed').length} color='text-blue-600' />
              <DashboardStatCard icon={FiTruck} label='Processing' value={orders.filter(o => o.status === 'Processing').length} color='text-amber-600' />
              <DashboardStatCard icon={FiCheckCircle} label='Delivered' value={orders.filter(o => o.status === 'Delivered').length} color='text-emerald-600' />
            </div>

            <AdminOrderFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} statuses={STATUSES} totalFiltered={filteredOrders.length} />

            {error && <div className='mb-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex justify-between'><span>{error}</span><button onClick={fetchOrders} className='font-semibold underline cursor-pointer'>Retry</button></div>}

            {loading ? (
              <div className='flex justify-center items-center h-64'><p className='text-sm font-medium text-slate-400 animate-pulse'>Loading orders...</p></div>
            ) : filteredOrders.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-20 bg-white border border-slate-200/80 rounded-2xl p-8 text-center'>
                <FiPackage size={42} className='text-slate-300 mb-3' />
                <p className='text-base font-semibold text-slate-700'>No orders found</p>
                <p className='text-xs text-slate-400 mt-1'>{search || statusFilter !== 'All' ? 'Try adjusting your search or status filter' : 'Orders will appear here once placed by customers'}</p>
              </div>
            ) : (
              <div className='space-y-3.5'>
                {filteredOrders.map(order => (
                  <AdminOrderCard key={order._id} order={order} statuses={STATUSES} onStatusUpdate={handleStatusUpdate} isUpdating={updatingId === order._id} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Orders