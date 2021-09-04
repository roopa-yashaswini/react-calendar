import React from 'react';

const EventContext = React.createContext({
    events: [],
    addEvent: (event) => {},
    fetchEvents: (events) => {},
    deleteEvent: (eventId)=>{},
    updateEvent: (event)=>{}
});


export default EventContext;