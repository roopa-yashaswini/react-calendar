import styles from './Calendar.module.css';



const Day = (props) => {
    const date = new Date();
    const inputDate = new Date(props.year, props.month, props.date);
    let present = null;
    const printDate = props.date === -1 ? '' : props.date;

    if(inputDate.setHours(0,0,0,0) === date.setHours(0,0,0,0)) {
        present = <span className={styles.active}>{printDate}</span>
    }else{
        const selectedDate = new Date(props.year, props.month, props.selected);
        if(inputDate.setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0)){
            present = <span className={styles.selected}>{printDate}</span>
        }
    }

    const onClickHandler = () => {
        props.changeSelected(props.date);
    };
    
    return(
        <li onClick={onClickHandler} key={inputDate}>
            {present ? present : printDate}
        </li>
    );
};

export default Day;