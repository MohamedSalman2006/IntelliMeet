import { useState } from 'react';
import './SmartScheduler.css';

// Pre-filled sample data for the two participants' calendars
const sampleLoc1Json = JSON.stringify({
  name: "chennai",
  calendar: {
    timezone: "Asia/Kolkata",
    free_slots: [
      { "start": "2025-09-28T14:00:00", "end": "2025-09-28T18:00:00" }
    ]
  }
}, null, 2);

const sampleLoc2Json = JSON.stringify({
  name: "germany",
  calendar: {
    timezone: "Europe/Berlin",
    free_slots: [
      { "start": "2025-09-28T09:00:00", "end": "2025-09-28T11:30:00" }
    ]
  }
}, null, 2);


function SmartScheduler({ onNavigate }) {
  const [loc1Json, setLoc1Json] = useState(sampleLoc1Json);
  const [loc2Json, setLoc2Json] = useState(sampleLoc2Json);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSlots, setSuggestedSlots] = useState([]);
  const [error, setError] = useState('');
  
  // 1. Add new state to track the scheduling status
  const [scheduleStatus, setScheduleStatus] = useState('');

  const handleSuggestTime = async () => {
    setIsLoading(true);
    setError('');
    setSuggestedSlots([]);
    setScheduleStatus(''); // Clear previous status messages

    try {
      const loc1Data = JSON.parse(loc1Json);
      const loc2Data = JSON.parse(loc2Json);
      const requestPayload = { loc1: loc1Data, loc2: loc2Data, duration_minutes: 60 };

      const response = await fetch('http://127.0.0.1:8000/api/meetings/suggest-slots/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An unknown error occurred.");
      setSuggestedSlots(data.suggested_slots);
    } catch (err) {
      setError(`Failed to get suggestions. Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 2. Create the new function to call the scheduling API
  const handleScheduleClick = async (slot) => {
    setScheduleStatus('Scheduling...');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/meetings/schedule-event/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_utc: slot.start_utc,
          end_utc: slot.end_utc
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to schedule.');
      setScheduleStatus('Success! The meeting has been booked via Cal.com.');
    } catch (err) {
      setScheduleStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="scheduler-page">
      <header className="dashboard-header">{/* ... nav from your file ... */}</header>
      <main className="scheduler-main">
        <div className="scheduler-container">
          <div className="scheduler-title">
            <h1>Smart Scheduler</h1>
            <p>Paste calendar data for two locations to find the perfect meeting time.</p>
          </div>
          <div className="scheduler-content">
            <div className="scheduler-form">
              <div className="form-section">
                <h3>Participant 1 Calendar Data (JSON)</h3>
                <textarea 
                  className="meeting-title-input" 
                  style={{ height: '200px', fontFamily: 'monospace' }}
                  value={loc1Json}
                  onChange={(e) => setLoc1Json(e.target.value)}
                />
              </div>
              <div className="form-section">
                <h3>Participant 2 Calendar Data (JSON)</h3>
                <textarea 
                  className="meeting-title-input" 
                  style={{ height: '200px', fontFamily: 'monospace' }}
                  value={loc2Json}
                  onChange={(e) => setLoc2Json(e.target.value)}
                />
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
                <h4>{error ? 'An Error Occurred' : 'AI Suggested Slots'}</h4>
                <div className="time-slots">
                  {isLoading && <p className="time-range">Loading...</p>}
                  {error && <p className="time-range" style={{ color: '#ff6b6b', whiteSpace: 'pre-wrap' }}>{error}</p>}
                  {suggestedSlots.length > 0 && suggestedSlots.map((slot, index) => (
                    <div className="time-slot" key={index}>
                      <div>
                        <p className="participant-name">Option {index + 1}</p>
                        <p className="time-range">
                            Chennai: {new Date(slot.start_chennai).toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                        <p className="time-range">
                            Germany: {new Date(slot.start_germany).toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                      </div>
                      <button onClick={() => handleScheduleClick(slot)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                        Schedule
                      </button>
                    </div>
                  ))}
                  {/* 4. Display the scheduling status message */}
                  {scheduleStatus && <p className="time-range" style={{marginTop: '1rem', fontWeight: 'bold'}}>{scheduleStatus}</p>}
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