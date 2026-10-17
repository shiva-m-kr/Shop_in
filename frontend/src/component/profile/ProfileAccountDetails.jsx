import React from 'react'
import {
  FiEdit3,
  FiCheck,
  FiX,
  FiCheckCircle,
  FiCopy
} from 'react-icons/fi'

function ProfileAccountDetails({
  isEditing,
  setIsEditing,
  name,
  setName,
  loading,
  handleUpdateName,
  userData,
  handleCopyId,
  copied
}) {
  return (
    <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 mb-8'>
      <div className='flex items-center justify-between pb-5 border-b border-slate-100'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Account Details</h3>
          <p className='text-xs text-slate-500 mt-0.5'>Update your public name and view account identifiers</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              setName(userData?.name || '')
              setIsEditing(true)
            }}
            className='flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#0c7c86] bg-[#0c7c86]/10 hover:bg-[#0c7c86]/20 rounded-full transition-colors cursor-pointer'
          >
            <FiEdit3 size={13} /> Edit Name
          </button>
        )}
      </div>

      <div className='divide-y divide-slate-100 mt-4'>
        {/* Full Name */}
        <div className='py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div className='sm:w-1/3'>
            <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Full Name</p>
          </div>
          <div className='flex-1'>
            {isEditing ? (
              <form onSubmit={handleUpdateName} className='flex items-center gap-2 max-w-sm'>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter your full name'
                  className='flex-1 px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20'
                  autoFocus
                />
                <button
                  type='submit'
                  disabled={loading}
                  className='px-3.5 py-1.5 bg-[#0c7c86] text-white text-xs font-semibold rounded-lg hover:bg-[#09676f] transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50'
                >
                  <FiCheck size={13} /> {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer'
                  title='Cancel'
                >
                  <FiX size={15} />
                </button>
              </form>
            ) : (
              <p className='text-sm font-semibold text-slate-900'>{userData?.name}</p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className='py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div className='sm:w-1/3'>
            <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Email Address</p>
          </div>
          <div className='flex-1 flex items-center gap-2'>
            <p className='text-sm font-medium text-slate-800'>{userData?.email}</p>
            <span className='inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50'>
              <FiCheckCircle size={11} /> Primary
            </span>
          </div>
        </div>

        {/* Account ID */}
        {userData?._id && (
          <div className='py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            <div className='sm:w-1/3'>
              <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>User ID</p>
            </div>
            <div className='flex-1 flex items-center gap-2'>
              <code className='text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200'>
                {userData._id}
              </code>
              <button
                onClick={handleCopyId}
                className='text-slate-400 hover:text-[#0c7c86] p-1.5 rounded transition-colors cursor-pointer'
                title='Copy User ID'
              >
                {copied ? <FiCheck size={14} className='text-emerald-600' /> : <FiCopy size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileAccountDetails
