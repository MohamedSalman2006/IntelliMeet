import './SmartScheduler.css'

function SmartScheduler({ onNavigate }) {
  return (
    <div className="scheduler-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button onClick={() => onNavigate('dashboard')} className="tab-btn"> Dashboard</button>
            <button className="tab-btn active"> Smart Scheduler</button>
            <button onClick={() => onNavigate('agenda')} className="tab-btn"> Meeting Agenda</button>
            <button onClick={() => onNavigate('followup')} className="tab-btn"> Follow-Up Board</button>
          </div>
          <div className="user-menu">
            <button onClick={() => onNavigate('home')} className="btn-secondary">Logout</button>
          </div>
        </nav>
      </header>

      <main className="scheduler-main">
        <div className="scheduler-container">
          <div className="scheduler-title">
            <h1>Smart Scheduler</h1>
            <p>Find the perfect time for your meeting using AI-powered scheduling</p>
          </div>

          <div className="scheduler-content">
            <div className="scheduler-form">
              <div className="form-section">
                <h3>Meeting Title</h3>
                <input 
                  type="text" 
                  placeholder="Enter meeting title"
                  className="meeting-title-input"
                />
              </div>

              <div className="form-section">
                <h3>Participants</h3>
                <div className="participant-selector">
                  <select className="participant-dropdown">
                    <option value="">Select participant</option>
                    <option value="john">John Smith (EST)</option>
                    <option value="sarah">Sarah Johnson (PST)</option>
                    <option value="mike">Mike Chen (GMT)</option>
                  </select>
                  <button className="add-participant-btn">+</button>
                </div>
                
                <div className="selected-participants">
                  <div className="participant-tag">
                    John Smith (EST) <span className="remove-participant">×</span>
                  </div>
                  <div className="participant-tag">
                    Sarah Johnson (PST) <span className="remove-participant">×</span>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Import Calendar Data</h3>
                <button className="upload-btn">
                  <span className="upload-icon"></span>
                  Upload JSON
                </button>
              </div>

              <div className="form-section">
                <button className="suggest-time-btn">
                  <span className="ai-icon"></span>
                  Suggest Optimal Time Slot
                </button>
              </div>
            </div>

            <div className="scheduler-calendar">
              <div className="calendar-header">
                <button className="nav-btn">‹</button>
                <h3>September 2024</h3>
                <button className="nav-btn">›</button>
              </div>

              <div className="calendar-grid">
                <div className="calendar-days">
                  <div className="day-header">Mon</div>
                  <div className="day-header">Tue</div>
                  <div className="day-header">Wed</div>
                  <div className="day-header">Thu</div>
                  <div className="day-header">Fri</div>
                  <div className="day-header">Sat</div>
                  <div className="day-header">Sun</div>
                </div>

                <div className="calendar-dates">
                  <div className="date-cell"></div>
                  <div className="date-cell"></div>
                  <div className="date-cell"></div>
                  <div className="date-cell"></div>
                  <div className="date-cell"></div>
                  <div className="date-cell"></div>
                  <div className="date-cell">1</div>
                  
                  <div className="date-cell">2</div>
                  <div className="date-cell">3</div>
                  <div className="date-cell">4</div>
                  <div className="date-cell">5</div>
                  <div className="date-cell">6</div>
                  <div className="date-cell">7</div>
                  <div className="date-cell">8</div>
                  
                  <div className="date-cell">9</div>
                  <div className="date-cell">10</div>
                  <div className="date-cell">11</div>
                  <div className="date-cell">12</div>
                  <div className="date-cell">13</div>
                  <div className="date-cell">14</div>
                  <div className="date-cell">15</div>
                  
                  <div className="date-cell">16</div>
                  <div className="date-cell">17</div>
                  <div className="date-cell">18</div>
                  <div className="date-cell">19</div>
                  <div className="date-cell">20</div>
                  <div className="date-cell">21</div>
                  <div className="date-cell">22</div>
                  
                  <div className="date-cell">23</div>
                  <div className="date-cell">24</div>
                  <div className="date-cell">25</div>
                  <div className="date-cell selected">26</div>
                  <div className="date-cell">27</div>
                  <div className="date-cell">28</div>
                  <div className="date-cell">29</div>
                  
                  <div className="date-cell">30</div>
                </div>
              </div>

              <div className="availability-panel">
                <h4>Available Time Slots</h4>
                <div className="time-slots">
                  <div className="time-slot">
                    <div className="participant-name">John Smith (EST)</div>
                    <div className="time-range">2:00 PM - 3:00 PM</div>
                  </div>
                  <div className="time-slot">
                    <div className="participant-name">Sarah Johnson (PST)</div>
                    <div className="time-range">11:00 AM - 12:00 PM</div>
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

export default SmartScheduler
