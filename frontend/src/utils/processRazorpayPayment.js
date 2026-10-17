import axios from 'axios'
import { loadRazorpay } from './loadRazorpay'

export async function processRazorpayPayment({
  payload,
  serverUrl,
  formData,
  userData,
  setLoading,
  setErrorMessage,
  clearCart,
  setConfirmedOrder,
  setOrderSuccess
}) {
  try {
    setLoading(true)
    const isLoaded = await loadRazorpay()
    if (!isLoaded) {
      setErrorMessage('Unable to load Razorpay SDK. Please check your internet connection and try again.')
      setLoading(false)
      return
    }

    const initResponse = await axios.post(
      `${serverUrl}/api/order/razorpay`,
      payload,
      { withCredentials: true }
    )

    if (!initResponse.data.success) {
      setErrorMessage(initResponse.data.message || 'Failed to initialize Razorpay payment.')
      setLoading(false)
      return
    }

    const { order: pendingOrder, razorpayOrder, key_id } = initResponse.data
    const razorpayKey = key_id || import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.RAZORPAY_KEY_ID

    if (!razorpayKey) {
      setErrorMessage('Razorpay Key ID is not configured.')
      setLoading(false)
      return
    }

    const options = {
      key: razorpayKey,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency || 'INR',
      name: 'ShopIn',
      description: `Order #${pendingOrder._id.slice(-8).toUpperCase()}`,
      order_id: razorpayOrder.id,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim() || userData?.email || '',
        contact: formData.phone.trim()
      },
      theme: { color: '#0c7c86' },
      handler: async (response) => {
        try {
          setLoading(true)
          const verifyResponse = await axios.post(
            `${serverUrl}/api/order/verifyrazorpay`,
            {
              orderId: pendingOrder._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            },
            { withCredentials: true }
          )

          if (verifyResponse.data.success) {
            clearCart()
            setConfirmedOrder(verifyResponse.data.order)
            setOrderSuccess(true)
          } else {
            setErrorMessage(verifyResponse.data.message || 'Payment verification failed.')
          }
        } catch (verifyErr) {
          console.error('Payment verification error:', verifyErr)
          setErrorMessage(
            verifyErr.response?.data?.message ||
            'Payment verification failed. Please contact support.'
          )
        } finally {
          setLoading(false)
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false)
          setErrorMessage('Payment cancelled. Your cart has been saved so you can try again.')
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (failResponse) => {
      setLoading(false)
      setErrorMessage(failResponse.error?.description || 'Payment failed. Please try again.')
    })
    rzp.open()
  } catch (error) {
    console.error('Razorpay initialization error:', error)
    setErrorMessage(
      error.response?.data?.message ||
      error.message ||
      'Failed to start Razorpay payment. Please try again.'
    )
    setLoading(false)
  }
}
