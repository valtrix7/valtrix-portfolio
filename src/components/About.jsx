import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './About.css'

function About() {
  const [titleRef, titleVisible] = useScrollAnimation(0.2)
  const [contentRef, contentVisible] = useScrollAnimation(0.1)
  const [statsRef, statsVisible] = useScrollAnimation(0.1)

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-grid">
          <div
            ref={titleRef}
            className={`about-header anim-slide-right ${titleVisible ? 'visible' : ''}`}
          >
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              01 — About
            </div>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Who I am and what drives me</p>
          </div>

          <div
            ref={contentRef}
            className={`about-content anim-fade-up ${contentVisible ? 'visible' : ''}`}
          >
            <p className="about-text large">
              I'm Valtrix, a full stack developer building web applications
              and decentralized systems that push the boundary of what's possible.
            </p>
            <p className="about-text">
              I work across the full stack — from React and Node.js to Solidity
              and smart contract architectures. Clean code, solid architecture,
              and security-first thinking drive everything I build.
            </p>
            <p className="about-text">
              Outside of code, I explore Web3 protocols, contribute to open source,
              and design intuitive interfaces.
            </p>
          </div>
        </div>

        <div
          ref={statsRef}
          className={`stats-bento ${statsVisible ? 'visible' : ''}`}
        >
          {[
            { number: '2+', label: 'Years', sublabel: 'Experience' },
            { number: '25+', label: 'Projects', sublabel: 'Completed' },
            { number: '100%', label: 'Dedication', sublabel: '& Passion' }
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-shell card-tilt"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="stat-core glow-pulse">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-sublabel">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="focus-bento">
          <div className="focus-shell card-tilt">
            <div className="focus-core">
              <div className="focus-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/>
                </svg>
              </div>
              <div className="focus-content">
                <h4>Focus</h4>
                <p>Building clean, scalable web applications with solid architecture.</p>
              </div>
            </div>
          </div>
          <div className="focus-shell card-tilt">
            <div className="focus-core">
              <div className="focus-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
                </svg>
              </div>
              <div className="focus-content">
                <h4>Interests</h4>
                <div className="tags">
                  {['Full Stack', 'Web3', 'UI/UX', 'Open Source', 'System Design'].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
