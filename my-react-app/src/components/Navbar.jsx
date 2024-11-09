// Navbar.jsx
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <SearchBar />
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/exam-directory">Exam Directory</Link>
        <Link to="/profile">Profile</Link>
      </div>
      {/* <SearchBar /> */}
    </nav>
  );
};

export default Navbar;
