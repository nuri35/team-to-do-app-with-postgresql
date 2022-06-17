import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [ısAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Axios.get(`/api/auth`, { withCredentials: true }).then((res) => {
    //   if (res.data.isAuthInfo) {
    //     setUser(res.data.data);
    //     setIsAuthenticated(res.data.isAuthInfo);
    //   } else {
    //     setUser("");
    //     setIsAuthenticated(res.data.isAuthInfo);
    //   }
    // });
    console.log("clıastıcontext");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, ısAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
