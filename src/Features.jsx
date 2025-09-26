import './Features.css'

function Features({ onNavigate }) {
  return (
    <div className="features-page">
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate('home')} className="nav-link-btn">Home</button>
            <button className="nav-link-btn active">Features</button>
            {/* Pricing button removed */}
            <button onClick={() => onNavigate('about')} className="nav-link-btn">About Us</button>
            <button onClick={() => onNavigate('login')} className="btn-secondary">Log In</button>
          </div>
        </nav>
      </header>

      <section className="features-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Transform Meetings. Achieve More. Your AI Copilot</h1>
            <p>Shift transform the complex time line they project timely intelligent fancy and AI copilot</p>
            <div className="hero-buttons">
              <button onClick={() => onNavigate('register')} className="btn-primary">Get Started Free</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="ai-brain">
            <div className="brain-visual">
              <div className="gears">⚙️</div>
              <div className="circuits">🔗</div>
              <div className="brain-core">🧠</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-cards">
        <div className="container">
          <div className="cards-grid">
            <div className="feature-card smart-scheduling">
              <div className="card-icon">📅✅</div>
              <h3>Smart Scheduling</h3>
              <p className="card-summary">Find the perfect time instantly</p>
              <div className="card-details">
                <p>Say goodbye to "When are you free?" Our AI finds the perfect slot across global calendars in seconds, intelligently suggesting optimal times.</p>
              </div>
            </div>
            
            <div className="feature-card intelligent-prep">
              <div className="card-icon">📋🧠</div>
              <h3>Intelligent Prep</h3>
              <p className="card-summary">Contextual agendas, Always</p>
              <div className="card-details">
                <p>Every invite arrives with past meeting notes, relevant sales data, and a clear, concise agenda. Both sides are ready, every time.</p>
              </div>
            </div>
            
            <div className="feature-card decisions-tracked">
              <div className="card-icon">✅📝</div>
              <h3>Decisions Tracked</h3>
              <p className="card-summary">Actions clear, follow-ups done</p>
              <div className="card-details">
                <p>Never lose an important point again. Our AI captures decisions, assigns follow-ups, and sends timely reminders, ensuring nothing slips through the cracks.</p>
              </div>
            </div>
            
            <div className="feature-card gamified-progress">
              <div className="card-icon">🏆📈</div>
              <h3>Gamified Progress</h3>
              <p className="card-summary">Build Trust. Boost momentum</p>
              <div className="card-details">
                <p>Turn tasks into triumphs! Our unique gamification motivates teams to complete follow-ups, building a "Trust Score" that visualizes your partnership's momentum.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="before-after">
        <div className="container">
          <div className="comparison-cards">
            <div className="before-card">
              <h3>Before Chaos:</h3>
              <div className="chaos-icons">
                <div className="confused-box">📦?</div>
                <div className="confused-box">📦?</div>
              </div>
            </div>
            
            <div className="after-card">
              <h3>After Clarity</h3>
              <div className="clarity-diagram">
                <div className="process-step">✅</div>
                <div className="process-flow">→</div>
                <div className="process-step">📊</div>
                <div className="process-flow">→</div>
                <div className="process-step">✅</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-visual">
        <div className="container">
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="process-item">
              <div className="step-icon">🔗</div>
              <span>Connect</span>
            </div>
            <div className="arrow">→</div>
            <div className="process-item">
              <div className="step-icon">🔍</div>
              <span>Analyze</span>
            </div>
            <div className="arrow">→</div>
            <div className="process-item">
              <div className="step-icon">🤝</div>
              <span>Collaborate</span>
            </div>
            <div className="arrow">→</div>
            <div className="process-item">
              <div className="step-icon">🏆</div>
              <span>Achieve</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to End Meeting Mayhem?</h2>
            <button onClick={() => onNavigate('login')} className="btn-primary">Start Your Free Trial</button>
            <div className="testimonial-previews">
              <div className="testimonial-bubble">💬 "Game changer!"</div>
              <div className="testimonial-bubble">💬 "Finally productive!"</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features