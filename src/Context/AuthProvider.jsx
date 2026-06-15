import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Read the stored user object from localStorage (set during login/signup)
  // Never try to parse the JWT cookie — it's a raw token string, not JSON
  const getInitialUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : undefined;
    } catch {
      localStorage.removeItem("user");
      return undefined;
    }
  };

  const [user, setUser] = useState(getInitialUser);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
