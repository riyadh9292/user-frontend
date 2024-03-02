import { getToken } from '@/utils';
import axios from 'axios';
const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/create-user`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/sign-in`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const getUserProfile = async () => {
  const token = getToken();
  if (!token) {
    // Handle case where token is not available
    return;
  }
  try {
    const response = await axios.get(`${apiBaseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.message === 'jwt expired') {
      return { errorMessage: error.response.data.message };
    }
    throw new Error('Failed to fetch users');
  }
};

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${apiBaseUrl}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};

const getUserDetails = async (userId) => {
  const token = getToken();
  if (!token) {
    return;
  }

  try {
    const response = await axios.get(`${apiBaseUrl}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.message === 'jwt expired') {
      return { errorMessage: error.response.data.message };
    }
    throw new Error('Failed to get user details');
  }
};

const API = {
  createUser,
  loginUser,
  uploadFile,
  getUserDetails,
  getAllUsers,
  getUserProfile,
};

export default API;
