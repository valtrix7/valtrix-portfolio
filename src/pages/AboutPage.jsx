import { useEffect } from 'react'
import { useScrollAnimation, useStaggerAnimation, useCountUp, useTilt } from '../hooks/useScrollAnimation'
import './AboutPage.css'

const timeline = [
  {
    year: '2024',
    title: 'Web3 & Smart Contracts',
    description: 'Diving deep into Solidity, DeFi protocols, and building decentralized applications with real-world utility.'
  },
  {
    year: '2023',
    title: 'Full Stack Specialization',
    description: 'Mastering the full stack — React, Node.js, databases, and cloud infrastructure. Shipping production apps.'
  },
  {
    year: '2022',
    title: 'Open Source & Community',
    description: 'Contributing to open source projects, building in public, and learning from the developer community.'
  },
  {
    year: '2021',
    title: 'First Steps in Development',
    description: 'Started coding, building small projects, and falling in love with the craft of software engineering.'
  }
]

const values = [
  {
    title: 'Clean Code',
    description: 'Code should be readable, maintainable, and elegant. If a human can\'t understand it, it\'s not done.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    title: 'Security First',
    description: 'Every line is a potential vulnerability. I write code with security as a first-class concern, not an afterthought.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    title: 'Performance',
    description: 'Every millisecond matters. I optimize for speed, efficiency, and resource usage — on-chain and off-chain.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    )
  },
  {
    title: 'User Experience',
    description: 'Technology should feel invisible. I build interfaces that are intuitive, fast, and delightful to use.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  }
]

function parseStat(value) {
  const match = String(value).match(/(\d+(?:\.\d+)?)/)
  if (!match) return { target: 0, suffix: '' }
  return {
    target: parseFloat(match[1]),
    suffix: String(value).slice(match[1].length),
  }
}

function BioStat({ stat, visible, index }) {
  const tiltRef = useTilt({ max: 10, scale: 1.03 })
  const { target, suffix } = parseStat(stat.number)
  const decimals = Number.isInteger(target) ? 0 : 1
  const current = useCountUp(target, visible, { duration: 1600, decimals })

  return (
    <div className="bio-stat-shell" style={{ transitionDelay: `${index * 0.1}s` }}>
      <div ref={tiltRef} className="bio-stat-core glow-pulse tilt-card spotlight-card">
        <span className="tilt-glare" aria-hidden="true"></span>
        <div className="stat-number">
          {current}{visible ? suffix : ''}
        </div>
        <div className="stat-label">{stat.label}</div>
        <div className="stat-sublabel">{stat.sublabel}</div>
      </div>
    </div>
  )
}

function AboutPage() {
  const [titleRef, titleVisible] = useScrollAnimation(0.2)
  const [contentRef, contentVisible] = useScrollAnimation(0.1)
  const [timelineRef, timelineVisible] = useScrollAnimation(0.1)
  const [valuesRef, valuesVisible] = useScrollAnimation(0.1)
  const [setValuesRef, visibleValues] = useStaggerAnimation(values.length, 0.1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const stats = [
    { number: '2+', label: 'Years', sublabel: 'Experience' },
    { number: '25+', label: 'Projects', sublabel: 'Shipped' },
    { number: '6+', label: 'Open Source', sublabel: 'Contributions' }
  ]

  return (
    <section className="about-page">
      <div className="about-page-container">
        {/* Header */}
        <div
          ref={titleRef}
          className={`about-page-header anim-slide-right ${titleVisible ? 'visible' : ''}`}
        >
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            About
          </div>
          <h1 className="page-title">
            <span className={`reveal-mask ${titleVisible ? 'visible' : ''}`}>
              <span className="reveal-line">About Me</span>
            </span>
          </h1>
          <p className="page-subtitle">The person behind the code</p>
        </div>

        {/* Bio */}
        <div
          ref={contentRef}
          className={`about-page-bio anim-fade-up ${contentVisible ? 'visible' : ''}`}
        >
          <div className="bio-text">
            <p className="bio-large">
              I'm Valtrix — a full stack developer who builds web applications
              and decentralized systems. I care about clean architecture,
              security, and creating things that actually work well.
            </p>
            <p className="bio-regular">
              My work spans the full stack: from React frontends and Node.js APIs
              to Solidity smart contracts and on-chain protocols. I've shipped
              production apps, contributed to open source, and built DeFi tools
              used by real people.
            </p>
            <p className="bio-regular">
              When I'm not coding, I'm exploring new protocols, experimenting
              with zero-knowledge proofs, or designing interfaces that make
              complex systems feel simple.
            </p>
          </div>

          <div className="bio-stats">
            {stats.map((stat, i) => (
              <BioStat key={i} stat={stat} index={i} visible={contentVisible} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className={`about-page-timeline anim-blur-in ${timelineVisible ? 'visible' : ''}`}
        >
          <h2 className="section-heading">Journey</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {i < timeline.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div
          ref={valuesRef}
          className={`about-page-values ${valuesVisible ? 'visible' : ''}`}
        >
          <h2 className="section-heading">What I Believe</h2>
          <div className="values-grid">
            {values.map((value, i) => (
              <div
                key={i}
                ref={setValuesRef(i)}
                className={`value-shell card-tilt anim-rotate-in ${visibleValues.has(i) ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="value-core">
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-desc">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
