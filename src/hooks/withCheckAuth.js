'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import useAuth from './useAuth';

const withCheckAuth = (WrappedComponent) => {
  const CheckAuthWrapper = (props) => {
    const router = useRouter();
    const { authenticated, destination } = useAuth();

    useEffect(() => {
      if (authenticated) {
        // User is authenticated
        console.log(destination, 'destination');
        if (destination) {
          router.replace(destination);
        } else {
          console.log('this one cause issue??');
          router.push('/');
        }
      }
    }, [authenticated, destination]);

    return !authenticated ? <WrappedComponent {...props} /> : null;
  };

  return CheckAuthWrapper;
};

export default withCheckAuth;
