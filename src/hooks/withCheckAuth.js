'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';

const withCheckAuth = (WrappedComponent) => {
  const CheckAuthWrapper = (props) => {
    const router = useRouter();
    const { authenticated, destination } = useAuth();

    useEffect(() => {
      if (authenticated) {
        // User is authenticated
        if (destination) {
          router.replace(destination);
        } else {
          router.push('/');
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated, destination]);

    return !authenticated ? <WrappedComponent {...props} /> : null;
  };

  return CheckAuthWrapper;
};

export default withCheckAuth;
