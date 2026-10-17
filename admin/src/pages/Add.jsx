import React, { useState, useContext } from 'react'
import axios from 'axios'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import AddImageUpload from '../component/AddImageUpload'
import AddCategorySelect from '../component/AddCategorySelect'
import { authDataContext } from '../context/AuthContext'

function Add() {
  const [images, setImages] = useState({ image1: false, image2: false, image3: false, image4: false })
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Men', subCategory: 'Topwear' })
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(i => i !== size) : [...prev, size])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('category', form.category)
      formData.append('subCategory', form.subCategory)
      formData.append('bestSeller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      ;[1, 2, 3, 4].forEach(i => images[`image${i}`] && formData.append(`image${i}`, images[`image${i}`]))

      const response = await axios.post(`${serverUrl}product/addproduct`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response.data) {
        setForm({ name: '', description: '', price: '', category: 'Men', subCategory: 'Topwear' })
        setSizes([])
        setImages({ image1: false, image2: false, image3: false, image4: false })
        alert(response.data.message || 'Product added successfully')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add product')
    }
  }

  return (
    <div className='min-h-screen w-full bg-[#f4f9f9] text-slate-800 flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col h-screen overflow-hidden ml-[18%]'>
        <Nav />
        <main className='p-4 md:p-8 w-full flex-1 overflow-y-auto mt-15'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6'>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight'>Add New Product</h1>
              <p className='text-xs sm:text-sm text-slate-500 mt-1'>Create and publish products to your store catalog</p>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-xs'>
              <AddImageUpload images={images} setImages={setImages} />

              <div>
                <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2'>Product Name</label>
                <input onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} value={form.name} type='text' placeholder='e.g. Classic Cotton T-Shirt' required className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all' />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2'>Product Description</label>
                <textarea onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} value={form.description} placeholder='Write a detailed description...' required className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all min-h-[90px]' />
              </div>

              <AddCategorySelect category={form.category} setCategory={(v) => setForm(p => ({ ...p, category: v }))} subCategory={form.subCategory} setSubCategory={(v) => setForm(p => ({ ...p, subCategory: v }))} price={form.price} setPrice={(v) => setForm(p => ({ ...p, price: v }))} />

              <div>
                <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5'>Product Sizes</label>
                <div className='flex flex-wrap gap-2.5'>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button type='button' key={size} onClick={() => toggleSize(size)} className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${sizes.includes(size) ? 'bg-[#0c7c86] text-white border-[#0c7c86] shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#0c7c86]/50'}`}>{size}</button>
                  ))}
                </div>
              </div>

              <div className='flex items-center gap-2.5 pt-1'>
                <input onChange={() => setBestseller(!bestseller)} checked={bestseller} type='checkbox' id='bestseller' className='w-4.5 h-4.5 rounded border-slate-300 text-[#0c7c86] focus:ring-[#0c7c86]/20 cursor-pointer' />
                <label htmlFor='bestseller' className='text-sm font-medium text-slate-700 cursor-pointer select-none'>Mark as Bestseller product</label>
              </div>

              <button type='submit' className='w-full sm:w-auto self-start mt-2 px-8 py-3 bg-[#0c7c86] hover:bg-[#09676f] text-white font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer active:scale-98'>Add Product</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Add