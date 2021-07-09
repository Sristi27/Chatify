import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./../Firebase/firebase";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

//manage users daata
//function to grab context
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user); // setting user data from the login from firebasse authentciation
      setLoading(false);
      if (user) history.push("/chats");
    });
  }, [user, history]);

  //[]->dependancy arrray

  if (loading)
    return (
      <div>
        <div className="loader">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  //value object for context
  const value = { user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
