import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {

  const [data, setData] = useState({
    fullName: '',
    dob: '',
    address: '',
    gender: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(api+`/view/${id}`,{
          headers:{
            'token':token
          }
        });
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudent();
  }, [id]);

  const updateStudent = async (e) => {
    e.preventDefault();
    const body = {
      fullName: data.fullName,
      dob: data.dob,
      address: data.address,
      gender: data.gender,
    };

    try {
      await axios.post(api+`/edit/${id}`, body,{
        headers:{
          'token':state.token[0]
        }
      });
      Toastify({
        text: "Updated successfully",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      navigate('/');
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={updateStudent}
        className="w-full max-w-md p-8 bg-gray-900 shadow-md rounded-lg"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Edit Student
        </h1>
        <div className="mb-4">
          <input
            className="w-full bg-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Full Name"
            name="fullname"
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            value={data.fullName}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full bg-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            placeholder="Birth Date"
            name="dob"
            onChange={(e) => setData({ ...data, dob: e.target.value })}
            value={data.dob}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full bg-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Address"
            name="address"
            onChange={(e) => setData({ ...data, address: e.target.value })}
            value={data.address}
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
            checked={data.gender == 0}
            onChange={() => setData({ ...data, gender: 0 })}
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
            checked={data.gender === 1}
            onChange={() => setData({ ...data, gender: 1 })}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Update
        </button>
      
      </form>
    </div>
  );
}

export default Edit;
