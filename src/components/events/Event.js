import React, {useContext, useState} from 'react';
import styles from './Events.module.css';
import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import firebase from '../../utils/firebase';
import EventContext from '../../store/event-context';
import Modal from '../UI/Modal';

const Event = (props) => {
    const [showModal, setShowModal] = useState(false);
    const ctx = useContext(EventContext);
    const event = {
        id: props.id,
        name: props.name,
        description: props.description,
        date: props.date
    };;
    const deleteEventHandler = () => {
        const eventRef = firebase.database().ref('Event').child(props.id);
        eventRef.remove();
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
