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
