import './FollowUpBoard.css'

function FollowUpBoard({ onNavigate }) {
  return (
    <div className="followup-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button onClick={() => onNavigate('dashboard')} className="tab-btn"> Dashboard</button>
            <button onClick={() => onNavigate('scheduler')} className="tab-btn"> Smart Scheduler</button>
            <button onClick={() => onNavigate('agenda')} className="tab-btn"> Meeting Agenda</button>
            <button className="tab-btn active"> Follow-Up Board</button>
          </div>
          <div className="user-menu">
            <button onClick={() => onNavigate('home')} className="btn-secondary">Logout</button>
          </div>
        </nav>
      </header>

      <main className="followup-main">
        <div className="followup-container">
          <div className="followup-title">
            <h1>Follow-Up Board</h1>
            <p>Track action items and progress with AI-powered insights</p>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <div className="progress-info">
                <span className="progress-label">Overall Progress</span>
                <span className="progress-percentage">67%</span>
              </div>
              <div className="trust-score">
                <span className="trust-label">Trust Score: </span>
                <span className="trust-value">94%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '67%'}}></div>
            </div>
          </div>

          <div className="board-container">
            <div className="board-column">
              <div className="column-header">
                <h3>Open</h3>
                <span className="task-count">3</span>
              </div>
              <div className="task-list">
                <div className="task-card high-priority">
                  <div className="task-header">
                    <div className="task-title">Analyze conversion funnel bottlenecks</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">Sarah Johnson</span>
                    </div>
                    <div className="due-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Oct 2, 2024</span>
                    </div>
                  </div>
                  <div className="task-description">
                    Identify key drop-off points in the conversion process and provide recommendations for improvement.
                  </div>
                </div>

                <div className="task-card medium-priority">
                  <div className="task-header">
                    <div className="task-title">Research competitor strategies</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">Mike Chen</span>
                    </div>
                    <div className="due-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Oct 5, 2024</span>
                    </div>
                  </div>
                  <div className="task-description">
                    Analyze top 3 competitors' marketing and product strategies for Q4 planning.
                  </div>
                </div>

                <div className="task-card low-priority">
                  <div className="task-header">
                    <div className="task-title">Update team documentation</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">Emma Davis</span>
                    </div>
                    <div className="due-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Oct 8, 2024</span>
                    </div>
                  </div>
                  <div className="task-description">
                    Update project documentation and onboarding materials for new team members.
                  </div>
                </div>
              </div>
            </div>

            <div className="board-column">
              <div className="column-header">
                <h3>In Progress</h3>
                <span className="task-count">2</span>
              </div>
              <div className="task-list">
                <div className="task-card high-priority in-progress">
                  <div className="task-header">
                    <div className="task-title">Prepare Q4 budget proposal</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">John Smith</span>
                    </div>
                    <div className="due-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Sep 30, 2024</span>
                    </div>
                  </div>
                  <div className="task-progress">
                    <div className="progress-bar-small">
                      <div className="progress-fill-small" style={{width: '75%'}}></div>
                    </div>
                    <span className="progress-text">75%</span>
                  </div>
                </div>

                <div className="task-card medium-priority in-progress">
                  <div className="task-header">
                    <div className="task-title">Implement customer feedback system</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">Sarah Johnson</span>
                    </div>
                    <div className="due-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Oct 10, 2024</span>
                    </div>
                  </div>
                  <div className="task-progress">
                    <div className="progress-bar-small">
                      <div className="progress-fill-small" style={{width: '40%'}}></div>
                    </div>
                    <span className="progress-text">40%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="board-column">
              <div className="column-header">
                <h3>Done</h3>
                <span className="task-count">2</span>
              </div>
              <div className="task-list">
                <div className="task-card completed">
                  <div className="task-header">
                    <div className="task-title">Review Q3 sales report</div>
                    <div className="completed-icon">✓</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">John Smith</span>
                    </div>
                    <div className="completed-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Completed Sep 25</span>
                    </div>
                  </div>
                </div>

                <div className="task-card completed">
                  <div className="task-header">
                    <div className="task-title">Update product roadmap</div>
                    <div className="completed-icon">✓</div>
                  </div>
                  <div className="task-meta">
                    <div className="assignee">
                      <span className="assignee-icon"></span>
                      <span className="assignee-name">Sarah Johnson</span>
                    </div>
                    <div className="completed-date">
                      <span className="date-icon"></span>
                      <span className="date-text">Completed Sep 24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FollowUpBoard