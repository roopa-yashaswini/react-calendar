import React, {useState, useContext, useEffect} from 'react'
import styles from './Events.module.css';
import Event from './Event';
import Modal from './UI/Modal';
import EventContext from '../store/event-context';
import LoadingGif from '../../src/assets/loading.gif';

const fetchAPI = async(fetchEvents, setIsLoading) => {
    const result = await fetch('https://react-213d3-default-rtdb.firebaseio.com/events.json');
    const data = await result.json();
    const loadedEvents = [];
    for(const key in data){
      loadedEvents.push({
        id: key,
        name: data[key].event.name,
        description: data[key].event.description,
        date: data[key].event.date
      });
    }
    setIsLoading(false);
    fetchEvents(loadedEvents);
}

const Events = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const ctx = useContext(EventContext);

    useEffect(()=>{
        fetchAPI(ctx.fetchEvents, setIsLoading);
    }, []);
    const showModalHandler = () => {
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
                <button className={styles.btn} onClick={showModalHandler}>Add Event</button>
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