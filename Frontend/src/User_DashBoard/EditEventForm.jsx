import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditEventForm.css'
const EditEventForm = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({
    name: '',
    duration: '',
    startDate: '',
    endDate: '',
    description: '',
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
        } else {
          console.error('Failed to fetch event');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (response.ok) {
        console.log('Event updated successfully');
        // Handle success (e.g., redirect to event page)
      } else {
        console.error('Failed to update event');
        // Handle failure
      }
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={event.name} onChange={handleInputChange} />
        </div>
        {/* Add other input fields for event properties */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEventForm;
