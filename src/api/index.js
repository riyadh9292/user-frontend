import axios from 'axios';

const createUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/create-user`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/sign-in`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`http://localhost:5000/api/upload`, formData, {
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
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle case where token is not available
    return;
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get user details');
  }
};

const API = {
  createUser,
  loginUser,
  uploadFile,
  getUserDetails,
  getAllUsers,
};

export default API;
