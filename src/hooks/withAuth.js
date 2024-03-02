import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './useAuth';

const withAuth = (Component) => {
  const Wrapper = (props) => {
    const { authenticated, setDestination } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!authenticated) {
        console.log('path name should be setted as', pathname);
        setDestination(pathname);
        router.push('/login');
      }
    }, [authenticated, router, setDestination]);

    if (!authenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;
