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
        console.log('this one redirects??');
        router.push(destination);
        setDestination(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    console.log(destination, 'destination is calling');
    if (destination) {
      console.log('destination is foundf but router not working');
      router.replace(destination);
    } else {
      console.log('else one is causing the issue');
      router.push('/');
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    console.log('or logout cause issue??');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, logout, login, setDestination, destination }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return cookie.split('=')[1];
    }
  }
  return null;
};

const removeCookie = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
