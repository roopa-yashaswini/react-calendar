import React, {useState, useContext, useEffect} from 'react'
import styles from './Events.module.css';
import Event from './Event';
import Modal from '../UI/Modal';
import EventContext from '../../store/event-context';
import LoadingGif from '../../assets/loading.gif';
import firebase from '../../utils/firebase';


const Events = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const ctx = useContext(EventContext);

    useEffect(()=>{
        const eventRef = firebase.database().ref('Event');
        eventRef.on('value', (snapshot)=>{
            const data = snapshot.val();
            const eventsList = [];
            for(const key in data){
                eventsList.push({
                    id: key, ...data[key]
                });
            }
            setIsLoading(false);
            ctx.fetchEvents(eventsList);
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