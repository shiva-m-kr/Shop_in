import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import DashboardStatCard from '../component/DashboardStatCard'
import RecentOrdersTable from '../component/RecentOrdersTable'
import OrderStatusChart from '../component/OrderStatusChart'
import QuickAction from '../component/QuickAction'
import useDashboardData from '../utils/useDashboardData'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { FiPackage, FiShoppingBag, FiTruck, FiCheckCircle, FiArrowRight } from 'react-icons/fi'

function Home() {
  const navigate = useNavigate()
  const { products, orders, loading, totalRevenue, paidRevenue, ordersByStatus, recentOrders } =
    useDashboardData()

  return (
    <div className='min-h-screen w-full bg-[#f4f9f9] text-slate-800 flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col h-screen overflow-hidden ml-[18%]'>
        <Nav />
        <main className='p-4 md:p-8 w-full flex-1 overflow-y-auto mt-15'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>Dashboard</h1>
                <p className='text-xs sm:text-sm text-slate-500 mt-1'>Welcome back to your ShopIn admin console</p>
              </div>
            </div>

            {loading ? (
              <div className='flex justify-center items-center h-64'>
                <p className='text-sm font-medium text-slate-400 animate-pulse'>Loading dashboard data...</p>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                  <DashboardStatCard icon={FiShoppingBag} label='Total Products' value={products.length} color='text-sky-600' />
                  <DashboardStatCard icon={FiPackage} label='Total Orders' value={orders.length} color='text-indigo-600' />
                  <DashboardStatCard icon={FaIndianRupeeSign} label='Total Revenue' value={`₹${totalRevenue.toLocaleString('en-IN')}`} sub='All orders' color='text-emerald-600' />
                  <DashboardStatCard icon={FiCheckCircle} label='Paid Revenue' value={`₹${paidRevenue.toLocaleString('en-IN')}`} sub='Confirmed' color='text-[#0c7c86]' />
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
                  <DashboardStatCard icon={FiPackage} label='New Orders' value={ordersByStatus.placed} color='text-sky-600' />
                  <DashboardStatCard icon={FiTruck} label='Processing' value={ordersByStatus.processing} color='text-amber-600' />
                  <DashboardStatCard icon={FiTruck} label='Shipped' value={ordersByStatus.shipped} color='text-indigo-600' />
                  <DashboardStatCard icon={FiCheckCircle} label='Delivered' value={ordersByStatus.delivered} color='text-emerald-600' />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                  <div className='bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs'>
                    <h2 className='text-base font-bold text-slate-900 mb-4'>Order Status Distribution</h2>
                    <OrderStatusChart ordersByStatus={ordersByStatus} total={orders.length} />
                  </div>

                  <div className='bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between'>
                    <h2 className='text-base font-bold text-slate-900 mb-4'>Quick Actions</h2>
                    <div className='space-y-3 flex-1'>
                      <QuickAction label='Add New Product' onClick={() => navigate('/add')} />
                      <QuickAction label='View All Products' onClick={() => navigate('/lists')} />
                      <QuickAction label='Manage Orders' onClick={() => navigate('/orders')} />
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs mb-8'>
                  <div className='flex items-center justify-between mb-5'>
                    <div>
                      <h2 className='text-base font-bold text-slate-900'>Recent Orders</h2>
                      <p className='text-xs text-slate-500 mt-0.5'>Latest transactions processed in your store</p>
                    </div>
                    <button onClick={() => navigate('/orders')} className='text-xs font-semibold text-[#0c7c86] hover:text-[#09676f] flex items-center gap-1 cursor-pointer transition-colors'>
                      View all orders <FiArrowRight size={13} />
                    </button>
                  </div>
                  <RecentOrdersTable orders={recentOrders} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
