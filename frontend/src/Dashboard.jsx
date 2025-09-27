import { useState, useEffect } from 'react'; // 1. Import React hooks
import './Dashboard.css';

function Dashboard({ onNavigate }) {
  // 2. Set up state to hold our dynamic stats and loading status
  const [stats, setStats] = useState({ pendingActions: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data from the backend when the component first loads
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/meetings/action-items/');
        const data = await response.json();

        // Calculate the number of pending items from the response
        const pendingCount = data.action_items.filter(item => item.status === 'Pending').length;

        // Update the state with the new count
        setStats({ pendingActions: pendingCount });

      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        // Keep the default state on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []); // The empty array ensures this runs only once

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button className="tab-btn active">Dashboard</button>
            <button onClick={() => onNavigate('scheduler')} className="tab-btn">Smart Scheduler</button>
            <button onClick={() => onNavigate('agenda')} className="tab-btn">Meeting Agenda</button>
            <button onClick={() => onNavigate('followup')} className="tab-btn">Follow-Up Board</button>
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
                <span className="stat-icon"></span>
              </div>
              {/* This one remains static for now */}
              <div className="stat-number">3</div>
              <div className="stat-label">SCHEDULED</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Pending Actions</h3>
                <span className="stat-icon"></span>
              </div>
              {/* 4. Use the dynamic state variable instead of the hardcoded number */}
              <div className="stat-number">{isLoading ? '...' : stats.pendingActions}</div>
              <div className="stat-label">ITEMS</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <h3>Trust Score</h3>
                <span className="stat-icon"></span>
              </div>
              {/* This one remains static for now */}
              <div className="stat-number">94%</div>
              <div className="stat-label">RELIABILITY</div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="recent-meetings">
              <div className="section-header">
                <h3>Recent Meetings</h3>
                <span className="section-icon"></span>
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
                  <span className="action-icon"></span>
                  <span>Smart Scheduler</span>
                </button>
                <button onClick={() => onNavigate('live-meeting')} className="action-btn">
                  <span className="action-icon"></span>
                  <span>Start a Meeting</span>
                </button>
                <button onClick={() => onNavigate('followup')} className="action-btn">
                  <span className="action-icon"></span>
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