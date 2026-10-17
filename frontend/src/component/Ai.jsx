import React, { useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopContext } from '../context/ShopConext'
import useVoiceRecognition from '../utils/useVoiceRecognition'
import { parseVoiceCommand, executeVoiceCommand } from '../utils/voiceCommands'
import { playOpenSound, playCloseSound } from '../utils/aiSound'
import VoiceFeedback from './VoiceFeedback'
import ai from '../assets/ai.png'

function Ai() {
  const navigate = useNavigate()
  const { setSearch } = useContext(shopContext)
  const [feedback, setFeedback] = useState(null)

  const handleResult = useCallback((transcript) => {
    const command = parseVoiceCommand(transcript)
    const message = executeVoiceCommand(command, navigate, setSearch)
    setFeedback(message)
  }, [navigate, setSearch])

  const { isListening, error, startListening, stopListening, clearError, isSupported } =
    useVoiceRecognition(handleResult)

  const handleClick = () => {
    if (!isSupported) {
      setFeedback('Speech recognition is not supported in this browser.')
      return
    }
    if (isListening) {
      playCloseSound()
      stopListening()
      clearError()
      setFeedback(null)
    } else {
      playOpenSound()
      clearError()
      setFeedback(null)
      startListening()
    }
  }

  const dismissFeedback = useCallback(() => {
    stopListening()
    clearError()
    setFeedback(null)
  }, [stopListening, clearError])

  return (
    <>
      {/* Floating AI button */}
      <button
        onClick={handleClick}
        className={`
          fixed left-[2%] z-[9999] cursor-pointer
          lg:bottom-5 md:bottom-10 bottom-20
          w-[68px] h-[68px] rounded-full
          bg-white shadow-lg shadow-[#0c7c86]/20
          border-2 transition-all duration-300 p-1
          hover:scale-110 hover:shadow-xl hover:shadow-[#0c7c86]/30
          active:scale-95
          ${isListening
            ? 'border-[#0c7c86] ring-4 ring-[#0c7c86]/30 animate-pulse'
            : 'border-slate-200 hover:border-[#0c7c86]/50'}
        `}
        title='Voice Assistant'
        aria-label='Voice Assistant'
      >
        <img
          src={ai}
          alt='AI Assistant'
          className='w-full h-full object-contain rounded-full'
        />
      </button>

      {/* Feedback overlay */}
      <VoiceFeedback
        isListening={isListening}
        feedback={feedback}
        error={error}
        onStop={stopListening}
        onDismiss={dismissFeedback}
      />
    </>
  )
}

export default Ai
