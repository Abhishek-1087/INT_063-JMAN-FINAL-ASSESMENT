import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Admin_Dashboard/Sidebar';
import axios from 'axios';
import JMAN_BG from './JMAN_BG.mp4';
import './Events.css'

const Event = () => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEvent, setEditingEvent] = useState(null);
  const [updatedEventInfo, setUpdatedEventInfo] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [eventsPerPage, setEventsPerPage] = useState(8); // Initial value
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/userData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            token: window.localStorage.getItem('token'),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        if (data && data.data && data.data.userType === 'Admin') {
          setAdmin(true);
        } else {
          setAdmin(false);
        }

        setUserData(data.data);
        setEmail(data.data.email);
        setRole(data.data.userType);

        if (data && data.data && data.data === 'token expired') {
          alert('Token expired, please log in again');
          window.localStorage.clear();
          navigate('/sign-in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events', {
          params: { email },
        });

        if (response.status === 200) {
          const eventData = response.data;
          setEvents(eventData);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [email]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/registeredEvents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            email: userData.email,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setRegisteredEvents(data.registeredEvents);
        } else {
          console.error('Failed to fetch registered events');
        }
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    if (userData) {
      fetchRegisteredEvents();
    }
  }, [userData]);

  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of events per page based on the screen width
      if (window.innerWidth < 768) {
        setEventsPerPage(4);
      } else {
        setEventsPerPage(8);
      }
    };

    // Call handleResize on initial load and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleEditEvent = (eventId) => {
    setEditingEvent(eventId);
    const eventToEdit = events.find((event) => event._id === eventId);
    if (eventToEdit) {
      setUpdatedEventInfo(eventToEdit);
      setShowEditForm(true);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Event deleted successfully');
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleChange = (e) => {
    setUpdatedEventInfo({ ...updatedEventInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/events/${editingEvent}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEventInfo),
      });

      if (response.ok) {
        console.log('Event updated successfully');
        const updatedEventData = await fetch(`http://localhost:5000/events/${editingEvent}`);
        if (updatedEventData.ok) {
          const updatedEvent = await updatedEventData.json();
          setEvents((prevEvents) =>
            prevEvents.map((event) => (event._id === editingEvent ? updatedEvent : event))
          );
        } else {
          console.error('Failed to fetch updated event data');
        }
        setEditingEvent(null);
        setShowEditForm(false);
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleRegister = async (eventId, totalCapacity) => {
    try {
      if (totalCapacity === 0) {
        return;
      }

      const registerResponse = await axios.post(`http://localhost:5000/events/register/${eventId}`, {
        email: userData.email,
      });

      if (registerResponse.status === 200) {
        console.log('User registered for event successfully');
        setRegisteredEvents((prevRegisteredEvents) => [...prevRegisteredEvents, eventId]);

        setEvents((prevEvents) =>
          prevEvents.map((event) => {
            if (event._id === eventId) {
              return { ...event, total_capacity: event.total_capacity - 1 };
            }
            return event;
          })
        );

        const updatedCapacity = totalCapacity - 1;
        const updateCapacityResponse = await axios.put(`http://localhost:5000/events/${eventId}`, {
          total_capacity: updatedCapacity,
        });

        if (updateCapacityResponse.status === 200) {
          console.log('Event capacity updated successfully in the backend');
        } else {
          console.error('Failed to update event capacity in the backend');
        }
      } else {
        console.error('Failed to register user for event');
      }
    } catch (error) {
      console.error('Error registering user for event:', error);
    }
  };

  if (userData === null) {
    return <div>Loading...</div>;
  }

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

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
            <div className="white-card">
              <div className="navbar-container"></div>
              <h2>Events</h2>
              <div className="event-container1">
                {currentEvents.map((event, index) => (
                  <div key={index} className="event-card1">
                    <h3>{event.name}</h3>
                    <p><strong>Start Date:</strong> {formatDate(event.startDate)}</p>
                    <p><strong>End Date:</strong> {formatDate(event.endDate)}</p>
                    <p><strong>Total Capacity left :</strong> {event.total_capacity}</p>
                    <p><strong>Trainee Name:</strong> {event.Trainee_Name}</p>
                    <p><strong>Mode of Course:</strong> {event.mode}</p>
                    {event.mode === "online" && <p><strong>Meeting Link:</strong> {event.meetingLink}</p>}
                    {event.mode === "offline" && <p><strong>Venue:</strong> {event.venue}</p>}
                    <div>
                      {role === 'Admin' && (
                        <>
                          <button className="btn" type="button" onClick={() => handleEditEvent(event._id)}>Edit</button>
                          <button className="btn" type="button" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                        </>
                      )}
                      {registeredEvents.includes(event._id) ? (
                        <button className="btn" type="button" disabled>Registered</button>
                      ) : event.total_capacity === 0 ? (
                        <button className="btn" type="button" disabled>Event Full</button>
                      ) : (
                        <button className="btn" type="button" onClick={() => handleRegister(event._id, event.total_capacity)}>Register</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(events.length / eventsPerPage)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        {showEditForm && (
          <div className="edit-form-popup">
            <div className="edit-form-content">
              <h2>Edit Event</h2>
              <input type="text" value={updatedEventInfo.name} name="name" onChange={handleChange} />
              <input type="date" value={updatedEventInfo.startDate} name="startDate" onChange={handleChange} />
              <input type="date" value={updatedEventInfo.endDate} name="endDate" onChange={handleChange} />
              <input type="number" value={updatedEventInfo.total_capacity} name="total_capacity" onChange={handleChange} />
              <input type="text" value={updatedEventInfo.Trainee_Name} name="Trainee_Name" onChange={handleChange} />
              <input type="text" value={updatedEventInfo.mode} name="mode" onChange={handleChange} />
              {updatedEventInfo.mode === "online" && <input type="text" value={updatedEventInfo.meetingLink} name="meetingLink" onChange={handleChange} />}
              {updatedEventInfo.mode === "offline" && <input type="text" value={updatedEventInfo.venue} name="venue" onChange={handleChange} />}
              <button className="btn" onClick={handleSave}>Save</button>
              <button className="btn" onClick={() => setShowEditForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
