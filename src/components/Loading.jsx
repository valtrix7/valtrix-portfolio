import { useState, useEffect } from 'react'
import './Loading.css'

function Loading({ onComplete }) {
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('split'), 1800)
    const t2 = setTimeout(() => setPhase('reveal'), 2600)
    const t3 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  if (phase === 'done') return null

  const letters = 'VALTRIX'.split('')

  return (
    <div className={`loading-screen phase-${phase}`}>
      <div className="loading-grain"></div>

      {/* Center name reveal */}
      <div className="loading-name">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="loading-letter"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Horizontal split line */}
      <div className="loading-split-line"></div>

      {/* Progress bar */}
      <div className="loading-bottom">
        <div className="loading-progress-track">
          <div className="loading-progress-fill"></div>
        </div>
      </div>

      {/* Curtain halves */}
      <div className="loading-curtain">
        <div className="loading-curtain-left"></div>
        <div className="loading-curtain-right"></div>
      </div>
    </div>
  )
}

export default Loading
