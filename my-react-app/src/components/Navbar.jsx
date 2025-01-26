import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import '../styles/Navbar.css';
import { handleSuccess } from '../utils';

const Navbar = ({ isAuthenticated,setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedUserName');
    setIsAuthenticated(false);
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <nav className="navbar">
      <NavLink 
        to="/home" 
        className='n home'
      >
        Home
      </NavLink>
      <NavLink 
        to="/exam-directory" 
        className='exam-directory'
      >
        Exam Directory
      </NavLink>
      <NavLink 
        to={isAuthenticated ? "/profile" : "/login"} 
        className='n login'
      >
        {isAuthenticated ? 'Profile' : 'Login'}
      </NavLink>
      {isAuthenticated && (
        <button className="n logout" onClick={handleLogout}>
          Log out <IoIosLogOut />
        </button>
      )}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
