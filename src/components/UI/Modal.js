import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Form from '../Form';

const Backdrop = (props) => {
    return(
        <div className={styles.backdrop} onClick={props.onClose}>

        </div>
    );
}

const Modal = (props) => {
    const closeModal = () => {
        props.onClose(false);
    }
    return (
        <>
             {ReactDOM.createPortal(<Backdrop onClose={closeModal}  />, document.getElementById('backdrop-root'))} 
             {ReactDOM.createPortal(<Form date={props.date} onClose={closeModal}></Form>,
                                        document.getElementById('modal-root')
                                    )
             } 
        </>
    );
};

export default Modal;