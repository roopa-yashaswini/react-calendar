import React, {useState} from 'react'
import styles from './Calendar.module.css';
import Day from './Day';
import Events from './Events';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Month = (props) => {
    const date = new Date().getDate();
    const [selectedDate, setSelectedDate] = useState(date);
    return(
        <>
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
            <Events selectedDate={selectedDate} month={props.month} year={props.year} />
        </>
    );
};

export default Month;