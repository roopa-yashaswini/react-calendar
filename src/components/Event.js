import React, {useContext} from 'react';
import styles from './Events.module.css';


const Event = (props) => {
    return(
        <div className={styles['grid-item']} key={props.id}>
            <h2>{props.name}</h2>
            <hr />
            <p>{props.description}</p>
        </div>
    );
};

export default Event;
