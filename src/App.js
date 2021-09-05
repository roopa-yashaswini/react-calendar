import React from 'react';
import './App.css';
import Calendar from './components/events/Calendar';
import EventProvider from './store/EventProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() { 

  return (
    <>
    <EventProvider>
      <Calendar />
    </EventProvider>
      {/* <Switch>
        <Route path='/' exact>
          <Redirect to={ctx.user ? '/events' : '/login'} />
        </Route>
        <Route path='/login'>
          {ctx.user ? <Redirect to='/events' /> : <Login /> }
        </Route>
        <Route path='/events'>
          {!ctx.user ? <Redirect to='/login' /> : <Calendar /> }
        </Route>
      </Switch> */}
    </>
    
  );
}

export default App;
