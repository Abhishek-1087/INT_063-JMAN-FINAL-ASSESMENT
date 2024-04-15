import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './make_event.css';
import JMAN_BG from './JMAN_BG.mp4'

const CreateEventForm = () => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    total_capacity: 0,
    startDate: '',
    endDate: '', 
    Trainee_Name: '',
    mode: 'Select',
    meetingLink: '',
    venue: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'total_capacity' ? parseInt(value) : value;
    setNewEvent({ ...newEvent, [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/CreateEventForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      if (response.ok) {
        console.log('Event created successfully');
      } else {
        console.error('Failed to create event');
      }

      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div style={{ display:"flex", height: '100vh' }}>
      <div >
        <Sidebar />
      </div>
    <div  style={{ display:"flex", width:'90%',height:"90%",alignItems:"center",justifyContent:"center"}}>

      <div className="form-container" style = {{borderRadius:"3%"}}>
        <form onSubmit={handleSubmit}>
          <h2>Create Event</h2>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input type="date" name="startDate" value={newEvent.startDate} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input type="date" name="endDate" value={newEvent.endDate} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Capacity Left:</label>
            <input type="number" name="total_capacity" value={newEvent.total_capacity} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Trainee Name :</label>
            <textarea name="Trainee_Name" value={newEvent.Trainee_Name} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group">
            <label>Mode of Course:</label>
            <select name="mode" value={newEvent.mode} onChange={handleInputChange}>
              <option>Select</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option> 
            </select>
          </div>
          {newEvent.mode === "online" && (
            <div className="form-group">
              <label>Meeting Link:</label>
              <input type="text" name="meetingLink" value={newEvent.meetingLink} onChange={handleInputChange} />
            </div>
          )}
          {newEvent.mode === "offline" && (
            <div className="form-group">
              <label>Venue:</label>
              <input type="text" name="venue" value={newEvent.venue} onChange={handleInputChange} />
            </div>
          )}
          <button type="submit">Create</button>
        </form>
      </div>
      </div>
    </div>
    </>
  );
};

export default CreateEventForm;
