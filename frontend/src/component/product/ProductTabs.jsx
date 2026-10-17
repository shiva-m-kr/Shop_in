import React from 'react'
import ProductReviews from './ProductReviews'

function ProductTabs({
  product,
  availableSizes,
  activeTab,
  setActiveTab,
  reviews,
  showReviewForm,
  setShowReviewForm,
  reviewSubmitted,
  newReview,
  setNewReview,
  handleAddReview
}) {
  return (
    <div id="product-tabs-section" className="mt-20">
      {/* Tab buttons */}
      <div className="flex border-b border-slate-200 gap-8">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-4 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
            activeTab === 'description'
              ? 'text-[#0c7c86]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Description & Details
          {activeTab === 'description' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0c7c86]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 text-sm sm:text-base font-bold transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'text-[#0c7c86]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Customer Reviews ({reviews.length})
          {activeTab === 'reviews' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0c7c86]" />
          )}
        </button>
      </div>

      {/* Tab 1: Description Content */}
      {activeTab === 'description' && (
        <div className="py-8 space-y-8 animate-fade-in">
          <div className="max-w-4xl text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Elevate your everyday wardrobe with the <strong className="text-white">{product.name}</strong>. Designed with a perfect balance of contemporary aesthetics and functional comfort, this piece is crafted from premium grade materials to guarantee superior drape, breathability, and lasting durability.
            </p>
            <p>
              Whether styled casually for weekend outings or dressed up for evening gatherings, its versatile silhouette effortlessly adapts to your lifestyle. Each seam is reinforced with precision stitching, ensuring that the silhouette maintains its structure wash after wash.
            </p>
          </div>

          {/* Specifications Table */}
          <div className="max-w-2xl rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/70">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Product Specifications
              </h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-2 p-3.5">
                <span className="text-slate-500">Category</span>
                <span className="text-slate-900 font-semibold">{product.category}</span>
              </div>
              <div className="grid grid-cols-2 p-3.5">
                <span className="text-slate-500">Sub-Category</span>
                <span className="text-slate-900 font-semibold">{product.subCategory}</span>
              </div>
              <div className="grid grid-cols-2 p-3.5">
                <span className="text-slate-500">Available Sizes</span>
                <span className="text-slate-900 font-semibold">{availableSizes.join(', ')}</span>
              </div>
              <div className="grid grid-cols-2 p-3.5">
                <span className="text-slate-500">Material & Fabric</span>
                <span className="text-slate-900 font-semibold">100% Premium Combed Cotton / Performance Blend</span>
              </div>
              <div className="grid grid-cols-2 p-3.5">
                <span className="text-slate-500">Care Instructions</span>
                <span className="text-slate-900 font-semibold">Machine wash cold with like colors, tumble dry low</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Reviews Content */}
      {activeTab === 'reviews' && (
        <ProductReviews
          reviews={reviews}
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
          reviewSubmitted={reviewSubmitted}
          newReview={newReview}
          setNewReview={setNewReview}
          handleAddReview={handleAddReview}
        />
      )}
    </div>
  )
}

export default ProductTabs
