import { useState, useEffect } from 'react'
import Features from './Features'
import Dashboard from './Dashboard'
import SmartScheduler from './SmartScheduler'
import MeetingAgenda from './MeetingAgenda'
import FollowUpBoard from './FollowUpBoard'
import Login from './Login'
import Register from './Register'
import './App.css'

function Home({ onNavigate }) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate('features')} className="nav-link-btn">Features</button>
            {/* Pricing button removed */}
            <button onClick={() => onNavigate('about')} className="nav-link-btn">About Us</button>
            <button onClick={() => onNavigate('login')} className="btn-secondary">Log In</button>
          </div>
        </nav>
        
        <div className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Reinvent Your Meetings. Boost Your Partnerships. Meet IntelliMeet.
            </h1>
            <p className="hero-subtitle">
              Stop wasting time in endless back-and-forth. Our AI transforms messy global meetings into strategic, productive powerhouses.
            </p>
            <div className="hero-cta">
              <button onClick={() => onNavigate('register')} className="btn-primary">Get Started Free</button>
              <button className="btn-secondary">See How It Works</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="meeting-preview">
              <div className="video-call">
                <div className="participant"></div>
                <div className="participant"></div>
                <div className="participant"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="features-overview">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon"></div>
              <h3>Effortless Scheduling</h3>
              <p>AI finds the perfect time across global calendars in seconds</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"></div>
              <h3>Intelligent Prep</h3>
              <p>Automated agendas & clear data, delivered before every call</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"></div>
              <h3>Decisions & Follow-ups</h3>
              <p>Exact notes, post-action assigned & tracked. Nothing slips.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"></div>
              <h3>Build Trust & Momentum</h3>
              <p>Turn action captured achievements into reliable progress</p>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison">
        <div className="container">
          <div className="comparison-grid">
            <div className="before">
              <h2>Before IntelliMeet</h2>
              <div className="chaos-visual">
                <div className="scattered-docs"></div>
                <p>Scattered notes, missed follow-ups, wasted time</p>
              </div>
            </div>
            <div className="after">
              <h2>With IntelliMeet</h2>
              <div className="organized-visual">
                <div className="dashboard">
                  <div className="task-item">Q4 Product Strategy - 89%</div>
                  <div className="task-item">Key Agenda - 76%</div>
                  <div className="task-item">Action Items - 94%</div>
                  <div className="progress-badge">89% Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Connect & Sync</h3>
              <p>Securely link your calendars and logistics</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Intelligent Algorithm</h3>
              <p>Analyzes & curates</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Collaborate Decide</h3>
              <p>Stay logistics</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Collaborate Execute</h3>
              <p>conversations, not logistics</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Gamified Follow-up Streak</h3>
              <p>conversations, not logistics</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>Testimonials</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="avatar"></div>
              <p>"Our cross-border meetings are finally productive! IntelliMeet has cut down our prep time by half and ensures every decision leads to action."</p>
              <cite>— Anja M., Sales Director, GlobalTech Germany</cite>
            </div>
            <div className="testimonial">
              <div className="avatar"></div>
              <p>"I used to dread scheduling across time zones. Now, I just tell the AI what I need, and it handles everything. Game changer!"</p>
              <cite>— Priya K., Head of Partnerships, Zoho Chennai</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <h2>Ready to Make Every Meeting Count?</h2>
          <button onClick={() => onNavigate('register')} className="btn-primary">Start Your Free Trial Today</button>
          <p className="small-print">No credit card required. Experience the future of global partnerships.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon"></span>
              <span className="logo-text">IntelliMeet</span>
            </div>
            <div className="footer-links">
              <button onClick={() => onNavigate('features')} className="nav-link-btn">Features</button>
              {/* Pricing button removed */}
              <button onClick={() => onNavigate('about')} className="nav-link-btn">About Us</button>
              <button onClick={() => onNavigate('contact')} className="nav-link-btn">Contact</button>
            </div>
            <div className="footer-actions">
              <button onClick={() => onNavigate('register')} className="btn-primary">Get Started Free</button>
              <button className="btn-secondary">Book a Demo</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function Pricing({ onNavigate }) {
  return (
    <div className="pricing-page">
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate('home')} className="nav-link-btn">Home</button>
            <button onClick={() => onNavigate('features')} className="nav-link-btn">Features</button>
            {/* Pricing button removed */}
            <button onClick={() => onNavigate('about')} className="nav-link-btn">About Us</button>
            <button className="btn-secondary">Log In</button>
          </div>
        </nav>
        
        <div className="hero">
          <div className="hero-content">
            {/* Pricing page content removed */}
            <div className="hero-cta">
              <button onClick={() => onNavigate('home')} className="btn-primary">Back to Home</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

function About({ onNavigate }) {
  return (
    <div className="about-page">
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate('home')} className="nav-link-btn">Home</button>
            <button onClick={() => onNavigate('features')} className="nav-link-btn">Features</button>
            {/* Pricing button removed */}
            <button className="nav-link-btn active">About Us</button>
            <button className="btn-secondary">Log In</button>
          </div>
        </nav>
        
        <div className="hero">
          <div className="hero-content">
            <h1 className="hero-title">About Us</h1>
            <p className="hero-subtitle">Learn more about IntelliMeet and our mission to transform global meetings.</p>
            <div className="hero-cta">
              <button onClick={() => onNavigate('home')} className="btn-primary">Back to Home</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Ensure page starts at top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  const navigate = (page) => {
    setCurrentPage(page)
    // Clear any hash from URL
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    // Scroll to top when navigating to a new page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="app">
      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'features' && <Features onNavigate={navigate} />}
  {/* Pricing page removed from navigation */}
      {currentPage === 'about' && <About onNavigate={navigate} />}
      {currentPage === 'login' && <Login onNavigate={navigate} />}
      {currentPage === 'register' && <Register onNavigate={navigate} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
      {currentPage === 'scheduler' && <SmartScheduler onNavigate={navigate} />}
      {currentPage === 'agenda' && <MeetingAgenda onNavigate={navigate} />}
      {currentPage === 'followup' && <FollowUpBoard onNavigate={navigate} />}
    </div>
  )
}

export default App
