import { useState, useEffect } from 'react';
import './FollowUpBoard.css';

function FollowUpBoard({ onNavigate }) {
  const [actionItems, setActionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActionItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/meetings/action-items/');
        if (!response.ok) throw new Error('Could not fetch action items.');
        const data = await response.json();
        setActionItems(data.action_items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActionItems();
  }, []);

  const renderTasksByStatus = (status) => {
    if (isLoading) return <p style={{ color: 'white' }}>Loading...</p>;
    if (error) return <p style={{ color: 'white' }}>Error loading tasks: {error}</p>;

    const items = actionItems.filter(item => item.status === status);

    if (items.length === 0) {
      return <p style={{ color: 'rgba(255,255,255,0.6)' }}>No tasks in this category.</p>;
    }

    return items.map(item => (
      <div className="task-card low-priority" key={item.id}>
        <div className="task-header">
          <div className="task-title">{item.description}</div>
        </div>
        <div className="task-meta">
          <div className="assignee">
            <span className="assignee-icon">👤</span>
            <span className="assignee-name">{item.assignee}</span>
          </div>
          <div className="due-date">
            <span className="date-icon"></span>
            <span className="date-text">Created: {new Date(item.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="followup-page">
      <header className="dashboard-header">
        {/* --- This is the complete, filled-in navbar --- */}
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button onClick={() => onNavigate('dashboard')} className="tab-btn">Dashboard</button>
            <button onClick={() => onNavigate('scheduler')} className="tab-btn">Smart Scheduler</button>
            <button onClick={() => onNavigate('agenda')} className="tab-btn">Meeting Agenda</button>
            <button className="tab-btn active">Follow-Up Board</button>
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
                <span className="task-count">{actionItems.filter(i => i.status === 'Pending').length}</span>
              </div>
              <div className="task-list">{renderTasksByStatus('Pending')}</div>
            </div>
            <div className="board-column">
              <div className="column-header"><h3>In Progress</h3><span className="task-count">0</span></div>
              <div className="task-list"><p style={{ color: 'rgba(255,255,255,0.6)' }}>No tasks in this category.</p></div>
            </div>
            <div className="board-column">
              <div className="column-header"><h3>Done</h3><span className="task-count">0</span></div>
              <div className="task-list"><p style={{ color: 'rgba(255,255,255,0.6)' }}>No tasks in this category.</p></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FollowUpBoard;