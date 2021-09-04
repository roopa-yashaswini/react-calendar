import React, {useState, useContext}  from 'react'
import styles from './Calendar.module.css';
import Day from './Day';
import Events from './Events';
import {Button} from 'react-bootstrap'
import AuthContext from '../../store/auth-context';
import firebase from '../../utils/firebase';
import { useHistory } from "react-router-dom";
import Login from '../auth/Login';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Month = (props) => {
    const ctx = useContext(AuthContext);
    let history = useHistory();
    const signOutHandler = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('signed out');
            ctx.setUser({});
            history.push('/login');
          }).catch((error) => {
            // An error happened.
          });
    }

    const date = new Date().getDate();
    const [selectedDate, setSelectedDate] = useState(date);
    return(
        <>
            
                <div className={styles.logoutDiv}>
                <Button variant="danger" size="sm" onClick={signOutHandler} >
                        Logout
                    </Button>
                </div>
            
            
            <div className={styles.month}>
                <ul>
                    <li className={styles.prev}><button onClick={props.onPrevClick}>&#10094;</button></li>
                    <li className={styles.next}><button onClick={props.onNextClick}>&#10095;</button></li>
                    <li>
                        {months[props.month]}<br />
                        <span>{props.year}</span>
                    </li>
                </ul>
            </div>
            <ul className={styles.weekdays}>
                <li>Su</li>
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
            </ul>

            <ul className={styles.days}>
                {
                    props.days.map((day) =>{
                        return <Day date={day} month={props.month} year={props.year} selected={selectedDate} changeSelected={setSelectedDate} key={Math.random()} />
                    })
                }
            </ul>
            {ctx.user ? <Events selectedDate={selectedDate} month={props.month} year={props.year} /> : <Login />}
        </>
    );
};

export default Month;