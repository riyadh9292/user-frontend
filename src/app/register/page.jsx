'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import API from '@/api';
import withCheckAuth from '@/hooks/withCheckAuth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    profession: '',
    age: '',
    gender: '',
    about: '',
    video: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Check if the selected file is a video
      if (name === 'video') {
        const file = files[0];
        const isVideo = file.type.startsWith('video/');
        if (!isVideo) {
          setFormErrors({
            ...formErrors,
            video: 'Please select a valid video file',
          });
          return;
        }

        const confirmed = window.confirm('Are you sure you want to upload this video?');
        if (!confirmed) return;

        setFormErrors({ ...formErrors, video: '' });

        // Upload the video file
        const videoUrl = await API.uploadFile(file);
        setFormData({ ...formData, video: videoUrl });
      } else if (name === 'profileImage') {
        // Check if the selected file is an image
        const file = files[0];
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          setFormErrors({
            ...formErrors,
            profileImage: 'Please select a valid image file',
          });
          return;
        }

        setFormErrors({ ...formErrors, profileImage: '' });

        // Upload the image file
        const imageUrl = await API.uploadFile(file);
        setFormData({ ...formData, profileImage: imageUrl });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // File size validation
    const maxImageSize = 5 * 1024 * 1024; // 5 MB in bytes
    const maxVideoSize = 20 * 1024 * 1024; // 20 MB in bytes

    if (formData.profileImage && formData.profileImage.size > maxImageSize) {
      setFormErrors({
        ...formErrors,
        profileImage: 'Profile image size cannot exceed 5 MB',
      });
      return;
    }

    if (formData.video && formData.video.size > maxVideoSize) {
      setFormErrors({ ...formErrors, video: 'Video size cannot exceed 20 MB' });
      return;
    }
    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: 'Passwords do not match',
      });
      return;
    }
    // Form validation
    const errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    // Add more validation rules here for other fields

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Prepare form data to send to backend
    const userData = new FormData();
    userData.append('name', formData.name);
    userData.append('email', formData.email);
    userData.append('username', formData.username);
    userData.append('profileImage', formData.profileImage);
    userData.append('profession', formData.profession);
    userData.append('age', formData.age);
    userData.append('gender', formData.gender);
    userData.append('about', formData.about);
    userData.append('video', formData.video);

    try {
      await API.createUser(formData);
      // Handle successful registration (e.g., redirect to home page)
    } catch (error) {
      // Handle registration error (e.g., display error message to user)
    }
    // Redirect to home page or login page after successful registration
    // router.push('/');
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`mt-1 p-2 focus:outline-none w-full border ${
              formErrors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          <span
            className="absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer"
            onClick={() => handleTogglePasswordVisibility('password')}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-gray-400 hover:text-gray-600"
            />
          </span>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`mt-1 p-2 focus:outline-none w-full border ${
              formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          <span
            className="absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer"
            onClick={() => handleTogglePasswordVisibility('confirmPassword')}
          >
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="text-gray-400 hover:text-gray-600"
            />
          </span>
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Profile Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            required
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.profileImage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.profileImage && (
            <p className="text-red-500 text-sm mt-1">{formErrors.profileImage}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">
            Upload Video
          </label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.video ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.video && <p className="text-red-500 text-sm mt-1">{formErrors.video}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
            Profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.profession ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.profession && (
            <p className="text-red-500 text-sm mt-1">{formErrors.profession}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.age ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.age && <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className={`mt-1 p-2 focus:outline-none w-full border ${formErrors.about ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {formErrors.about && <p className="text-red-500 text-sm mt-1">{formErrors.about}</p>}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-center">
        Already have an account?{' '}
        <Link href="/login">
          <span className="text-blue-500 hover:underline">Login here</span>
        </Link>
      </p>
    </div>
  );
};

export default withCheckAuth(RegisterPage);
