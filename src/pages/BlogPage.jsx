import { useEffect, useState } from 'react'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import './BlogPage.css'

const posts = [
  {
    id: 1,
    title: 'Building Gas-Efficient Smart Contracts',
    excerpt: 'Techniques I use to minimize gas costs in Solidity — from storage patterns to assembly optimizations.',
    date: '2024',
    category: 'Web3',
    readTime: '8 min'
  },
  {
    id: 2,
    title: 'Real-Time Data with WebSockets',
    excerpt: 'How I built a real-time analytics dashboard that handles 10k+ data points per second without breaking a sweat.',
    date: '2024',
    category: 'Full Stack',
    readTime: '6 min'
  },
  {
    id: 3,
    title: 'The Architecture Behind DeFi Protocols',
    excerpt: 'A deep dive into how I structure DeFi projects — from contract design to frontend integration.',
    date: '2023',
    category: 'Web3',
    readTime: '10 min'
  },
  {
    id: 4,
    title: 'Why TypeScript Changed How I Code',
    excerpt: 'How TypeScript improved my code quality, caught bugs before production, and made me a better developer.',
    date: '2023',
    category: 'Full Stack',
    readTime: '5 min'
  },
  {
    id: 5,
    title: 'Deploying Smart Contracts the Right Way',
    excerpt: 'My workflow for testing, auditing, and deploying Solidity contracts to mainnet with confidence.',
    date: '2023',
    category: 'Web3',
    readTime: '7 min'
  },
  {
    id: 6,
    title: 'Building APIs That Scale',
    excerpt: 'Lessons learned from building REST APIs that handle millions of requests — rate limiting, caching, and more.',
    date: '2023',
    category: 'Backend',
    readTime: '6 min'
  }
]

const blogFilters = ['All', 'Web3', 'Full Stack', 'Backend']

function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [titleRef, titleVisible] = useScrollAnimation(0.2)
  const [setRef, visibleItems] = useStaggerAnimation(6, 0.1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredPosts = activeFilter === 'All'
    ? posts
    : posts.filter(p => p.category === activeFilter)

  return (
    <section className="blog-page">
      <div className="blog-page-container">
        <div
          ref={titleRef}
          className={`blog-page-header anim-slide-right ${titleVisible ? 'visible' : ''}`}
        >
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            Blog
          </div>
          <h1 className="page-title">
            <span className={`reveal-mask ${titleVisible ? 'visible' : ''}`}>
              <span className="reveal-line">Writing</span>
            </span>
          </h1>
          <p className="page-subtitle">Thoughts on code, Web3, and building things</p>
        </div>

        <div className="blog-filters">
          {blogFilters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="blog-page-grid">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              ref={setRef(index)}
              className={`blog-post-shell card-tilt anim-blur-in ${visibleItems.has(index) ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <article className="blog-post-core">
                <div className="blog-post-top">
                  <span className="blog-post-category">{post.category}</span>
                  <span className="blog-post-date">{post.date}</span>
                </div>
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <div className="blog-post-footer">
                  <span className="blog-post-read">{post.readTime}</span>
                  <div className="blog-post-link">
                    <span>Read</span>
                    <span className="project-link-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPage
