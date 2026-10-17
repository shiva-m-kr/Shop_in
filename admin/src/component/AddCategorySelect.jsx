import React from 'react'

function AddCategorySelect({ category, setCategory, subCategory, setSubCategory, price, setPrice }) {
  return (
    <div className='flex flex-col sm:flex-row gap-4 w-full'>
      <div className='flex-1'>
        <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2'>
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-700 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all cursor-pointer'
        >
          <option value='Men'>Men</option>
          <option value='Women'>Women</option>
          <option value='Kids'>Kids</option>
        </select>
      </div>

      <div className='flex-1'>
        <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2'>
          Sub Category
        </label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-700 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all cursor-pointer'
        >
          <option value='Topwear'>Topwear</option>
          <option value='Bottomwear'>Bottomwear</option>
          <option value='Winterwear'>Winterwear</option>
        </select>
      </div>

      <div className='flex-1'>
        <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2'>
          Price (₹)
        </label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type='number'
          placeholder='499'
          required
          className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all'
        />
      </div>
    </div>
  )
}

export default AddCategorySelect
