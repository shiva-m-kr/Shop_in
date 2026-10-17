import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { shopContext } from '../context/ShopConext'
import { AuthDataContext } from '../context/AuthContext'
import { UserDataContext } from '../context/UserContext'
import Footer from '../component/Footer'
import { processRazorpayPayment } from '../utils/processRazorpayPayment'
import OrderSuccessView from '../component/order/OrderSuccessView'
import DeliveryForm from '../component/order/DeliveryForm'
import OrderCartTotals from '../component/order/OrderCartTotals'
import PaymentMethodSelector from '../component/order/PaymentMethodSelector'

function PlaceOrder() {
  const { cartItem, products, delivery_fee, getCartSubtotal, clearCart } = useContext(shopContext)
  const { serverUrl } = useContext(AuthDataContext)
  const { userData } = useContext(UserDataContext)
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: userData?.email || '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: 'India',
    phone: ''
  })

  const subtotal = getCartSubtotal()
  const totalAmount = subtotal > 0 ? subtotal + delivery_fee : 0

  // Build items array matching order model & controller expectations
  const orderItems = []
  for (const itemId in cartItem) {
    const product = products.find(p => String(p._id) === String(itemId))
    if (!product) continue
    for (const size in cartItem[itemId]) {
      const qty = cartItem[itemId][size]
      if (qty > 0) {
        orderItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image1: product.image1,
          size,
          quantity: qty
        })
      }
    }
  }

  const onChangeHandler = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errorMessage) setErrorMessage('')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (orderItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add items to cart first.')
      return
    }

    if (paymentMethod === 'Stripe') {
      setErrorMessage('Stripe payment is not available at the moment. Please select Cash on Delivery or Razorpay.')
      return
    }

    const payload = {
      items: orderItems,
      address: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim() || userData?.email || '',
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zipcode: formData.zipcode.trim(),
        country: formData.country.trim(),
        phone: formData.phone.trim()
      },
      paymentMethod
    }

    if (paymentMethod === 'Razorpay') {
      await processRazorpayPayment({
        payload,
        serverUrl,
        formData,
        userData,
        setLoading,
        setErrorMessage,
        clearCart,
        setConfirmedOrder,
        setOrderSuccess
      })
      return
    }

    // CASH ON DELIVERY (COD) FLOW
    try {
      setLoading(true)
      const response = await axios.post(
        `${serverUrl}/api/order/placeorder`,
        payload,
        { withCredentials: true }
      )

      if (response.data.success || response.status === 201) {
        clearCart()
        setConfirmedOrder(response.data.order)
        setOrderSuccess(true)
      } else {
        setErrorMessage(response.data.message || 'Failed to place order')
      }
    } catch (error) {
      console.error('Order placement error:', error)
      setErrorMessage(
        error.response?.data?.message ||
        error.message ||
        'Failed to place order. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (orderSuccess) {
    return (
      <OrderSuccessView
        confirmedOrder={confirmedOrder}
        totalAmount={totalAmount}
        paymentMethod={paymentMethod}
        formData={formData}
        navigate={navigate}
      />
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f9f9] text-slate-800 pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: DELIVERY INFORMATION */}
          <DeliveryForm formData={formData} onChangeHandler={onChangeHandler} />

          {/* RIGHT: CART TOTALS & PAYMENT METHOD */}
          <div className="space-y-8">
            <OrderCartTotals subtotal={subtotal} delivery_fee={delivery_fee} totalAmount={totalAmount} />
            <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || orderItems.length === 0}
              className="w-full py-3.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md shadow-[#0c7c86]/25 cursor-pointer active:scale-[0.99]"
            >
              {loading ? 'PROCESSING...' : `PLACE ORDER (₹${totalAmount})`}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default PlaceOrder
