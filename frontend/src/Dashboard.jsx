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
             {/* ... rest of your dashboard JSX from your file ... */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;