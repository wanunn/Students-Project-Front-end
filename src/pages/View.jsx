import axios from 'axios'
import React, { useEffect, useState, useContext} from 'react'
import { useNavigate, useParams, Link} from 'react-router-dom'


function View() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const { id } = useParams();

  const student = async() => {
   
     const response = await axios.get(api+`/view/${id}`,{
      headers:{
        'token':token
      }
    })
    setData(response.data[0])
  }
  const del = async(id) => {
    await axios.get(api+`/delete/${id}`,{
      headers:{
        'token':token
      }
    }).then((res) => {
      if (res.status === 200) {
       
        Toastify({
          text: "Deleted successfully",
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
        navigate("/");
        student();
      }
    }).catch
    ((err) => {
      alert(err)
    })
  }
  const userPermisson = async(id,action) => {
    await axios.get(api+`/action/${id}/${action}`,{
      headers:{
        'token':token
      }
    }).then((res) => {
      if (res.status === 200) {
        
        Toastify({
          text: `${action} Successfully`,
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
        student();
      }
    }).catch
    ((err) => {
      alert(err)
    })
  }

  useEffect(() => {
    student();
  },[id])


  return (
   
<div className="flex justify-center items-start mt-10 h-screen">
<div className="w-[420px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  ">


  <div className=' w-[400px] overflow-hidden block h-[340px] absolute z-0 rounded-xl' onClick={() => setIsOpen(isOpen?false:false)}></div>
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className={`inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 ${isOpen?"hidden":""} z-10`} type="button" onClick={() => setIsOpen(isOpen?false:true)}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" className={`z-10 ${isOpen ? "" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
            <Link to={`/edit/${data.id}`}>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </Link>
            </li>
         
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => del(data.id)}>Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.gender==0?"/src/assets/male.png":"/src/assets/female.png"}alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.fullName}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{data.dob}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{data.address}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{data.gender==0?"Male":"Female"}</span>
        <div className="flex mt-4 md:mt-6 gap-10">
         {
          data.active?(            <a href="#" className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer ${isOpen?"":"z-10"}`}  onClick={() => userPermisson(data.id,"block")}>Block</a>):(
            <a href="#" className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer ${isOpen?"":"z-10"}`} onClick={() => userPermisson(data.id,"unblock")}>Unblock</a>
          )
         }
            <a href="#" className={`py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${isOpen?"":"z-10"}`}>Mail</a>
        </div>
    </div>
</div>
</div>

  )
}

export default View