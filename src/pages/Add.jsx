import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {

  const AddStudent = async (e) => {
    e.preventDefault();
    const body = {
      fullName: e.target.fullname.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
    };
    try {
      const response = await axios.post(`${api}/add`, body, {
        headers: {
          'token':token
        }
      });
      Toastify({
        text: `Added Successfully`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      navigate('/');
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response?.data?.message || 'Failed to add student. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={AddStudent}
        className="w-full max-w-md p-8 bg-gray-900 shadow-md rounded-lg"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Add Student
        </h1>
        <div className="mb-4">
          <input
            className="w-full bg-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Full Name"
            name="fullname"
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full bg-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            placeholder="Birth Date"
            name="dob"
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full bg-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Address"
            name="address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-white mr-4">Gender:</label>
          <label htmlFor="male" className="text-white mr-2">
            Male
          </label>
          <input
            type="radio"
            id="male"
            name="gender"
            value={0}
            className="mr-4"
            required
          />
          <label htmlFor="female" className="text-white mr-2">
            Female
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value={1}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Add
        </button>
        {isError && (
          <p className="text-red-500 mt-4 text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Add;
