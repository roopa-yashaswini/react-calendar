import React, {useContext, useEffect} from 'react';
import './App.css';
import Calendar from './components/events/Calendar';
import EventProvider from './store/EventProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth/Login';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthContext from './store/auth-context';
import context from 'react-bootstrap/esm/AccordionContext';

function App() { 
  const ctx = useContext(AuthContext);

  return (
    <>
      <Calendar />
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
