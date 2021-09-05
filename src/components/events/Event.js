import React, {useContext, useState} from 'react';
import styles from './Events.module.css';
import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import EventContext from '../../store/event-context';
import Modal from '../UI/Modal';
import { db } from '../../utils/firebase';
import AuthContext from '../../store/auth-context';

const Event = (props) => {
    const auth = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const ctx = useContext(EventContext);
    const event = {
        id: props.id,
        name: props.name,
        description: props.description,
        date: props.date
    };;
    const deleteEventHandler = async() => {
        const res = await db.collection('events').doc(auth.user.uid).get();
        if (res.data()){
            const events = res.data().events;
            const updatedEvents = events.filter(e => e.id !== props.id);
            await db.collection('events').doc(auth.user.uid)
            .update({
                events: updatedEvents,
            });
            ctx.updateEvent(event);
        }
        ctx.deleteEvent(props.id);
    };

    const showModalHandler = () => {
        setShowModal(true);
    };

    return(
        <>
            <div className={styles['grid-item']} key={props.id}>
                <h2>{props.name}</h2>
                <hr />
                <p>{props.description}</p>
                <div>
                    <button className={styles.edit} onClick={showModalHandler}><FaEdit /></button>
                    <button className={styles.delete} onClick={deleteEventHandler}><MdDelete /></button>
                </div>
            </div>
            {showModal && <Modal onClose={setShowModal} event={event} />}
        </>
    );
};

export default Event;
