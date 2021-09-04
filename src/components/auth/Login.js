import React, {useEffect, useContext} from "react";
import {Container, Button} from 'react-bootstrap'
import firebase from '../../utils/firebase';
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import styles from './Login.module.css';

const Login = (props) => {
    let history = useHistory();
    const ctx = useContext(AuthContext);
    const onClickHandler = async() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        try{
            const user = await firebase.auth().signInWithPopup(provider);
            ctx.setUser(user.user);
            console.log(user.user.uid);
            history.push('/events');
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              ctx.setUser(user);
            }
          });
    }, [])

    return (
        <>
            {/* <Container className="mx-auto my-auto text-center"> */}
                <div className = {`justify-content-center  text-center p-4 ${styles.height}`} >
                <Button variant="primary" size="lg" onClick={onClickHandler} className={styles.btn} >
                    Sign in with Google
                </Button>
                </div>
                
                
            {/* </Container> */}
        </>
    );
};

export default Login;