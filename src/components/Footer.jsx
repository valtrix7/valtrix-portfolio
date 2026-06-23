import { Link } from 'react-router-dom'
import { useMagnetic } from '../hooks/useScrollAnimation'
import './Footer.css'

function Footer() {
  const logoRef = useMagnetic(0.2)

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <Link ref={logoRef} to="/" className="footer-logo">VALTRIX</Link>
          <span className="footer-divider"></span>
          <p className="footer-tagline">Full stack developer building scalable web applications.</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} Valtrix. All rights reserved.</p>
        <p className="built-with">Designed & Built with precision</p>
      </div>
    </footer>
  )
}

export default Footer
