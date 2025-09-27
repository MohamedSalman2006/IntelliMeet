import { useState, useEffect } from 'react';
import './SmartScheduler.css';

function SmartScheduler({ onNavigate }) {
  const [allParticipants, setAllParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSlots, setSuggestedSlots] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/meetings/participants/');
        const data = await response.json();
        setAllParticipants(data.participants);
      } catch (err) {
        setError('Failed to load participant list.');
      }
    };
    fetchParticipants();
  }, []);

  const addParticipant = () => {
    if (selectedDropdown && !selectedParticipants.find(p => p.id === parseInt(selectedDropdown))) {
      const participantToAdd = allParticipants.find(p => p.id === parseInt(selectedDropdown));
      setSelectedParticipants([...selectedParticipants, participantToAdd]);
    }
  };

  const removeParticipant = (idToRemove) => {
    setSelectedParticipants(selectedParticipants.filter(p => p.id !== idToRemove));
  };
  
  const handleSuggestTime = async () => {
    if (selectedParticipants.length < 2) {
      setError("Please select at least two participants.");
      return;
    }
    setIsLoading(true);
    setError('');
    setSuggestedSlots([]);

    const participant_ids = selectedParticipants.map(p => p.id);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/meetings/suggest-slots/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant_ids })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error from server.");
      setSuggestedSlots(data.suggested_slots);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scheduler-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
          <div className="dashboard-tabs">
            <button onClick={() => onNavigate('dashboard')} className="tab-btn">Dashboard</button>
            <button className="tab-btn active">Smart Scheduler</button>
            <button onClick={() => onNavigate('agenda')} className="tab-btn">Meeting Agenda</button>
            <button onClick={() => onNavigate('followup')} className="tab-btn">Follow-Up Board</button>
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
            <p>Select participants to find the perfect meeting time.</p>
          </div>
          <div className="scheduler-content">
            <div className="scheduler-form">
              <div className="form-section">
                <h3>Participants</h3>
                <div className="participant-selector">
                  <select className="participant-dropdown" value={selectedDropdown} onChange={e => setSelectedDropdown(e.target.value)}>
                    <option value="">Select participant to add...</option>
                    {allParticipants.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.timezone})</option>
                    ))}
                  </select>
                  <button className="add-participant-btn" onClick={addParticipant}>+</button>
                </div>
                <div className="selected-participants">
                  {selectedParticipants.map(p => (
                    <div className="participant-tag" key={p.id}>
                      {p.name} <span className="remove-participant" onClick={() => removeParticipant(p.id)}>×</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-section">
                <button onClick={handleSuggestTime} className="suggest-time-btn" disabled={isLoading}>
                  <span className="ai-icon"></span>
                  {isLoading ? 'Finding Time...' : 'Suggest Optimal Time Slot'}
                </button>
              </div>
            </div>
            <div className="scheduler-calendar">
              <div className="availability-panel" style={{marginTop: '2rem'}}>
                <h4>AI Suggested Slots</h4>
                <div className="time-slots">
                  {isLoading && <p className="time-range">Loading...</p>}
                  {error && <p className="time-range" style={{ color: '#ff6b6b' }}>{error}</p>}
                  {suggestedSlots.length > 0 ? (
                    suggestedSlots.map((slot, index) => (
                      <div className="time-slot" key={index}>
                        <div>
                          <p className="participant-name">🗓️ Option {index + 1}</p>
                          <p className="time-range">
                            {slot.p1_name}: {new Date(slot.start_p1).toLocaleTimeString('en-US', { 
                              timeZone: slot.p1_timezone, 
                              hour: '2-digit', 
                              minute: '2-digit', 
                              hour12: true 
                            })}
                          </p>
                          <p className="time-range">
                            {slot.p2_name}: {new Date(slot.start_p2).toLocaleTimeString('en-US', { 
                              timeZone: slot.p2_timezone, 
                              hour: '2-digit', 
                              minute: '2-digit', 
                              hour12: true 
                            })}
                          </p>
                        </div>
                        <button style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Schedule</button>
                      </div>
                    ))
                  ) : (
                    !isLoading && !error && <p className="time-range">Click the button to get suggestions.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SmartScheduler;