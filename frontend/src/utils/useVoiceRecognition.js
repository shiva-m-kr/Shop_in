import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * Custom hook encapsulating SpeechRecognition lifecycle.
 * Prevents duplicate instances, handles intentional abort cleanly, and cleans up resources on unmount.
 *
 * @param {Function} onResult - callback with transcript string
 * @returns {{ isListening, error, startListening, stopListening, clearError, isSupported }}
 */
export default function useVoiceRecognition(onResult) {
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)
  const onResultRef = useRef(onResult)

  // Keep latest onResult ref to avoid re-binding SpeechRecognition callbacks unnecessarily
  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  const SpeechRecognition =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null

  const isSupported = !!SpeechRecognition

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      const recognition = recognitionRef.current
      recognitionRef.current = null

      // Detach listeners before aborting so no 'aborted' error or trailing events update state
      recognition.onstart = null
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null

      try {
        recognition.abort()
      } catch {
        // Safe fallback if already inactive
      }
    }
    setIsListening(false)
    setError(null)
  }, [])

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.')
      return
    }

    // Stop any existing instance cleanly first
    if (recognitionRef.current) {
      stopListening()
    }

    setError(null)

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      recognitionRef.current = recognition

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (e) => {
        if (!e.results?.[0]?.[0]) return
        const transcript = e.results[0][0].transcript
        setIsListening(false)
        recognitionRef.current = null
        if (onResultRef.current) {
          onResultRef.current(transcript)
        }
      }

      recognition.onerror = (e) => {
        // Ignore aborted error from intentional cancellation
        if (e.error === 'aborted') {
          setIsListening(false)
          recognitionRef.current = null
          return
        }

        const msg =
          e.error === 'not-allowed'
            ? 'Microphone access denied. Please allow microphone permissions.'
            : e.error === 'no-speech'
            ? 'No speech detected. Please try again.'
            : `Recognition error: ${e.error}`
        setError(msg)
        setIsListening(false)
        recognitionRef.current = null
      }

      recognition.onend = () => {
        setIsListening(false)
        recognitionRef.current = null
      }

      recognition.start()
    } catch {
      setError('Failed to start recognition. Please try again.')
      setIsListening(false)
      recognitionRef.current = null
    }
  }, [SpeechRecognition, stopListening])

  // Lifecycle cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        const recognition = recognitionRef.current
        recognitionRef.current = null
        recognition.onstart = null
        recognition.onresult = null
        recognition.onerror = null
        recognition.onend = null
        try {
          recognition.abort()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  return { isListening, error, startListening, stopListening, clearError, isSupported }
}
