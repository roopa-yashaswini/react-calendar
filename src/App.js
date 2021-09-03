import React from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EventProvider from './store/EventProvider';

function App() {  
  return (
    
    <EventProvider>
      <Calendar />
    </EventProvider>
  );
}

export default App;
