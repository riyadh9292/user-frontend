'use client';
import API from '@/api';
import { AuthContext } from '@/contexts/AuthContext';
import useAuth from '@/hooks/useAuth';
import withAuth from '@/hooks/withAuth';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const ProfilePage = () => {
  const { logout } = useAuth();
  const [profileData, setProfileData] = useState({});
  const fetchUserProfile = async () => {
    const result = await API.getUserProfile();
    if (result?.errorMessage) {
      logout();
    }
    console.log(result);
    setProfileData(result);
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{profileData?.name}</h1>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">Profile Views: {profileData?.profileViews}</p>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Online
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={profileData?.profileImage}
              alt={name}
              width={800}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mt-4 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">About Me</h2>
            <p className="text-gray-600 mt-2">{profileData?.about}</p>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Profile Details</h2>
            <ul className="mt-4">
              <li>
                <strong>Username:</strong> {profileData?.username}
              </li>
              <li>
                <strong>Email:</strong> {profileData?.email}
              </li>
              <li>
                <strong>Age:</strong> {profileData?.age}
              </li>
              <li>
                <strong>Gender:</strong> {profileData?.gender}
              </li>
              <li>
                <strong>Profession:</strong> {profileData?.profession}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {profileData?.video && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Featured Video</h2>
          <video
            controls
            className="mt-2 w-full rounded-lg h-[400px]"
            style={{ borderRadius: '0.5rem' }}
          >
            <source src={profileData?.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default withAuth(ProfilePage);
