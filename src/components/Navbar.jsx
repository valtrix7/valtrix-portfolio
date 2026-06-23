import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-pill">
          <Link to="/" className="logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">V</span>
            <span className="logo-bracket">]</span>
          </Link>

          <div className="nav-links-desktop">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="nav-link-num">0{i + 1}</span>
                <span className="nav-link-text">{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="menu-overlay-bg" onClick={(e) => e.stopPropagation()}>
          <div className="menu-content">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-link ${menuOpen ? 'visible' : ''}`}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${150 + i * 60}ms` : '0ms' }}
              >
                <span className="menu-link-num">0{i + 1}</span>
                <span className="menu-link-text">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
