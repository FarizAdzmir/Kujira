import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

interface LoadingScreenProps {
  onLoadComplete: (images: HTMLImageElement[]) => void
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const hasStarted = useRef(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const frameCount = 151
    let loadedCount = 0
    const images: HTMLImageElement[] = []

    for (let i = 0; i <= 150; i++) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      const frameNum = String(i).padStart(3, "0")

      const onComplete = () => {
        loadedCount++
        const currentProgress = Math.round((loadedCount / frameCount) * 100)
        setProgress(currentProgress)

        if (loadedCount === frameCount) {
          setTimeout(() => {
            setDone(true)
            setTimeout(() => onLoadComplete(images), 900)
          }, 400)
        }
      }

      img.onload = onComplete
      img.onerror = onComplete
      img.src = `/images/frames/frame_${frameNum}.jpg`
      images.push(img)
    }
  }, [onLoadComplete])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      {/* Kanji logo */}
      <motion.div
        className="loader__logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        鯨
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="loader__text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Loading Experience
      </motion.div>

      {/* Progress bar */}
      <div className="loader__progress">
        <motion.div
          className="loader__progress-bar"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Count */}
      <motion.div
        className="loader__count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {progress}%
      </motion.div>
    </motion.div>
  )
}
