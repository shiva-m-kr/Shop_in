import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { AuthDataContext } from '../context/AuthContext'
import { shopContext } from '../context/ShopConext'
import Title from '../component/Title'
import Footer from '../component/Footer'
import ProfileHero from '../component/profile/ProfileHero'
import ProfileShortcuts from '../component/profile/ProfileShortcuts'
import ProfileAccountDetails from '../component/profile/ProfileAccountDetails'
import {
  FiLogOut,
  FiX,
  FiCheckCircle
} from 'react-icons/fi'

function Profile() {
  const { userData, setUserData, logout } = useContext(UserDataContext)
  const { serverUrl } = useContext(AuthDataContext)
  const { getCartCount } = useContext(shopContext)
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userData?.name || '')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' })

  const handleUpdateName = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setStatusMsg({ type: 'error', text: 'Name cannot be empty' })
      return
    }

    try {
      setLoading(true)
      setStatusMsg({ type: '', text: '' })
      const res = await axios.put(
        `${serverUrl}/api/user/updateprofile`,
        { name: name.trim() },
        { withCredentials: true }
      )

      if (res.data.success && res.data.user) {
        setUserData(res.data.user)
        setIsEditing(false)
        setStatusMsg({ type: 'success', text: 'Profile updated successfully!' })
        setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000)
      }
    } catch (err) {
      console.error('Update profile error:', err)
      setStatusMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyId = () => {
    if (userData?._id) {
      navigator.clipboard.writeText(userData._id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const joinedDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Member'

  return (
    <div className='min-h-screen bg-[#f4f9f9] text-slate-800 flex flex-col justify-between pt-6 sm:pt-10'>
      <div className='max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-16'>
        {/* Title */}
        <div className='mb-8 text-center'>
          <Title text1='MY ' text2='PROFILE' />
          <p className='text-slate-500 text-sm mt-2 max-w-md mx-auto'>
            Manage your personal information, account security, and active shopping details.
          </p>
        </div>

        {/* Feedback Alert */}
        {statusMsg.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all shadow-xs ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <FiCheckCircle className='text-emerald-600 text-lg shrink-0' />
            ) : (
              <FiX className='text-rose-600 text-lg shrink-0' />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Profile Card Hero */}
        <ProfileHero userData={userData} joinedDate={joinedDate} />

        {/* Quick Links & Shortcuts */}
        <ProfileShortcuts navigate={navigate} getCartCount={getCartCount} />

        {/* Account Details & Settings Section */}
        <ProfileAccountDetails
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          name={name}
          setName={setName}
          loading={loading}
          handleUpdateName={handleUpdateName}
          userData={userData}
          handleCopyId={handleCopyId}
          copied={copied}
        />

        {/* Danger / Logout Zone */}
        <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div>
            <h4 className='text-base font-bold text-slate-900'>Account Session</h4>
            <p className='text-xs text-slate-500 mt-0.5'>Ready to sign out? You will be returned to the login screen.</p>
          </div>
          <button
            onClick={handleLogout}
            className='flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 rounded-xl font-semibold text-sm transition-colors border border-rose-200/60 cursor-pointer w-full sm:w-auto'
          >
            <FiLogOut size={16} /> Sign Out of Account
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
