import React from 'react'
import '../style/landing.style.scss'
import { Link, useNavigate, Navigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const LandingPage = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  // If user is authenticated, redirect to dashboard automatically
  if (!loading && user) {
    return <Navigate to="/home" replace />
  }
  else if(loading){
    return (
      <main className="loading-screen" style={{ backgroundColor: '#080b11', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'whitesmoke' }}>Loading...</h1>
      </main>
    )
  }
  

  const features = [
    {
      title: "Profile & Resume Analysis",
      description: "Provide a quick self-description or upload your resume (PDF). Our AI parses your experience, skills, and background to target your preparation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M10 13h4" />
          <path d="M10 17h4" />
          <path d="M10 9h2" />
        </svg>
      )
    },
    {
      title: "Targeted Job Alignment",
      description: "Paste the description of the job you want. The AI details the precise expectations of hiring managers and lines up your experience against them.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      title: "Technical & Behavioral Qs",
      description: "Receive list of interview questions tailored to your gap analysis, complete with answer intentions and high-scoring model answers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      title: "Roadmap & Skill Gaps",
      description: "Uncover critical skill gaps relative to the job requirements and follow a personalized day-by-day learning roadmap to structure your study.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      )
    }
  ]

  if (loading) {
    return (
      <main className="loading-screen" style={{ backgroundColor: '#080b11', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'whitesmoke' }}>Loading...</h1>
      </main>
    )
  }

  return (
    <div className="landing-container">
      {/* Background Blobs for Modern Visual Aesthetic */}
      <div className="ambient-bg">
        <div className="ambient-bg__grid"></div>
        <div className="ambient-bg__blob ambient-bg__blob--1"></div>
        <div className="ambient-bg__blob ambient-bg__blob--2"></div>
      </div>

      <div className="landing-content">
        {/* Navigation Header */}
        <header className="landing-header">
          <div className="landing-header__logo" onClick={() => navigate('/')}>
            InterviewMaster
          </div>
          <nav className="landing-header__nav">
            <Link to="/login" className="landing-header__btn landing-header__btn--login">
              Login
            </Link>
            <Link to="/register" className="landing-header__btn landing-header__btn--register">
              Register
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="landing-hero">
          <div className="landing-hero__badge">AI-Powered Prep Partner</div>
          <h1 className="landing-hero__title">
            Land your dream role.<br />
            <span>Master the interview.</span>
          </h1>
          <p className="landing-hero__description">
            InterviewMaster analyzes your target job requirements and unique profile to generate custom interview plans, uncover skill gaps, and provide step-by-step study roadmaps.
          </p>
          <div className="landing-hero__cta-container">
            <Link to="/register" className="landing-hero__cta-btn landing-hero__cta-btn--primary">
              Start Preparing Now
            </Link>
          </div>
        </section>

        {/* Core Product Features */}
        <section className="landing-features">
          <h2 className="landing-features__title">
            How <span>InterviewMaster</span> Works
          </h2>
          <div className="landing-features__grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="landing-footer__copy">
            &copy; {new Date().getFullYear()} InterviewMaster. All rights reserved.
          </div>
          <div className="landing-footer__links">
            <a href="#" className="landing-footer__link">Privacy Policy</a>
            <a href="#" className="landing-footer__link">Terms of Service</a>
            <a href="#" className="landing-footer__link">Support</a>
          </div>
        </footer>
      </div>
    </div>
  )
}


export default LandingPage
