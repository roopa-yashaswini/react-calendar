import React from 'react';

const AuthContext = React.createContext({
    user: null,
    setUser: (user)=>{}
});


export default AuthContext;