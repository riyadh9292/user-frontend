'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/api';
import Image from 'next/image';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await API.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 p-4 rounded-lg">
            <Image
              src={user.profileImage}
              alt={user.name}
              width={300} // Adjust width and height as needed
              height={200}
              className="w-full h-40 object-cover mb-2 rounded-lg"
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <Link href={`/users/${user.id}`}>
              <span className="mt-2 text-blue-600 hover:underline">View Profile</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
