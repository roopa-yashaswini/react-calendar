import React, {useState, useReducer} from "react";
import AuthContext from "./auth-context";

const defaultAuthState = {
    user: null
};

const authReducer = (state, action) => {
    if(action.type === 'ADD_USER'){
        let inputUser = action.user;
        return{
            user: inputUser
        }
    }
    return defaultAuthState;
};


const AuthProvider = (props) => {
    const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
    const setUser = (user) => {
        authDispatch({type : 'ADD_USER', user: user});
    };
    const authContext = {
        user: authState.user,
        setUser: setUser
    };
    return(
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;