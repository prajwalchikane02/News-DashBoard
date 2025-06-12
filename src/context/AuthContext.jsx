import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '../services/auth';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Use useMemo to recalculate isAdmin when currentUser changes
  const isAdmin = useMemo(() => {
    return currentUser?.email === 'prajwalchikane0@gmail.com';
  }, [currentUser]);

  const value = {
    currentUser,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
