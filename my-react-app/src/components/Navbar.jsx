// Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import SearchBar from '../components/SearchBar';
import '../styles/Navbar.css';

const Navbar = ({isAuthenticated}) => {

  return (
    <nav className="navbar">
        {/* <SearchBar /> */}
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/exam-directory">Exam Directory</Link>
        <Link to="/profile">{isAuthenticated ?<span>Profile</span> : <span>Login</span>}</Link>
      </div>
      {/* <SearchBar /> */}
    </nav>
  );
};

export default Navbar;
