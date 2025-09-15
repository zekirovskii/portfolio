import { useState, useEffect } from 'react'

const Typewriter = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex(0)
      setDisplayText('')
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default Typewriter
