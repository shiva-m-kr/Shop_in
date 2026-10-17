import React from 'react'
import {
  FiStar,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheck,
  FiInfo
} from 'react-icons/fi'

function ProductInfo({
  product,
  currency,
  reviewsCount,
  onReviewsClick,
  originalPrice,
  discountPercent,
  availableSizes,
  selectedSize,
  setSelectedSize,
  setShowSizeGuide,
  quantity,
  setQuantity,
  handleAddToCart,
  addedToast
}) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a5faf7]">
            {product.category} Collection
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            In Stock
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {product.name}
        </h1>

        {/* Ratings and Reviews summary */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-800">4.8</span>
          <span className="text-slate-400 text-xs">•</span>
          <button
            onClick={onReviewsClick}
            className="text-xs text-[#0c7c86] font-semibold hover:underline cursor-pointer"
          >
            ({reviewsCount} customer reviews)
          </button>
        </div>
      </div>

      {/* Price section with discount */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#0c7c86]">
          {currency}{product.price}
        </span>
        <span className="text-lg text-slate-400 line-through font-medium">
          {currency}{originalPrice}
        </span>
        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          {discountPercent}% OFF
        </span>
      </div>

      {/* Short description */}
      <p className="text-sm text-slate-600 leading-relaxed">
        {product.description}
      </p>

      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Select Size: <span className="text-[#0c7c86] font-extrabold">{selectedSize}</span>
          </label>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-xs text-[#0c7c86] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FiInfo size={13} /> Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-12 h-11 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                selectedSize === size
                  ? 'bg-[#0c7c86] text-white border-2 border-[#0c7c86] shadow-sm scale-102'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#0c7c86] hover:bg-slate-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          {/* Quantity counter */}
          <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-base font-bold transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-bold text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-base font-bold transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-bold text-sm transition-all duration-300 shadow-md shadow-[#0c7c86]/20 flex items-center justify-center gap-2 cursor-pointer group active:scale-98"
          >
            <FiShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
            <span>Add to Bag</span>
          </button>
        </div>

        {/* Toast Feedback */}
        {addedToast && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 animate-fade-in shadow-xs">
            <FiCheck size={16} className="shrink-0 text-emerald-600" />
            <span>
              Added <strong>{quantity}x</strong> {product.name} ({selectedSize}) to your bag!
            </span>
          </div>
        )}
      </div>

      {/* Key Trust Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <FiShield className="text-[#0c7c86] shrink-0" size={16} />
          <span>100% Authentic</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <FiTruck className="text-[#0c7c86] shrink-0" size={16} />
          <span>Cash On Delivery</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <FiRefreshCw className="text-[#0c7c86] shrink-0" size={16} />
          <span>30-Day Returns</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
