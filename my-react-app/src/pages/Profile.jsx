import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import FavoriteNews from '../components/FavoriteNews';
// import FavoriteNews from '../components/FavoriteNews'; // Import the new component
import styles from '../styles/Profile.module.css';
import HeroBanner from '../components/HeroBanner';
import Navbar from '../components/Navbar';

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loggedUserName , setLoggedUserName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem('loggedUserName');
    setLoggedInUser(userName);

    if (userName) {
      fetchFavorites(userName);
    }
  }, []);

  const fetchFavorites = async (userName) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/favorites', {
        params: { userName },
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedUserName');
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleRemoveFavorite = async (url) => {
    try {
      await axios.delete('http://localhost:8080/auth/favorites', {
        data: { userName: loggedInUser, url },
      });
      setFavorites(favorites.filter((article) => article.url !== url));
      alert('Favorite removed successfully!');
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Failed to remove favorite');
    }
  };

  return (
    <>
    <HeroBanner/>
    <Navbar/>
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      <ToastContainer />

      {/* Use FavoriteNews Component */}
      <FavoriteNews favorites={favorites} onRemove={handleRemoveFavorite} />
    </div>
    </>
  );
}

export default Profile;
