import { useState, useEffect, useCallback } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const checkMobile = useCallback(() => {
    if (typeof window !== 'undefined') {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
    checkMobile()
    
    // Debounce resize events para melhor performance
    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [checkMobile])

  return { isMobile, isClient }
} 