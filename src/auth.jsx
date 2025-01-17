import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    setUser({ email });
    navigate('/find-my-match');
  };

  const signup = (email, password) => {
    setUser({ email });
    navigate('/intro-quiz');
  };

  const logout = () => {
    setUser(null);
    navigate('/signin');
  };

  const value = { user, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);