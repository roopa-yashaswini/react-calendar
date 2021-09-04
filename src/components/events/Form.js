import React, {useState, useContext} from 'react';
import styles from './Form.module.css';
import EventContext from '../../store/event-context';
import firebase from '../../utils/firebase';


const Form = (props) => {
    const [nameValid, setNameValid] = useState(true);
    const [descritpionValid, setDescriptionValid] = useState(true);
    const [formValid, setFormValid] = useState(true);
    const ctx = useContext(EventContext);
    let actual = {};
    if(props.event){
        actual = props.event;
    }else{
        actual = {
            name: '',
            description: '',
            date: `${props.date.getFullYear()}/${props.date.getMonth()+1}/${props.date.getDate()}`,
        };
    }
    const [event, setEvent] = useState(actual);

    const submitHandler = (e) => {
        e.preventDefault();
        if(event.name.length === 0 || event.name.trim() === '' || event.description.length === 0 || event.description.trim() === 0){
            setFormValid(false);
            return;
        }
        
        setFormValid(true);
        ctx.addEvent(event);

        const eventRef = firebase.database().ref('Event');
        eventRef.push(event);

        // fetch('https://react-213d3-default-rtdb.firebaseio.com/events.json', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         event: event
        //     }) 
        // });
        setEvent({
            name: '',
            description: '',
        });
        props.onClose();

    }

    const updateHandler = (e) => {
        e.preventDefault();
        if(event.name.length === 0 || event.name.trim() === '' || event.description.length === 0 || event.description.trim() === 0){
            setFormValid(false);
            return;
        }
        
        setFormValid(true);

        const eventRef = firebase.database().ref('Event').child(event.id);
        eventRef.update({
            name: event.name,
            description: event.description
        });
        ctx.updateEvent(event);

        setEvent({
            name: '',
            description: '',
        });
        props.onClose();

    }


    const nameHandler = (e) => {
        if(e.target.value.length === 0 || e.target.value.trim() === ""){
            setNameValid(false);
        }else{
            setNameValid(true);
        }
        setEvent(prev=>{
            return {
                ...prev,
                name: e.target.value
            }
        });
    }

    const descHandler = (e) => {
        if(e.target.value.length === 0 || e.target.value.trim() === ""){
            setDescriptionValid(false);
        }else{
            setDescriptionValid(true);
        }
        setEvent(prev=>{
            return {
                ...prev,
                description: e.target.value
            }
        });
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {!formValid && <h3>Enter valid details</h3>}
                <form className={styles.input} onSubmit={props.event ? updateHandler :submitHandler}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={event.name} onChange={nameHandler} />
                    {!nameValid && <span>Enter the Event title</span>}
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description"  value={event.description} onChange={descHandler} />
                    {!descritpionValid && <span>Enter the Event description</span>}
                    <div className={styles.actions}>
                        <button type='submit' className={styles.submit}>{props.event ? 'Update': 'Create'}</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default Form;