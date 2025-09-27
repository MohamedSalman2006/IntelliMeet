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
      <header className="dashboard-header">{/* ... nav from your file ... */}</header>
      <main className="agenda-main">
        <div className="agenda-container">
          <div className="agenda-title">
            <h1>Meeting Agenda</h1>
            <p>AI-generated agenda with pre-meeting preparation</p>
          </div>
          <div className="meeting-header">{/* ... meeting header from your file ... */}</div>
          <div className="agenda-content">
            <div className="agenda-items-section">
              <h3>Agenda Items</h3>
              {isLoading ? (
                <p style={{color: 'white'}}>Generating agenda...</p>
              ) : (
                agendaItems.map((item, index) => (
                  <div className="agenda-item" key={index}>
                    <div className="item-header"><h4>{item}</h4></div>
                  </div>
                ))
              )}
            </div>
            <div className="preparation-section">{/* ... static prep section from your file ... */}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MeetingAgenda;