import { useReducer } from "react";
import EventContext from "./event-context";

const defaultEventState = {
    events: []
};

const eventReducer = (state, action) => {
    if(action.type === 'ADD_EVENT'){
        let updatedEvents = state.events.concat(action.event);
        return{
            events: updatedEvents
        }
    }else if(action.type === 'FETCH'){
        let fetchedEvents = action.events;
        return {
            events: fetchedEvents
        }
    }else if(action.type === 'DELETE'){
        let updatedEvents = state.events.filter(event=> event.id !== action.id);
        return {
            events: updatedEvents
        }
    }else if(action.type === 'UPDATE'){
        let updatedEvents = state.events;
        const index = updatedEvents.findIndex(event=>event.id === action.event.id);
        updatedEvents[index] = action.event;
        return {
            events: updatedEvents
        }
    }
    return defaultEventState;
};

const EventProvider = (props) => {
    const [eventState, eventDispatch] = useReducer(eventReducer, defaultEventState);
    const addEvent = (event) => {
        eventDispatch({type: 'ADD_EVENT', event: event})
    }
    const fetchEvents = (events) => {
        eventDispatch({type: 'FETCH', events:events});
    }
    const deleteEvent = (id) => {
        eventDispatch({type: 'DELETE', id: id});
    };

    const updateEvent = (event) => {
        eventDispatch({type: 'DELETE', event: event});
    };

    const eventContext = {
        events: eventState.events,
        addEvent: addEvent,
        fetchEvents: fetchEvents,
        deleteEvent: deleteEvent,
        updateEvent: updateEvent
    }
    return(
        <EventContext.Provider value={eventContext}>
            {props.children}
        </EventContext.Provider>
    );
};

export default EventProvider;