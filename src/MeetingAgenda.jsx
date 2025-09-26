import './MeetingAgenda.css'

function MeetingAgenda({ onNavigate }) {
  return (
    <div className="agenda-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button onClick={() => onNavigate('dashboard')} className="tab-btn">📊 Dashboard</button>
            <button onClick={() => onNavigate('scheduler')} className="tab-btn">🤖 Smart Scheduler</button>
            <button className="tab-btn active">📋 Meeting Agenda</button>
            <button onClick={() => onNavigate('followup')} className="tab-btn">📈 Follow-Up Board</button>
          </div>
          <div className="user-menu">
            <button onClick={() => onNavigate('home')} className="btn-secondary">Logout</button>
          </div>
        </nav>
      </header>

      <main className="agenda-main">
        <div className="agenda-container">
          <div className="agenda-title">
            <h1>Meeting Agenda</h1>
            <p>AI-generated agenda with pre-meeting preparation</p>
          </div>

          <div className="meeting-header">
            <h2>Product Strategy Review</h2>
            <div className="meeting-meta">
              <span className="meta-item">
                <span className="meta-icon">📅</span>
                September 27, 2024
              </span>
              <span className="meta-item">
                <span className="meta-icon">🕐</span>
                2:00 PM - 3:00 PM EST
              </span>
              <span className="meta-item">
                <span className="meta-icon">👥</span>
                4 Participants
              </span>
            </div>
          </div>

          <div className="agenda-content">
            <div className="agenda-items-section">
              <h3>Agenda Items</h3>
              
              <div className="agenda-item">
                <div className="item-header">
                  <h4>Welcome & Introductions</h4>
                  <div className="item-badges">
                    <span className="item-badge discussion">Discussion</span>
                    <span className="time-estimate">5 min</span>
                  </div>
                </div>
                <p className="item-description">Brief introductions and meeting overview</p>
              </div>

              <div className="agenda-item">
                <div className="item-header">
                  <h4>Q3 Performance Review</h4>
                  <div className="item-badges">
                    <span className="item-badge presentation">Presentation</span>
                    <span className="item-badge analysis">Analysis</span>
                    <span className="time-estimate">15 min</span>
                  </div>
                </div>
                <p className="item-description">Review of Q3 metrics, achievements, and challenges</p>
              </div>

              <div className="agenda-item">
                <div className="item-header">
                  <h4>Q4 Strategy Discussion</h4>
                  <div className="item-badges">
                    <span className="item-badge discussion">Discussion</span>
                    <span className="item-badge brainstorm">Brainstorm</span>
                    <span className="time-estimate">20 min</span>
                  </div>
                </div>
                <p className="item-description">Strategic planning for Q4 initiatives and goals</p>
              </div>

              <div className="agenda-item">
                <div className="item-header">
                  <h4>Action Items & Next Steps</h4>
                  <div className="item-badges">
                    <span className="item-badge decision">Decision</span>
                    <span className="time-estimate">15 min</span>
                  </div>
                </div>
                <p className="item-description">Define action items and assign responsibilities</p>
              </div>
            </div>

            <div className="preparation-section">
              <h3>Pre-Meeting Preparation</h3>
              
              <div className="participant-prep">
                <div className="participant-header">
                  <span className="participant-icon">👤</span>
                  <span className="participant-name">John Smith</span>
                  <button className="expand-btn">▼</button>
                </div>
                <div className="prep-tasks">
                  <div className="prep-task completed">
                    <span className="task-checkbox">✓</span>
                    <span className="task-text">Review Q3 sales report</span>
                  </div>
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Prepare market analysis slides</span>
                  </div>
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Draft Q4 budget proposal</span>
                  </div>
                </div>
              </div>

              <div className="participant-prep">
                <div className="participant-header">
                  <span className="participant-icon">👤</span>
                  <span className="participant-name">Sarah Johnson</span>
                  <button className="expand-btn">▼</button>
                </div>
                <div className="prep-tasks">
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Compile customer feedback data</span>
                  </div>
                  <div className="prep-task completed">
                    <span className="task-checkbox">✓</span>
                    <span className="task-text">Prepare competitive analysis</span>
                  </div>
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Review product roadmap priorities</span>
                  </div>
                </div>
              </div>

              <div className="participant-prep">
                <div className="participant-header">
                  <span className="participant-icon">👤</span>
                  <span className="participant-name">Mike Chen</span>
                  <button className="expand-btn">▼</button>
                </div>
                <div className="prep-tasks">
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Update technical documentation</span>
                  </div>
                  <div className="prep-task completed">
                    <span className="task-checkbox">✓</span>
                    <span className="task-text">Review development milestones</span>
                  </div>
                </div>
              </div>

              <div className="participant-prep">
                <div className="participant-header">
                  <span className="participant-icon">👤</span>
                  <span className="participant-name">Lisa Rodriguez</span>
                  <button className="expand-btn">▼</button>
                </div>
                <div className="prep-tasks">
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Finalize marketing campaign metrics</span>
                  </div>
                  <div className="prep-task">
                    <span className="task-checkbox">☐</span>
                    <span className="task-text">Prepare brand awareness report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="agenda-actions">
            <button className="action-btn secondary">
              <span className="btn-icon">📄</span>
              Export PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MeetingAgenda