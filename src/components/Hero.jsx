import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero({ mousePosition, scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const eclipseRef = useRef(null)
  const fullText = 'Full Stack Developer'

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let i = 0
    const typeTimer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, 80)
    return () => clearInterval(typeTimer)
  }, [isVisible])

  const handleMouseMove = useCallback((e) => {
    if (!eclipseRef.current) return
    const rect = eclipseRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlightPos({ x, y })
  }, [])

  // Generate random particles once
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
      opacity: Math.random() * 0.4 + 0.1,
    })), [])

  // Scroll shrink: scale down + fade as user scrolls
  const scrollScale = Math.max(0.3, 1 - scrollProgress * 0.7)
  const scrollOpacity = 1 - scrollProgress * 0.7
  const scrollBlur = Math.min(scrollProgress * 8, 6)

  const heroStyle = {
    opacity: 1 - scrollProgress * 0.7,
    transform: `translateY(${scrollProgress * -100}px)`
  }

  const eclipseStyle = {
    transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px) scale(${scrollScale})`,
    filter: `blur(${scrollBlur}px)`,
    opacity: scrollOpacity,
  }

  return (
    <section className="hero" style={heroStyle}>
      {/* Background mesh gradients */}
      <div className="hero-mesh-1"></div>
      <div className="hero-mesh-2"></div>
      <div className="hero-mesh-3"></div>

      {/* Floating particles */}
      <div className="hero-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Central Eclipse */}
      <div className="hero-eclipse-stage">
        <div
          ref={eclipseRef}
          className="hero-eclipse"
          style={eclipseStyle}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Orbital rings */}
          <div className="orbital-ring orbital-ring-1"></div>
          <div className="orbital-ring orbital-ring-2"></div>
          <div className="orbital-ring orbital-ring-3"></div>

          {/* Orbital dots */}
          <div className="orbital-dot orbital-dot-1"></div>
          <div className="orbital-dot orbital-dot-2"></div>
          <div className="orbital-dot orbital-dot-3"></div>

          {/* Glow layers */}
          <div className="e-glow-outer"></div>
          <div className="e-glow-mid"></div>
          <div className="e-glow-inner"></div>

          {/* Mouse spotlight */}
          <div
            className="e-spotlight"
            style={{
              '--mx': `${spotlightPos.x}%`,
              '--my': `${spotlightPos.y}%`,
            }}
          ></div>

          {/* Corona SVG */}
          <svg className="e-corona" viewBox="0 0 800 800">
            <defs>
              <radialGradient id="cGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0)" />
                <stop offset="42%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="48%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="55%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="65%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="80%" stopColor="rgba(255,255,255,0.03)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <filter id="cGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="cSoft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="16" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="400" cy="400" r="380" fill="url(#cGrad)" filter="url(#cSoft)" />
            <g className="corona-streams" filter="url(#cGlow)">
              <ellipse cx="400" cy="400" rx="320" ry="370" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="50" opacity="0.4" />
              <ellipse cx="400" cy="400" rx="370" ry="320" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="50" opacity="0.35" />
              <ellipse cx="400" cy="400" rx="290" ry="350" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="40" opacity="0.3" transform="rotate(25 400 400)" />
              <ellipse cx="400" cy="400" rx="350" ry="290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="40" opacity="0.25" transform="rotate(50 400 400)" />
              <ellipse cx="400" cy="400" rx="300" ry="340" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="35" opacity="0.2" transform="rotate(12 400 400)" />
              <ellipse cx="400" cy="400" rx="340" ry="300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="35" opacity="0.18" transform="rotate(38 400 400)" />
            </g>
            <circle cx="400" cy="400" r="155" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" opacity="0.5" filter="url(#cGlow)" />
          </svg>

          {/* Black disc */}
          <div className="e-disc"></div>

          {/* Bright border ring */}
          <div className="e-border-ring"></div>

          {/* Hover ring pulse */}
          <div className="e-hover-ring"></div>
          <div className="e-hover-ring-2"></div>

          {/* Edge rim light */}
          <div className="e-edge"></div>
        </div>

        {/* Hero text overlaid on eclipse */}
        <div className={`hero-center-text ${isVisible ? 'visible' : ''}`}>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>
            Available for projects
          </div>
          <h1 className="hero-name-center">
            <span className="hero-name-line">VALTRIX</span>
          </h1>
          <p className="hero-role-center">
            <span className="typed-text">{typedText}</span>
            <span className="typed-cursor">|</span>
          </p>
          <div className="hero-actions-center">
            <Link to="/projects" className="cta-primary">
              <span>Explore work</span>
              <span className="cta-icon-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
            <Link to="/contact" className="cta-ghost">
              Let's talk
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`hero-scroll ${isVisible ? 'visible' : ''}`}>
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}

export default Hero
