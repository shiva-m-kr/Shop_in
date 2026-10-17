import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { shopContext } from '../context/ShopConext'
import RelatedProduct from '../component/RelatedProduct'
import Footer from '../component/Footer'
import ProductGallery from '../component/product/ProductGallery'
import ProductInfo from '../component/product/ProductInfo'
import ProductTabs from '../component/product/ProductTabs'
import SizeGuideModal from '../component/product/SizeGuideModal'
import { FiChevronRight } from 'react-icons/fi'

import { INITIAL_REVIEWS } from '../component/product/productConstants'

import ProductLoading from '../component/product/ProductLoading'

function ProductDetails({ category: propCategory, subCategory: propSubCategory, currentProductId: propId }) {
  const { productId: paramId } = useParams()
  const currentId = propId || paramId

  const { products, currency, addToCart } = useContext(shopContext)
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [addedToast, setAddedToast] = useState(false)

  // Reviews State
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)

  // New review form
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    title: '',
    comment: ''
  })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // Scroll to top & locate product
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (products && products.length > 0) {
      const found = products.find((item) => String(item._id) === String(currentId))
      if (found) {
        setProduct(found)
        setSelectedImage(found.image1 || '')
        if (found.sizes && found.sizes.length > 0) {
          setSelectedSize(found.sizes[0])
        } else {
          setSelectedSize('M')
        }
      }
    }
  }, [products, currentId])

  // Collect thumbnail images (filter out falsy/empty values)
  const images = product
    ? [product.image1, product.image2, product.image3, product.image4].filter(Boolean)
    : []

  // Calculate simulated original price and discount
  const originalPrice = product ? Math.round(product.price * 1.3) : 0
  const discountPercent = product ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product._id, selectedSize, quantity)
    setAddedToast(true)
    setTimeout(() => {
      setAddedToast(false)
    }, 3000)
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!newReview.name.trim() || !newReview.comment.trim()) return

    const created = {
      id: Date.now(),
      name: newReview.name,
      rating: Number(newReview.rating),
      date: 'Just now',
      title: newReview.title || 'Verified Purchase Feedback',
      comment: newReview.comment,
      helpful: 0,
      verified: true
    }

    setReviews([created, ...reviews])
    setNewReview({ name: '', rating: 5, title: '', comment: '' })
    setShowReviewForm(false)
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 4000)
  }

  if (!product) {
    return <ProductLoading />
  }

  const availableSizes = product.sizes && product.sizes.length > 0
    ? product.sizes
    : ['S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 pt-6 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-20">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-[#0c7c86] transition-colors">Home</Link>
          <FiChevronRight size={14} className="text-slate-400 shrink-0" />
          <Link to="/collection" className="hover:text-[#0c7c86] transition-colors">Collections</Link>
          <FiChevronRight size={14} className="text-slate-400 shrink-0" />
          <span className="text-slate-600">{product.category}</span>
          <FiChevronRight size={14} className="text-slate-400 shrink-0" />
          <span className="text-[#0c7c86] font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Display (Images & Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <ProductGallery
            product={product}
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isWishlisted={isWishlisted}
            setIsWishlisted={setIsWishlisted}
          />

          <ProductInfo
            product={product}
            currency={currency}
            reviewsCount={reviews.length + 124}
            onReviewsClick={() => {
              setActiveTab('reviews')
              const el = document.getElementById('product-tabs-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            originalPrice={originalPrice}
            discountPercent={discountPercent}
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setShowSizeGuide={setShowSizeGuide}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            addedToast={addedToast}
          />
        </div>

        {/* Tabbed Section: Description & Customer Reviews */}
        <ProductTabs
          product={product}
          availableSizes={availableSizes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          reviews={reviews}
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
          reviewSubmitted={reviewSubmitted}
          newReview={newReview}
          setNewReview={setNewReview}
          handleAddReview={handleAddReview}
        />

        {/* Related Products Component */}
        <RelatedProduct
          category={product.category}
          subCategory={product.subCategory}
          currentProductId={product._id}
        />
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        show={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <Footer />
    </div>
  )
}

export default ProductDetails
