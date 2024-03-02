'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import API from '@/api';
import withAuth from '@/hooks/withAuth';

const UserDetailsPage = () => {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user details from the API using the user ID from the URL query
        const userDetails = await API.getUserDetails(userId);
        setUser(userDetails);
      } catch (error) {
        // Redirect to dashboard or show error message
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-500">Username: @{user?.username}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="w-1/2 mr-10">
              <Image
                src={user?.profileImage}
                alt={user?.name}
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <div className="inline-block bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                <svg
                  className="w-4 h-4 inline-block mr-1 -mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
                {user?.profileViews} views
              </div>
              <p className="text-gray-700">{user?.about}</p>
              <div className="mt-4">
                <p className="text-gray-700">
                  Age: {user?.age} | Gender: {user?.gender}
                </p>
                <p className="text-gray-700">
                  Email: {user?.email} | Profession: {user?.profession}
                </p>
                <p className="text-gray-700">
                  Registered: {format(new Date(user?.createdAt), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Video</h2>
            <video controls className="mt-2 w-full rounded-lg h-[400px]">
              <source src={user?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserDetailsPage);
