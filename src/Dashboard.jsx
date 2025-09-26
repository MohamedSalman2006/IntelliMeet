import './Dashboard.css'

function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button className="tab-btn active">📊 Dashboard</button>
            <button onClick={() => onNavigate('scheduler')} className="tab-btn">🤖 Smart Scheduler</button>
            <button onClick={() => onNavigate('agenda')} className="tab-btn">📋 Meeting Agenda</button>
            <button onClick={() => onNavigate('followup')} className="tab-btn">📈 Follow-Up Board</button>
          </div>
          <div className="user-menu">
            <button onClick={() => onNavigate('home')} className="btn-secondary">Logout</button>
          </div>
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-title">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with your meetings today.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <h3>Today's Meetings</h3>
                <span className="stat-icon">📅</span>
              </div>
              <div className="stat-number">3</div>
              <div className="stat-label">SCHEDULED</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Pending Actions</h3>
                <span className="stat-icon">⏳</span>
              </div>
              <div className="stat-number">12</div>
              <div className="stat-label">ITEMS</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Trust Score</h3>
                <span className="stat-icon">🛡️</span>
              </div>
              <div className="stat-number">94%</div>
              <div className="stat-label">RELIABILITY</div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="recent-meetings">
              <div className="section-header">
                <h3>Recent Meetings</h3>
                <span className="section-icon">🔄</span>
              </div>
              <div className="meetings-list">
                <div className="meeting-item">
                  <div className="meeting-info">
                    <h4>Product Strategy Review</h4>
                    <p>2 hours ago</p>
                  </div>
                  <span className="meeting-status completed">Completed</span>
                </div>
                <div className="meeting-item">
                  <div className="meeting-info">
                    <h4>Weekly Team Sync</h4>
                    <p>Yesterday 3:00 PM</p>
                  </div>
                  <span className="meeting-status completed">Completed</span>
                </div>
                <div className="meeting-item">
                  <div className="meeting-info">
                    <h4>Client Presentation</h4>
                    <p>Tomorrow 10:00 AM</p>
                  </div>
                  <span className="meeting-status upcoming">Upcoming</span>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <div className="section-header">
                <h3>Quick Actions</h3>
                <span className="section-icon">⚡</span>
              </div>
              <div className="actions-list">
                <button onClick={() => onNavigate('scheduler')} className="action-btn">
                  <span className="action-icon">🤖</span>
                  <span>Smart Scheduler</span>
                </button>
                <button onClick={() => onNavigate('followup')} className="action-btn">
                  <span className="action-icon">👀</span>
                  <span>View Tasks</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard