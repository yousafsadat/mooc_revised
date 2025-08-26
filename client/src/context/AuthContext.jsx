import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated login
  const login = async ({ email, password, role }) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUser = { username: email.split("@")[0], email, role };
        setCurrentUser(fakeUser);
        setLoading(false);
        resolve({ success: true, user: fakeUser });
      }, 1000);
    });
  };

  // Simulated register
  const register = async ({ username, email, password, role }) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUser = { username, email, role };
        setCurrentUser(fakeUser);
        setLoading(false);
        resolve({ success: true, user: fakeUser });
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
