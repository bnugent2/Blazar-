import React, { useEffect, useState } from "react";
    import {firebase} from "./firebase.js";
    import CircularProgress from '@material-ui/core/CircularProgress'
    export const AuthContext = React.createContext();

     const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
     }
    export const AuthProvider = ({ children }) => {
      const [currentUser, setCurrentUser] = useState(null);
      const [pending, setPending] = useState(true);
      useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
          setCurrentUser(user)
          setPending(false)
        });
      }, []);
      if(pending){
        return <CircularProgress style={style} />
      }
      return (
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          {children}
        </AuthContext.Provider>
      );
    };