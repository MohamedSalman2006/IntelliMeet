import { useState } from 'react'; // Import React's state management hook
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
  // --- STATE MANAGEMENT ---
  // State for the JSON input from the text areas
  const [loc1Json, setLoc1Json] = useState(sampleLoc1Json);
  const [loc2Json, setLoc2Json] = useState(sampleLoc2Json);
  
  // State for the API response
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSlots, setSuggestedSlots] = useState([]);
  const [error, setError] = useState('');

  // --- API CALL FUNCTION ---
  const handleSuggestTime = async () => {
    setIsLoading(true);
    setError('');
    setSuggestedSlots([]);

    try {
      // Parse the text from the text areas into JSON objects
      const loc1Data = JSON.parse(loc1Json);
      const loc2Data = JSON.parse(loc2Json);

      const requestPayload = {
        loc1: loc1Data,
        loc2: loc2Data,
        duration_minutes: 60
      };

      // The API call to your Django backend
      const response = await fetch('http://127.0.0.1:8000/api/meetings/suggest-slots/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An unknown error occurred.");
      }
      
      setSuggestedSlots(data.suggested_slots);

    } catch (err) {
      setError(`Failed to get suggestions. Please check if the JSON is valid. Error: ${err.message}`);
    } finally {
      setIsLoading(false);
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
              {/* --- NEW: Interactive Form with Text Areas --- */}
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
                  {/* --- RENDER API RESULTS DYNAMICALLY --- */}
                  {isLoading && <p className="time-range">Loading...</p>}
                  {error && <p className="time-range" style={{ color: '#ff6b6b', whiteSpace: 'pre-wrap' }}>{error}</p>}
                  {suggestedSlots.length > 0 ? (
                    suggestedSlots.map((slot, index) => (
                      <div className="time-slot" key={index}>
                        <div>
                          <p className="participant-name">Option {index + 1}: {new Date(slot.start_utc).toDateString()}</p>
                          <p className="time-range">{slot.start_chennai.split('T')[0] ? 'Chennai:' : ''} {new Date(slot.start_chennai).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          <p className="time-range">{slot.start_germany.split('T')[0] ? 'Germany:' : ''} {new Date(slot.start_germany).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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