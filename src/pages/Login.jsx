import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({
    username: "admin",
    password: "123456"
  });
  const navigate = useNavigate();

  const login_req = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/login`, data);
      if (response.data.message === "success") {
        localStorage.setItem('token', response.data.token);
        Toastify({
          text: "Login successful",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      Toastify({
        text: err.response?.data?.message || "Login failed. Please try again.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
      <div className='bg-gray-800 w-full max-w-md p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-white text-center mb-6'>Login</h1>
        <form onSubmit={login_req} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className='w-full px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className='w-full px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
            required
          />
          <button
            type="submit"
            className='w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
