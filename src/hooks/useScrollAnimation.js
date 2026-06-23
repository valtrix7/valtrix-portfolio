import { useState, useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    const current = ref.current
    if (current) observer.observe(current)
    return () => { if (current) observer.unobserve(current) }
  }, [threshold])

  return [ref, isVisible]
}

export function useStaggerAnimation(count, threshold = 0.1) {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target)
            if (index !== -1) {
              setVisibleItems((prev) => new Set([...prev, index]))
            }
          }
        })
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    )

    refs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => refs.current.forEach((ref) => { if (ref) observer.unobserve(ref) })
  }, [count, threshold])

  const setRef = (index) => (el) => {
    refs.current[index] = el
  }

  return [setRef, visibleItems]
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distFromCenter = elementCenter - windowHeight / 2
      setOffset(distFromCenter * speed * -0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [ref, offset]
}

export function useMouseParallax(intensity = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity * 100
      const y = (e.clientY / window.innerHeight - 0.5) * intensity * 100
      setPosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return position
}

/* True if the user has requested reduced motion. Safe to call in render. */
function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* Touch / coarse-pointer devices — no cursor to track. */
function isFinePointer() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches
}

/**
 * useTilt — 3D cursor tilt for a card. Sets CSS custom properties so the
 * element can be styled with pure CSS:
 *   --rx / --ry  → rotateX / rotateY in degrees
 *   --mx / --my  → 0..100 cursor position (drives a glare / spotlight)
 * Pass the returned ref to the element you want to tilt.
 * No-ops on touch devices and when reduced-motion is requested.
 */
export function useTilt({ max = 10, scale = 1.02 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!isFinePointer() || prefersReducedMotion()) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width   // 0..1
      const py = (e.clientY - rect.top) / rect.height    // 0..1
      // Invert Y so moving the cursor up tilts the top toward you.
      el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }

    const handleEnter = () => {
      el.style.setProperty('--tilt-scale', String(scale))
      el.dataset.tiltActive = 'true'
    }

    const handleLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.dataset.tiltActive = 'false'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [max, scale])

  return ref
}

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * useCountUp — animate a number from 0 → target while `isActive` is true.
 * Returns the current value formatted to `decimals` places, with any
 * non-numeric prefix/suffix (e.g. "25+", "100%") preserved on completion.
 */
export function useCountUp(target, isActive, { duration = 1600, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isActive) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    let raf
    let start
    const step = (ts) => {
      if (start === undefined) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(target * easeOutExpo(progress))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, isActive, duration])

  return value.toFixed(decimals)
}

/**
 * useMagnetic — element drifts toward the cursor while hovered, then springs
 * back on leave. Returns a ref to attach to the element.
 * Disabled on touch devices and when reduced-motion is requested.
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!isFinePointer() || prefersReducedMotion()) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}
