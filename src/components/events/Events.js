import React, {useState, useContext, useEffect} from 'react'
import styles from './Events.module.css';
import Event from './Event';
import Modal from '../UI/Modal';
import EventContext from '../../store/event-context';
import LoadingGif from '../../assets/loading.gif';
import {db} from '../../utils/firebase';
import AuthContext from '../../store/auth-context';


const Events = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const ctx = useContext(EventContext);
    const auth = useContext(AuthContext);

    useEffect(()=>{
      db.collection('events').doc(auth.user.uid).onSnapshot((snapshot)=>{
            setIsLoading(false);
            ctx.fetchEvents(snapshot.data().events);
        })
    }, []);

    const createEventHandler = () => {
        setShowModal(true);
    };

    const date = new Date(props.year, props.month, props.selectedDate);
    
    const filtered = ctx.events.filter(e=> new Date(e.date).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0));

    if(isLoading){
        return(
            <div className={styles.eventAddDiv}>
                <img src={LoadingGif} alt="loading" />
            </div>
        );
    }

    return (
        <>
            <div className={styles.eventAddDiv}>
                <button className={styles.btn} onClick={createEventHandler}>Add Event</button>
            </div>
            <div className={styles['grid-container']}>
                {filtered.map(event=>{
                    return <Event id={event.id} date={event.date} name={event.name} description={event.description} key={event.id} />
                })}
            </div>
            {showModal && <Modal onClose={setShowModal} date={date} />}
        </>
    );
};

export default Events;