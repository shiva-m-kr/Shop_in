import openMp3 from '../assets/open.mp3'
import closeMp3 from '../assets/close.mp3'

let currentAudio = null

const play = (src) => {
  try {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
    currentAudio = new Audio(src)
    currentAudio.play().catch(() => {})
  } catch {
    // Gracefully handle any browser audio playback restrictions
  }
}

export const playOpenSound = () => play(openMp3)
export const playCloseSound = () => play(closeMp3)
