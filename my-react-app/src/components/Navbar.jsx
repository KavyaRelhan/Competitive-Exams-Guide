// // Navbar.jsx
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// // import SearchBar from '../components/SearchBar';
// import '../styles/Navbar.css';
// import { ToastContainer } from 'react-toastify';
// import { IoIosLogOut } from "react-icons/io";
// import { handleSuccess, handleError } from '../utils';
// import { useNavigate } from 'react-router-dom';

// const Navbar = ({isAuthenticated}) => {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('loggedInUser');
//       localStorage.removeItem('loggedUserName');
//       handleSuccess('User logged out successfully');
//       setTimeout(() => {
//         navigate('/login');
//       }, 1000);
//     };

//   return (
//     <nav className="navbar">
//         {/* <SearchBar /> */}
//       {/* <div className="navbar-links"> */}
//         <Link to="/home">Home</Link>
//         <Link to="/exam-directory">Exam Directory</Link>
//         <Link to="/profile">{isAuthenticated ?<span>Profile</span> : <span>Login</span>}</Link>
//         {isAuthenticated && <button className='logout' onClick={handleLogout} >
//           Log out <IoIosLogOut />
//         </button> }
//         <ToastContainer />
//       {/* </div> */}
//       {/* <SearchBar /> */}
//     </nav>
//   );
// };

// export default Navbar;

import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import '../styles/Navbar.css';
import { handleSuccess } from '../utils';

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedUserName');
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <nav className="navbar">
      <NavLink 
        to="/home" 
        className={({ isActive }) => isActive ? 'active-link' : 'navbar-link'}
      >
        Home
      </NavLink>
      <NavLink 
        to="/exam-directory" 
        className={({ isActive }) => isActive ? 'active-link' : 'navbar-link'}
      >
        Exam Directory
      </NavLink>
      <NavLink 
        to={isAuthenticated ? "/profile" : "/login"} 
        className={({ isActive }) => isActive ? 'active-link' : 'navbar-link'}
      >
        {isAuthenticated ? 'Profile' : 'Login'}
      </NavLink>
      {isAuthenticated && (
        <button className="logout" onClick={handleLogout}>
          Log out <IoIosLogOut />
        </button>
      )}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
