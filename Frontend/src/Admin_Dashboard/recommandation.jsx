import React, { useState } from 'react';
import axios from 'axios';
import JMAN_BG from './JMAN_BG.mp4';
import Sidebar from './Sidebar';
import './recommand.css'

const RECOMMEND = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error state
    setError('');

    try {
      const response = await axios.get(`http://127.0.0.1:5000/recommendations?employee_id=${employeeId}`);
      setRecommendedEvents(response.data.recommended_events);
    } catch (error) {
      setError('Error fetching recommended events: ' + error.message);
    }
  };

  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src={JMAN_BG} type="video/mp4" />
      </video>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ marginRight: 'auto' }}>
          <Sidebar />
        </div>
        <div style={{ flex: '1' }}>
          <div>
            <h1 style={{color:"white"}}>Employee Event Recommendations</h1>
            <form onSubmit={handleSubmit}>
              <label style={{color:"white"}}>
                Enter Employee ID:
                <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
              </label>
              <button type="submit">Get Recommendations</button>
            </form>
            {error && <p>{error}</p>}
            {recommendedEvents.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                  <h2 >Recommended Events:</h2>
                  <ul>
                    {recommendedEvents.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RECOMMEND;
