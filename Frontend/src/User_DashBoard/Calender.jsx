import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../Admin_Dashboard/Sidebar';
import JMAN_BG from './JMAN_BG.mp4'

const CustomEventComponent = ({ event }) => {
  return (
    
    <div>
      <strong>{event.title}</strong>
      <p>Capacity: {event.capacity}</p>
    </div>
  );
};

const localizer = momentLocalizer(moment);

const BigCalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (response.ok) {
          const eventData = await response.json();
          const formattedEvents = eventData.map(event => ({
            id: event._id,
            title: event.name,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            allDay: true,
            resource: event.mode === 'offline' ? 'Offline Event' : 'Online Event',
            capacity: event.total_capacity,
            remainingCount: event.total_capacity - event.registeredCount,
          }));
          setEvents(formattedEvents);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = event => {
    console.log('Selected Event:', event);
  };

  const handleSelectSlot = slotInfo => {
    console.log('Selected Slot:', slotInfo);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#007bff'; // Default blue color for online events
    
    if (event.resource === 'Offline Event') {
      backgroundColor = '#dc3545'; // Red color for offline events
    }

    return {
      style: {
        backgroundColor: backgroundColor,
        color: '#ffffff',
        borderRadius: '5px',
        border: 'none',
      },
    };
  };

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div style={{ display: 'flex',  height: '100vh' }}>
      <div style={{ marginRight: 'auto' }}>
        <Sidebar />
      </div>
      <div style={{ flex: '1'}}>
    <div className="calendar-page">
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color offline-color"></span>
          <span className="legend-text" style={{color:"white"}}>Offline Event</span>
        </div>
        <div className="legend-item">
          <span className="legend-color online-color"></span>
          <span className="legend-text" style={{color:"white"}}>Online Event</span>
        </div>
      </div>
      <div className="calendar-container">
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            eventPropGetter={eventStyleGetter}
            components={{
              event: CustomEventComponent,
            }}
          />
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default BigCalendarComponent;



