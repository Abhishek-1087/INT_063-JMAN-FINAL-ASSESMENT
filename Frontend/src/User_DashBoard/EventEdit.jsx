import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventEdit = () => {
  const { eventId } = useParams(); // Get eventId from URL params
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    total_capacity: 0,
    Trainee_Name: '',
    mode: '',
    meetingLink: '',
    venue: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
          // Set form data with existing event data
          setFormData({
            name: eventData.name,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            total_capacity: eventData.total_capacity,
            Trainee_Name: eventData.Trainee_Name,
            mode: eventData.mode,
            meetingLink: eventData.meetingLink || '',
            venue: eventData.venue || ''
          });
        } else {
          console.error('Failed to fetch event');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Event updated successfully');
        navigate('/events'); // Navigate back to events page after editing
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="total_capacity">Total Capacity:</label>
          <input type="number" name="total_capacity" id="total_capacity" value={formData.total_capacity} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Trainee_Name">Trainee Name:</label>
          <textarea name="Trainee_Name" id="Trainee_Name" value={formData.Trainee_Name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="mode">Mode:</label>
          <select name="mode" id="mode" value={formData.mode} onChange={handleChange}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        {formData.mode === 'online' && (
          <div>
            <label htmlFor="meetingLink">Meeting Link:</label>
            <input type="text" name="meetingLink" id="meetingLink" value={formData.meetingLink} onChange={handleChange} />
          </div>
        )}
        {formData.mode === 'offline' && (
          <div>
            <label htmlFor="venue">Venue:</label>
            <input type="text" name="venue" id="venue" value={formData.venue} onChange={handleChange} />
          </div>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EventEdit;
