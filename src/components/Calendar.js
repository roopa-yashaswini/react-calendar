import React, {useState} from 'react';
// import Modal from './UI/Modal';

import Month from './Month';
const Calendar = () => {
    var dt = new Date();
    var mon = dt.getMonth();
    var yr = dt.getFullYear();

    const [month, setMonth] = useState(mon);
    const [year, setYear] = useState(yr);
    dt = new Date(year, month, 1);
    const start = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();

    let days = [];
    let i=0;
    for(i=0; i<start; i++){
        days.push(-1);
    }
    for(i=0;i<daysInMonth; i++){
        days.push(i+1);
    }
    const goToPrevMonth = () => {
        if(month === 0){
            setYear((prev)=>prev-1);
            setMonth(11);
        }else{
            setMonth((prev_value)=> prev_value - 1);
        }
    };

    const goToNextMonth = () => {
        if(month === 11){
            setYear((prev)=>prev+1);
            setMonth(0);
        }else{
            setMonth((prev_value)=> prev_value + 1);
        }
    }
    return(
        <>
            <Month year={year} month={month} onPrevClick={goToPrevMonth} onNextClick={goToNextMonth} days={days} />
        </>
    );
};

export default Calendar;