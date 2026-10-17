import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import ProductListItem from '../component/ProductListItem'

function Lists() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${serverUrl}product/list`)
      if (response.data && response.data.product) {
        setList(response.data.product)
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error fetching products')
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const response = await axios.post(`${serverUrl}product/remove`, { id }, { withCredentials: true })
      if (response.data) {
        alert(response.data.message || 'Product removed successfully')
        await fetchList()
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error removing product')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='min-h-screen w-full bg-[#f4f9f9] text-slate-800 flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col h-screen overflow-hidden ml-[18%]'>
        <Nav />
        <main className='p-4 md:p-8 w-full flex-1 overflow-y-auto mt-15'>
          <div className='max-w-6xl mx-auto'>
            <div className='mb-6'>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>All Products</h1>
              <p className='text-xs sm:text-sm text-slate-500 mt-1'>View, monitor, and manage products in your store ({list.length})</p>
            </div>

            {loading ? (
              <div className='flex justify-center items-center h-64'>
                <p className='text-sm font-medium text-slate-400 animate-pulse'>Loading products...</p>
              </div>
            ) : (
              <div className='bg-white border border-slate-200/80 p-5 md:p-6 rounded-2xl shadow-xs'>
                <div className='hidden md:grid grid-cols-[auto_3fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-2.5 border-b border-slate-200/80 text-slate-400 font-semibold text-xs uppercase tracking-wider mb-3'>
                  <p className='w-14'>Image</p>
                  <p>Product</p>
                  <p>Category</p>
                  <p>Price</p>
                  <p className='text-right'>Action</p>
                </div>

                <div className='flex flex-col gap-2.5'>
                  {list.length === 0 ? (
                    <p className='text-center text-slate-400 py-10 text-sm'>No products found.</p>
                  ) : (
                    list.map((item) => (
                      <ProductListItem key={item._id} item={item} onRemove={removeProduct} />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Lists