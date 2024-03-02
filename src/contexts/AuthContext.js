'use client';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
      if (destination) {
        router.push(destination);
        setDestination(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    if (destination) {
      router.replace(destination);
    } else {
      router.push('/');
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ authenticated, logout, login, setDestination, destination }}>
      {children}
    </AuthContext.Provider>
  );
};
