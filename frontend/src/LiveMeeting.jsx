import { useState, useEffect, useRef } from 'react';
import './LiveMeeting.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true; 
  recognition.lang = 'en-US';
}

function LiveMeeting({ onNavigate }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const transcriptRef = useRef('');

  useEffect(() => {
    if (!recognition) {
      setNotes("Sorry, your browser doesn't support live speech recognition.");
      return;
    }

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = transcriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      transcriptRef.current = finalTranscript;
      setTranscript(finalTranscript + interimTranscript);
    };


    recognition.onend = () => {
      if (transcriptRef.current) {
        summarizeTranscript(transcriptRef.current);
      }
      setIsRecording(false);
    };

  }, []);

  const startRecording = () => {
    if (recognition) {
      transcriptRef.current = ''; 
      setTranscript('');
      setNotes('');
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const summarizeTranscript = async (textToSummarize) => {
    setIsLoading(true);
    setNotes('AI is analyzing the transcript...');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/meetings/summarize/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript: textToSummarize })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to get summary.");
        setNotes(data.notes);
    } catch (err) {
        setNotes(`Error: ${err.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="live-meeting-page">
      <header className="dashboard-header"></header>
      <main className="live-meeting-main">
        <div className="live-meeting-container">
          <div className="live-meeting-title">
            <h1>Live Meeting Assistant</h1>
            <p>Start recording to capture the conversation in real-time.</p>
          </div>

          <div className="controls-container">
            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop & Analyze</button>
            {isRecording && <div className="recording-indicator"></div>}
          </div>

          <div className="panels-container">
            <div className="panel">
              <h3>Live Transcript</h3>
              <div className="transcript-box">{transcript || "Waiting to start recording..."}</div>
            </div>
            <div className="panel">
              <h3>AI-Generated Notes</h3>
              <div className="notes-box">{isLoading ? 'AI is analyzing...' : (notes || "Notes will appear here after analysis.")}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LiveMeeting;