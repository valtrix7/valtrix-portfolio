import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

function PageTransition({ children }) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [phase, setPhase] = useState('idle')
  const isInitial = useRef(true)

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false
      return
    }

    // Start transition out
    setPhase('out')

    const t1 = setTimeout(() => {
      setDisplayChildren(children)
      setPhase('name')
    }, 400)

    const t2 = setTimeout(() => {
      setPhase('in')
    }, 900)

    const t3 = setTimeout(() => {
      setPhase('idle')
    }, 1400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [location.pathname])

  // Also update children when phase is idle
  useEffect(() => {
    if (phase === 'idle') {
      setDisplayChildren(children)
    }
  }, [children, phase])

  return (
    <>
      {/* Name flash overlay */}
      <div className={`transition-overlay ${phase === 'name' ? 'visible' : ''}`}>
        <span className="transition-name">VALTRIX</span>
      </div>

      {/* Page content */}
      <div className={`page-content ${phase === 'out' ? 'hidden' : ''} ${phase === 'in' ? 'show' : ''}`}>
        {displayChildren}
      </div>
    </>
  )
}

export default PageTransition
