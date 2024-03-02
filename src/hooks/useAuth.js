'use client';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { authenticated, login, logout, setDestination, destination } = useContext(AuthContext);
  return { authenticated, login, logout, setDestination, destination };
};

export default useAuth;
