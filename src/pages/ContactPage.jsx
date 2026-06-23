import { useEffect, useState } from 'react'
import { useScrollAnimation, useMagnetic } from '../hooks/useScrollAnimation'
import './ContactPage.css'

function ContactPage() {
  const [titleRef, titleVisible] = useScrollAnimation(0.2)
  const [formRef, formVisible] = useScrollAnimation(0.1)
  const submitRef = useMagnetic(0.3)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-page-container">
        <div
          ref={titleRef}
          className={`contact-page-header anim-slide-right ${titleVisible ? 'visible' : ''}`}
        >
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            Contact
          </div>
          <h1 className="page-title">
            <span className={`reveal-mask ${titleVisible ? 'visible' : ''}`}>
              <span className="reveal-line">Get In Touch</span>
            </span>
          </h1>
          <p className="page-subtitle">Have a project in mind? Let's talk about it.</p>
        </div>

        <div
          ref={formRef}
          className={`contact-page-body anim-fade-up ${formVisible ? 'visible' : ''}`}
        >
          <div className="contact-page-form-wrap">
            <form className="contact-page-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-shell ${errors.name ? 'error' : ''}`}>
                  <div className="form-core">
                    <label className="form-label" htmlFor="cp-name">Name</label>
                    <input
                      id="cp-name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                </div>
                <div className={`form-shell ${errors.email ? 'error' : ''}`}>
                  <div className="form-core">
                    <label className="form-label" htmlFor="cp-email">Email</label>
                    <input
                      id="cp-email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
              </div>

              <div className={`form-shell ${errors.subject ? 'error' : ''}`}>
                <div className="form-core">
                  <label className="form-label" htmlFor="cp-subject">Subject</label>
                  <input
                    id="cp-subject"
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="Project inquiry, collaboration, etc."
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>
              </div>

              <div className={`form-shell ${errors.message ? 'error' : ''}`}>
                <div className="form-core">
                  <label className="form-label" htmlFor="cp-message">Message</label>
                  <textarea
                    id="cp-message"
                    name="message"
                    className="form-input form-textarea"
                    rows="6"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
              </div>

              <button ref={submitRef} type="submit" className="submit-btn">
                <span>Send Message</span>
                <span className="submit-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>

          <div className="contact-page-info">
            <div className="info-card-shell">
              <div className="info-card-core">
                <h4>Email</h4>
                <a href="mailto:hello@valtrix.dev">hello@valtrix.dev</a>
              </div>
            </div>
            <div className="info-card-shell">
              <div className="info-card-core">
                <h4>Location</h4>
                <p>Available Worldwide</p>
              </div>
            </div>
            <div className="info-card-shell">
              <div className="info-card-core">
                <h4>Availability</h4>
                <p>Open to freelance & collab</p>
              </div>
            </div>
            <div className="info-card-shell">
              <div className="info-card-core">
                <h4>Social</h4>
                <div className="social-links">
                  <a href="#" className="social-link">GitHub</a>
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
