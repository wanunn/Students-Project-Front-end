import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [openRow, setOpenRow] = useState(null);

  const handleDropdown = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };
  const del = async (id) => {
    try {
      const res = await axios.get(api + `/delete/${id}`, {
        headers: {
          'token': token
        }
      });
      if (res.status === 200) {
        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        fetchStudents();
      }
    } catch (err) {
      alert(err);
    }
  };

  const userPermission = async (id, action) => {
    try {
      const res = await axios.get(api + `/action/${id}/${action}`, {
        headers: {
          'token': token
        }
      });
      if (res.status === 200) {
        Toastify({
          text: `${action} Successfully`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        fetchStudents();
      }
    } catch (err) {
      alert(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(api + '/students', {
        headers: {
          'token': token
        }
      });
      setData(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  },[]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
      <Link to='/add' className='absolute top-0 right-0 text-nowrap'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded absolute top-2 right-2'>Add new</button>
      </Link>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Birth date</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">Gender</th>
            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.id}
              </th>
              <td className="px-6 py-4">{item.fullName}</td>
              <td className="px-6 py-4">{item.dob}</td>
              <td className="px-6 py-4">{item.address}</td>
              <td className="px-6 py-4">{item.gender}</td>
              <td className="px-6 py-4 text-right relative">
                <button
                  className='bg-[#cfcec9] w-14 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-black hover:bg-[#aca9a9] m-1'
                  onClick={() => handleDropdown(item.id)}
                >
                  {openRow === item.id ? 'Close' : 'action'}
                </button>
                {openRow === item.id && (
                  <div className="absolute right-0  mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <Link to={`/view/${item.id}`}>
                      <button className='bg-green-500 w-full rounded-t-lg text-white font-bold py-2 hover:bg-green-600'>
                        View
                      </button>
                    </Link>
                    <Link to={`/edit/${item.id}`}>
                      <button className='bg-blue-500 w-full text-white font-bold py-2 hover:bg-blue-600'>
                        Edit
                      </button>
                    </Link>
                    <button className='bg-yellow-400 w-full text-white font-bold py-2 hover:bg-yellow-500' onClick={() => del(item.id)}>
                      Delete
                    </button>
                    {item.active ? (
                      <button className='bg-red-500 w-full rounded-b-lg text-white font-bold py-2 hover:bg-red-600'
                        onClick={() => userPermission(item.id, "block")}>
                        Block
                      </button>
                    ) : (
                      <button className='bg-green-500 w-full rounded-b-lg text-white font-bold py-2 hover:bg-green-600'
                        onClick={() => userPermission(item.id, "unblock")}>
                        Unblock
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
