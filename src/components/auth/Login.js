import React, {useEffect, useContext} from "react";
import {Button} from 'react-bootstrap'
import firebase from '../../utils/firebase';
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import styles from './Login.module.css';
import {db} from '../../utils/firebase';

const Login = (props) => {
    let history = useHistory();
    const ctx = useContext(AuthContext);

    const onClickHandler = async() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        try{
            const user = await firebase.auth().signInWithPopup(provider);
            const existingUser = await db.collection('users').doc(user.user.uid).get();

            if(!existingUser.data()){
                await db.collection('users').doc(user.user.uid).set({
                    displayName: user.user.displayName,
                    email: user.user.email
                });
            }
            
            ctx.setUser(user.user);
            // console.log(user.user.uid);
            history.push('/events');
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              ctx.setUser(user);
            //   db.collection('events').doc(uid).onSnapshot((snapshot)=>{
            //     // const data = snapshot.val();
            //     console.log(snapshot.data().events);
            //     // const eventsList = [];
            //     // for(const key in data){
            //     //     eventsList.push({
            //     //         id: key, ...data[key]
            //     //     });
            //     // }
            //     // setIsLoading(false);
            //     ctx1.fetchEvents(snapshot.data().events);
            //     console.log('fetched');
            // })
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