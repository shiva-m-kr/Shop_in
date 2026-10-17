import React from 'react'
import { FiHeart } from 'react-icons/fi'

function ProductGallery({
  product,
  images,
  selectedImage,
  setSelectedImage,
  isWishlisted,
  setIsWishlisted
}) {
  return (
    <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnails Stack (Up to 4 images) */}
      <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 pb-2 sm:pb-0">
        {images.map((imgUrl, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(imgUrl)}
            className={`relative w-18 h-22 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 shrink-0 bg-white ${
              selectedImage === imgUrl
                ? 'border-[#0c7c86] shadow-md ring-2 ring-[#0c7c86]/20'
                : 'border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300'
            }`}
          >
            <img
              src={imgUrl}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Featured Image */}
      <div className="flex-1 relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white aspect-[3/4] sm:aspect-[4/5] max-h-[580px] shadow-xs group">
        <img
          src={selectedImage || product.image1}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tags overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          {product.bestSeller && (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold tracking-wide uppercase shadow-md">
              Best Seller
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-[#0c7c86] text-white text-[11px] font-bold tracking-wide uppercase shadow-xs">
            {product.category} • {product.subCategory}
          </span>
        </div>

        {/* Quick action buttons on image */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-xs ${
              isWishlisted
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-white/80 border-slate-200 text-slate-700 hover:text-rose-500'
            }`}
            aria-label="Wishlist"
          >
            <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
