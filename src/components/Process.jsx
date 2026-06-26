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
    title: 'Build',
    description: 'Ship clean, modular code across the full stack. Every feature is tested, every edge case handled, every performance bottleneck eliminated.',
    tags: ['Code', 'Test', 'Optimize'],
  },
  {
    number: '03',
    title: 'Launch',
    description: 'Deploy with confidence to production. Set up CI/CD pipelines, configure monitoring, and ensure everything runs smoothly at scale.',
    tags: ['Deploy', 'CI/CD', 'Monitoring'],
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

        {/* Steps */}
        <div className="process-steps">

          {/* Connecting arc */}
          <div className="process-arc">
            <svg className="process-arc-svg" viewBox="0 0 100 300" preserveAspectRatio="none">
              <path
                d="M 50 0 C 50 50, 50 50, 50 100 S 50 150, 50 200 S 50 250, 50 300"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={setRef(i)}
              className={`process-block anim-fade-up ${stepsVisible.has(i) ? 'visible' : ''} ${i % 2 === 0 ? 'align-left' : 'align-right'}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Watermark number */}
              <span className="process-watermark">{step.number}</span>

              {/* Content card */}
              <div className="process-card">
                <div className="process-card-top">
                  <span className="process-card-num">{step.number}</span>
                  <div className="process-card-line"></div>
                  <h3 className="process-card-title">{step.title}</h3>
                </div>
                <p className="process-card-desc">{step.description}</p>
                <div className="process-card-tags">
                  {step.tags.map((tag, j) => (
                    <span
                      key={tag}
                      className="process-card-tag"
                      style={{ transitionDelay: `${i * 0.15 + j * 0.05 + 0.3}s` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step dot */}
              <div className="process-step-dot">
                <span className="process-step-dot-ring"></span>
                <span className="process-step-dot-core"></span>
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
