import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import AnimatedTitle from './AnimatedTitle'
import './Process.css'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Deep-dive into requirements, map system architecture, and define the technical blueprint before a single line of code is written.',
    tags: ['Research', 'Architecture', 'Planning'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Build interactive prototypes and design scalable system schemas — from database models to API contracts and component systems.',
    tags: ['Prototype', 'Schema', 'UI System'],
  },
  {
    number: '03',
    title: 'Build',
    description: 'Ship clean, modular code across the full stack. Every feature is tested, every edge case handled, every performance bottleneck eliminated.',
    tags: ['Code', 'Test', 'Optimize'],
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy with confidence to production. Set up CI/CD pipelines, configure monitoring, and ensure everything runs smoothly at scale.',
    tags: ['Deploy', 'CI/CD', 'Monitoring'],
  },
  {
    number: '05',
    title: 'Support',
    description: 'Post-launch iteration based on real user data. Fix bugs, ship improvements, and evolve the product as requirements grow.',
    tags: ['Iterate', 'Optimize', 'Scale'],
  },
]

function Process() {
  const [titleRef, titleVisible] = useScrollAnimation(0.2)
  const [setRef, stepsVisible] = useStaggerAnimation(steps.length, 0.15)

  return (
    <section className="process" id="process">
      <div className="process-container">

        {/* Header */}
        <div
          ref={titleRef}
          className={`process-header anim-fade-up ${titleVisible ? 'visible' : ''}`}
        >
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            02 — Process
          </div>
          <AnimatedTitle line1="How I" line2="WORK" delay={0.1} />
          <p className="process-subtitle">
            A systematic approach to building software — from first principles to production-ready systems.
          </p>
        </div>

        {/* Editorial Timeline */}
        <div className="process-timeline">

          {/* Scanning light */}
          <div className="timeline-track">
            <div className="timeline-scan"></div>
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={setRef(i)}
              className={`process-row anim-fade-up ${stepsVisible.has(i) ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Left — Big Number */}
              <div className="process-num-col">
                <span className="process-big-num">{step.number}</span>
                <div className="process-num-dot">
                  <span className="process-num-dot-inner"></span>
                </div>
              </div>

              {/* Right — Content */}
              <div className="process-content-col">
                <div className="process-content-head">
                  <h3 className="process-step-title">{step.title}</h3>
                  <div className="process-step-tags">
                    {step.tags.map((tag) => (
                      <span key={tag} className="process-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="process-step-desc">{step.description}</p>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className={`process-cta anim-fade-up ${stepsVisible.has(steps.length - 1) ? 'visible' : ''}`}>
          <div className="process-cta-line"></div>
          <p className="process-cta-text">Ready to start your project?</p>
          <div className="process-cta-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Process
