import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Nav() {
 

  return (
    <header className='text-white flex justify-between items-center p-2 sticky top-0 z-10 bg-[#0a192f]'>
      <Link to="/">
        <img className='text-xl bg-yellow-500 w-14 h-14 flex justify-center items-center rounded-full font-bold' src='/src/assets/admin.png'>
        </img>
    
      </Link>
      <nav>
        <ul className='flex gap-4'>
        
            <li>
              <h1
                className="hover:text-yellow-500 text-yellow-500 bg-slate-600 p-1 rounded-lg"
              >
                Hello, Admin
              </h1>
            </li>
         
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
