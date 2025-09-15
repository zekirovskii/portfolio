import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Hemen scroll yap
    window.scrollTo(0, 0)
    
    // Eğer smooth scroll istiyorsan
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      })
    }, 50)
  }, [pathname])

  return null
}

export default ScrollToTop
