import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="not-found">
      <div className="not-found-container">
        <div className="nf-glitch" data-text="404">404</div>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="nf-btn">
          <span>Back to Home</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default NotFound
