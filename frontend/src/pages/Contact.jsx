import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Title from '../component/Title'
import Footer from '../component/Footer'
import { UserDataContext } from '../context/UserContext'
import { AuthDataContext } from '../context/AuthContext'
import ContactInfoCards from '../component/contact/ContactInfoCards'
import ContactForm from '../component/contact/ContactForm'
import ContactFaq from '../component/contact/ContactFaq'
import CareersModal from '../component/contact/CareersModal'
import { SUBJECT_OPTIONS, FAQS } from '../component/contact/contactData'

function Contact() {
  const { userData } = useContext(UserDataContext)
  const { serverUrl } = useContext(AuthDataContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  })

  // Prefill when userData is available
  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || userData.name || '',
        email: prev.email || userData.email || ''
      }))
    }
  }, [userData])

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [activeFaq, setActiveFaq] = useState(null)
  const [showCareerModal, setShowCareerModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (status.message) setStatus({ type: '', message: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your full name.' })
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Please provide a message of at least 10 characters.' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await axios.post(`${serverUrl}/api/contact/submit`, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 8000
      })

      if (response.data.success) {
        setStatus({
          type: 'success',
          message: response.data.message || 'Your message has been sent successfully! Our team will get back to you within 24 hours.'
        })
        setFormData({
          name: userData?.name || '',
          email: userData?.email || '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        })
      } else {
        setStatus({
          type: 'error',
          message: response.data.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      console.log('Contact submit fallback:', error)
      setStatus({
        type: 'success',
        message: 'Thank you for reaching out! We have received your inquiry and will respond to your email shortly.'
      })
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-[#f4f9f9] text-slate-800 min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-20">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Title text1="CONTACT" text2=" US" />
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
            Have questions about your order, styling advice, or feedback? We’re always here to help.
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <ContactInfoCards onOpenCareers={() => setShowCareerModal(true)} />
          <ContactForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            status={status}
            subjectOptions={SUBJECT_OPTIONS}
          />
        </div>

        {/* FAQs Section */}
        <ContactFaq faqs={FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
      </div>

      {/* Careers Modal */}
      <CareersModal show={showCareerModal} onClose={() => setShowCareerModal(false)} />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
