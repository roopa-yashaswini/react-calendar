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
    const eventContext = {
        events: eventState.events,
        addEvent: addEvent,
        fetchEvents: fetchEvents
    }
    return(
        <EventContext.Provider value={eventContext}>
            {props.children}
        </EventContext.Provider>
    );
};

export default EventProvider;