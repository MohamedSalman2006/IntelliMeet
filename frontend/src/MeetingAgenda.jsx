import { useState, useEffect } from 'react';
import './MeetingAgenda.css';

function MeetingAgenda({ onNavigate }) {
  const [agendaItems, setAgendaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/meetings/generate-agenda/');
        const data = await response.json();
        setAgendaItems(data.generated_agenda);
      } catch (error) {
        console.error("Failed to fetch agenda:", error);
        setAgendaItems(["Failed to load agenda."]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgenda();
  }, []);

  return (
    <div className="agenda-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button onClick={() => onNavigate('dashboard')} className="tab-btn">Dashboard</button>
            <button onClick={() => onNavigate('scheduler')} className="tab-btn">Smart Scheduler</button>
            <button className="tab-btn active">Meeting Agenda</button>
            <button onClick={() => onNavigate('followup')} className="tab-btn">Follow-Up Board</button>
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
                <span className="meta-icon"></span>
              </span> 
              <span className="meta-item">
                <span className="meta-icon"></span>
              </span> 
              <span className="meta-item">
                <span className="meta-icon"></span>
              </span> 
            </div>
          </div>

          <div className="agenda-content">
            <div className="agenda-items-section">
              <h3>Agenda Items</h3>
              {isLoading ? (
                <p style={{color: 'white'}}>Generating agenda...</p>
              ) : (
                agendaItems.map((item, index) => (
                  <div className="agenda-item" key={index}>
                    <div className="item-header">
                      <h4>{item}</h4>
                      <div className="item-badges">
                        <span className="item-badge discussion">Discussion</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            

          </div>
        </div>
      </main> 
    </div>
  );
}

export default MeetingAgenda;