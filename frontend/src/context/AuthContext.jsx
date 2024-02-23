import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  
    const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    //TO DO
    const res = axios.post("http://localhost:8800/api/auth/login",inputs,{
      withCredentials:true,
    });
setCurrentUser((await res).data)
  };

  useEffect(() => {
    
    localStorage.setItem("user", JSON.stringify(currentUser));
    //console.log('currentUser:', currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
