import React from 'react';

const EventContext = React.createContext({
    events: [],
    addEvent: (event) => {},
    fetchEvents: (events) => {}
});


export default EventContext;