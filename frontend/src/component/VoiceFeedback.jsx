import React, { useEffect, useCallback } from 'react'
import { FiMic, FiX, FiAlertCircle } from 'react-icons/fi'
import { playCloseSound } from '../utils/aiSound'

/**
 * Full-screen overlay shown while listening or displaying feedback.
 * Closes immediately and smoothly when dismissed, and auto-dismisses feedback after a delay.
 */
function VoiceFeedback({ isListening, feedback, error, onStop, onDismiss }) {
  const isVisible = Boolean(isListening || feedback || error)

  const handleClose = useCallback(() => {
    if (onStop) onStop()
    if (onDismiss) onDismiss()
  }, [onStop, onDismiss])

  const handleManualClose = useCallback(() => {
    playCloseSound()
    handleClose()
  }, [handleClose])

  // Auto-dismiss feedback/error after 3 seconds
  useEffect(() => {
    if (!feedback && !error) return
    const timer = setTimeout(() => {
      handleClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [feedback, error, handleClose])

  // Escape key closes overlay
  useEffect(() => {
    if (!isVisible) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleManualClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, handleManualClose])

  if (!isVisible) return null

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleManualClose()
        }
      }}
      className='fixed inset-0 z-[9998] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in'
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-[90%] text-center'>
        {/* Close button */}
        <button
          onClick={handleManualClose}
          aria-label='Close Voice Assistant'
          className='absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors cursor-pointer'
        >
          <FiX size={16} />
        </button>

        {/* Listening state */}
        {isListening && (
          <>
            <div className='mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#0c7c86] to-[#12a1af] flex items-center justify-center mb-5 animate-pulse shadow-lg shadow-[#0c7c86]/30'>
              <FiMic size={32} className='text-white' />
            </div>
            <h3 className='text-lg font-bold text-slate-900 mb-1'>Listening...</h3>
            <p className='text-sm text-slate-500'>
              Try saying <span className='font-semibold text-[#0c7c86]'>"Open cart"</span> or{' '}
              <span className='font-semibold text-[#0c7c86]'>"Search for shoes"</span>
            </p>
          </>
        )}

        {/* Feedback message */}
        {!isListening && feedback && (
          <>
            <div className='mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4'>
              <span className='text-2xl'>✓</span>
            </div>
            <p className='text-base font-semibold text-slate-800'>{feedback}</p>
          </>
        )}

        {/* Error message */}
        {!isListening && error && (
          <>
            <div className='mx-auto w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4'>
              <FiAlertCircle size={28} className='text-rose-500' />
            </div>
            <p className='text-sm font-medium text-rose-600'>{error}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default VoiceFeedback
