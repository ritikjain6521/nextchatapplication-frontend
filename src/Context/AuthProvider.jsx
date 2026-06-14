import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Get user from cookies or localStorage
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("user");

  const [user, setUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
