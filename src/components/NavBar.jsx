'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const router = usePathname();
  const { authenticated, logout } = useAuth();

  const handleLogout = () => {
    // Perform logout logic
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-screen">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <span
              className={`text-white text-xl font-bold ${router === '/' ? 'active' : ''}`}
            >
              MyApp
            </span>
          </Link>
        </div>
        <div>
          {authenticated ? (
            <>
              <Link href="/profile">
                <span
                  className={`text-white hover:text-gray-300 mr-4 ${router === '/profile' ? 'active' : ''}`}
                >
                  Profile
                </span>
              </Link>
              <button
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <span
                  className={`text-white hover:text-gray-300 mr-4 ${router === '/login' ? 'active' : ''}`}
                >
                  Login
                </span>
              </Link>
              <Link href="/register">
                <span
                  className={`text-white hover:text-gray-300 ${router === '/register' ? 'active' : ''}`}
                >
                  Register
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
