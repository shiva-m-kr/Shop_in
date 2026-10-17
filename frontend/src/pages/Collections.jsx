import React, { useContext, useEffect, useState, useCallback } from 'react'
import { shopContext } from '../context/ShopConext'
import Card from '../component/Card'
import Title from '../component/Title'
import Footer from '../component/Footer'
import CollectionSidebar from '../component/collection/CollectionSidebar'
import ActiveFilterChips from '../component/collection/ActiveFilterChips'
import { SORT_OPTIONS } from '../component/collection/collectionData'
import { FiFilter, FiChevronDown } from 'react-icons/fi'

function Collections() {
  const { products, search, setSearch } = useContext(shopContext)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [sortBy, setSortBy] = useState('relevant')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [catOpen, setCatOpen] = useState(true)
  const [subCatOpen, setSubCatOpen] = useState(true)

  const toggleValue = (setter, value) =>
    setter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )

  const applyFilters = useCallback(() => {
    if (!products) return
    let result = [...products]

    if (search.trim())
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )

    if (selectedCategories.length > 0)
      result = result.filter(p => selectedCategories.includes(p.category))

    if (selectedSubCategories.length > 0)
      result = result.filter(p => selectedSubCategories.includes(p.subCategory))

    switch (sortBy) {
      case 'low-high':  result.sort((a, b) => a.price - b.price); break
      case 'high-low':  result.sort((a, b) => b.price - a.price); break
      case 'newest':    result.sort((a, b) => b.date - a.date);   break
      default: break
    }

    setFilteredProducts(result)
  }, [products, search, selectedCategories, selectedSubCategories, sortBy])

  useEffect(() => { applyFilters() }, [applyFilters])

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedSubCategories([])
    setSortBy('relevant')
    setSearch('')
  }

  const activeFilters = [...selectedCategories, ...selectedSubCategories]

  return (
    <div className='min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col justify-between'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 py-10 w-full'>

        {/* Page Header */}
        <div className='mb-8'>
          <Title text1='All' text2=' Collections' />
          <p className='text-slate-500 text-sm mt-2'>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>

          {/* Active filter chips */}
          <ActiveFilterChips
            search={search}
            setSearch={setSearch}
            activeFilters={activeFilters}
            setSelectedCategories={setSelectedCategories}
            setSelectedSubCategories={setSelectedSubCategories}
            clearAll={clearAll}
          />
        </div>

        <div className='flex flex-col md:flex-row gap-8'>
          {/* Sidebar */}
          <CollectionSidebar
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            catOpen={catOpen}
            setCatOpen={setCatOpen}
            subCatOpen={subCatOpen}
            setSubCatOpen={setSubCatOpen}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedSubCategories={selectedSubCategories}
            setSelectedSubCategories={setSelectedSubCategories}
            toggleValue={toggleValue}
          />

          {/* Main Content */}
          <div className='flex-1'>
            {/* Sort bar */}
            <div className='flex items-center justify-between mb-6 gap-4'>
              <p className='text-slate-600 text-sm hidden sm:block'>
                Showing <span className='text-slate-900 font-bold'>{filteredProducts.length}</span> results
              </p>
              <div className='relative ml-auto'>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className='appearance-none bg-white border border-slate-200 text-sm text-slate-700 font-medium rounded-xl px-4 pr-9 py-2 cursor-pointer shadow-xs focus:outline-none focus:border-[#0c7c86] hover:border-slate-300 transition-colors'
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className='bg-white text-slate-800'>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none' size={15} />
              </div>
            </div>

            {/* Product Grid */}
            {!products || products.length === 0 ? (
              <div className='flex items-center justify-center py-32'>
                <p className='text-slate-500 animate-pulse text-lg'>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-2xl border border-slate-200 shadow-xs'>
                <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center'>
                  <FiFilter size={26} className='text-slate-400' />
                </div>
                <p className='text-slate-600 text-base font-medium'>No products match your filters.</p>
                <button
                  onClick={clearAll}
                  className='px-5 py-2 rounded-xl bg-[#0c7c86] text-white text-sm font-semibold hover:bg-[#096068] transition-colors shadow-xs cursor-pointer'
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
                {filteredProducts.map((item, index) => (
                  <Card
                    key={item._id || index}
                    _id={item._id}
                    name={item.name}
                    image1={item.image1}
                    price={item.price}
                    category={item.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Collections