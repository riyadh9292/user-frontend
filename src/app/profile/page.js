'use client';
import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';

const ProfilePage = () => {
  const { authenticated, logout } = useContext(AuthContext);

  //   if (!authenticated) {
  //     // Redirect to login page if user is not authenticated
  //     return <Redirect to="/login" />;
  //   }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <div className="flex flex-col items-center">
        {/* User's profile picture */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          className="rounded-full h-24 w-24 mb-4"
        />
        {/* User's name */}
        <h2 className="text-xl font-semibold mb-2">John Doe</h2>
        {/* User's email */}
        <p className="text-gray-600 mb-4">john.doe@example.com</p>
        {/* Button to logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
