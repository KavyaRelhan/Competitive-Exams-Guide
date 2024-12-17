// // import React, { useEffect } from "react"
// // import { useState } from "react"
// // import { useNavigate } from "react-router-dom";
// // import { handleSuccess } from "../utils";
// // import { ToastContainer } from "react-toastify";

// // function Profile(){
// //     const [loggedInUser , setLoggedInUser] = useState(''); 
// //     useEffect(()=>{
// //         setLoggedInUser(localStorage.getItem('loggedInUser'))
// //     })

// //     const navigate = useNavigate();

// //     const handleLogout = (e)=>{
// //         localStorage.removeItem('token')
// //         localStorage.removeItem('loggedInUser')
// //         handleSuccess("User logged out successfully")
// //         setTimeout(()=>{
// //             navigate('/login');
// //         },1000)
// //     }

// //     useEffect(()=>{
        
// //     })

// //     return (
// //         <div>
// //             <h1>Welcome {loggedInUser}</h1>
// //             <button onClick={handleLogout}>Logout</button>
// //             <ToastContainer/>
// //         </div>
// //     )
// // }

// // export default Profile;



// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { handleSuccess } from "../utils";
// // import { ToastContainer } from "react-toastify";

// // function Profile() {
// //   const [loggedInUser, setLoggedInUser] = useState('');
// //   const [favorites, setFavorites] = useState([]);
// //   const navigate = useNavigate();

// //   // Load user and favorites from localStorage on component mount
// //   useEffect(() => {
// //     const user = localStorage.getItem('loggedInUser');
// //     const storedFavorites = localStorage.getItem('favorites');
// //     setLoggedInUser(user);
// //     setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
// //   }, []);

// //   // Handle user logout
// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('loggedInUser');
// //     handleSuccess("User logged out successfully");
// //     navigate('/login');
// //   };

// //   return (
// //     <div style={{ textAlign: 'center', marginTop: '50px' }}>
// //       <h1>Welcome, {loggedInUser || 'Guest'}!</h1>

// //       <button
// //         onClick={handleLogout}
// //         style={{
// //           padding: '10px 20px',
// //           backgroundColor: '#f44336',
// //           color: 'white',
// //           border: 'none',
// //           borderRadius: '5px',
// //           cursor: 'pointer',
// //           fontSize: '16px',
// //           marginBottom: '20px',
// //         }}
// //       >
// //         Logout
// //       </button>

// //       <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
// //         <h2>Your Favorite News</h2>
// //         {favorites.length > 0 ? (
// //           <ul style={{ listStyleType: 'none', padding: 0 }}>
// //             {favorites.map((article, index) => (
// //               <li
// //                 key={index}
// //                 style={{
// //                   marginBottom: '15px',
// //                   padding: '10px',
// //                   border: '1px solid #ddd',
// //                   borderRadius: '5px',
// //                   backgroundColor: '#f9f9f9',
// //                 }}
// //               >
// //                 <a
// //                   href={article.url}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
// //                 >
// //                   {article.title}
// //                 </a>
// //                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
// //                   <em>Source: {article.source?.name || 'Unknown'}</em>
// //                 </p>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p style={{ color: '#777', fontSize: '16px' }}>No favorite news added yet.</p>
// //         )}
// //       </div>

// //       <ToastContainer />
// //     </div>
// //   );
// // }

// // export default Profile;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// function Profile() {
//   const [loggedInUser, setLoggedInUser] = useState('');
//   const [favorites, setFavorites] = useState([]);
//   const navigate = useNavigate();

//   // Load user and favorites from localStorage on component mount
//   useEffect(() => {
//     const user = localStorage.getItem('loggedInUser');
//     const storedFavorites = localStorage.getItem('favorites');
//     setLoggedInUser(user);
//     setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
//   }, []);

//   // Handle user logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess("User logged out successfully");
//     navigate('/login');
//   };

//   // Handle removal of a specific favorite news article
//   const removeFavorite = (articleUrl) => {
//     const updatedFavorites = favorites.filter((article) => article.url !== articleUrl);
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     handleSuccess("Article removed from favorites");
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Welcome, {loggedInUser || 'Guest'}!</h1>

//       <button
//         onClick={handleLogout}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#f44336',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontSize: '16px',
//           marginBottom: '20px',
//         }}
//       >
//         Logout
//       </button>

//       <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
//         <h2>Your Favorite News</h2>
//         {favorites.length > 0 ? (
//           <ul style={{ listStyleType: 'none', padding: 0 }}>
//             {favorites.map((article, index) => (
//               <li
//                 key={index}
//                 style={{
//                   marginBottom: '15px',
//                   padding: '10px',
//                   border: '1px solid #ddd',
//                   borderRadius: '5px',
//                   backgroundColor: '#f9f9f9',
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <div>
//                   <a
//                     href={article.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
//                   >
//                     {article.title}
//                   </a>
//                   <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
//                     <em>Source: {article.source?.name || 'Unknown'}</em>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeFavorite(article.url)}
//                   style={{
//                     padding: '5px 10px',
//                     backgroundColor: '#f44336',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '3px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p style={{ color: '#777', fontSize: '16px' }}>No favorite news added yet.</p>
//         )}
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import FavoriteNews from '../components/FavoriteNews';
// import FavoriteNews from '../components/FavoriteNews'; // Import the new component
import styles from '../styles/Profile.module.css';

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInUser');
    setLoggedInUser(email);

    if (email) {
      fetchFavorites(email);
    }
  }, []);

  const fetchFavorites = async (email) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/favorites', {
        params: { email },
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleRemoveFavorite = async (url) => {
    try {
      await axios.delete('http://localhost:5000/api/favorites', {
        data: { email: loggedInUser, url },
      });
      setFavorites(favorites.filter((article) => article.url !== url));
      alert('Favorite removed successfully!');
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Failed to remove favorite');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      <ToastContainer />

      {/* Use FavoriteNews Component */}
      <FavoriteNews favorites={favorites} onRemove={handleRemoveFavorite} />
    </div>
  );
}

export default Profile;
