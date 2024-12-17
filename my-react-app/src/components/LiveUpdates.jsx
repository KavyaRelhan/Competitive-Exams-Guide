// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../styles/LiveUpdate.module.css';

// const LiveUpdates = () => {
//   const [news, setNews] = useState([]);
//   const [tweets, setTweets] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       const newsResponse = await axios.get('http://localhost:5000/api/news');
//       setNews(newsResponse.data);
//     };

//     const fetchTweets = async () => {
//       const twitterResponse = await axios.get('http://localhost:5000/api/twitter');
//       setTweets(twitterResponse.data);
//     };

//     fetchNews();
//     fetchTweets();

//     // Optionally, refresh every 5 minutes
//     const interval = setInterval(() => {
//       fetchNews();
//       fetchTweets();
//     }, 300000);

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.header}>Live Exam Updates</h2>
      
//       <div className={styles.section}>
//         <h3 className={styles.sectionTitle}>News</h3>
//         <ul className={styles.list}>
//           {news.map((article, index) => (
//             <li key={index} className={styles.listItem}>
//               <a
//                 href={article.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.articleLink}
//               >
//                 {article.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
      
//       <div className={styles.section}>
//         <h3 className={styles.sectionTitle}>Tweets</h3>
//         <ul className={styles.list}>
//           {tweets.map((tweet, index) => (
//             <li key={index} className={styles.listItem}>
//               <p className={styles.tweetText}>{tweet.text}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LiveUpdates;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../styles/LiveUpdate.module.css';

// const LiveUpdates = () => {
//   const [news, setNews] = useState([]);
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [selectedKeyword, setSelectedKeyword] = useState('');
//   const [userEmail, setUserEmail] = useState('');

//   const keywords = ['JEE', 'NEET', 'CAT', 'UPSC', 'CA', 'SSC', 'CUET'];

//   useEffect(() => {
//     const fetchNews = async (keyword = '') => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/news', {
//           params: { keyword }, 
//         });
//         setNews(response.data);
//         setFilteredNews(response.data);
//       } catch (error) {

//         console.error('Error fetching news:', error);
//       }
//     };
    

//     fetchNews(selectedKeyword);

//     const interval = setInterval(() => {
//       fetchNews(selectedKeyword);
//     }, 300000);

//     return () => clearInterval(interval);
//   }, [selectedKeyword]);

//   const handleKeywordChange = (keyword) => {
//     setSelectedKeyword(keyword);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.header}>Live Exam Updates</h2>

//       <div className={styles.section}>
//         <h3 className={styles.sectionTitle}>News</h3>
//         <div className={styles.filters}>
//           <select
//             value={selectedKeyword}
//             onChange={(e) => handleKeywordChange(e.target.value)}
//             className={styles.filterDropdown}
//           >
//             <option value="">All Exams</option>
//             {keywords.map((keyword, index) => (
//               <option key={index} value={keyword}>
//                 {keyword}
//               </option>
//             ))}
//           </select>
//         </div>

//         <ul className={styles.list}>
//           {filteredNews.map((article, index) => (
//             <li key={index} className={styles.listItem}>
//               <a
//                 href={article.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.articleLink}
//               >
//                 {article.title} - <em>{article.source.name}</em>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LiveUpdates;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../styles/LiveUpdate.module.css';

// const LiveUpdates = () => {
//   const [news, setNews] = useState([]);
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [selectedKeyword, setSelectedKeyword] = useState('');
//   const [favorites, setFavorites] = useState(() => {
//     const savedFavorites = localStorage.getItem('favorites');
//     return savedFavorites ? JSON.parse(savedFavorites) : [];
//   });

//   const keywords = ['JEE', 'NEET', 'CAT', 'UPSC', 'CA', 'SSC', 'CUET'];

//   useEffect(() => {
//     const fetchNews = async (keyword = '') => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/news', {
//           params: { keyword },
//         });
//         setNews(response.data);
//         setFilteredNews(response.data);
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews(selectedKeyword);

//     const interval = setInterval(() => {
//       fetchNews(selectedKeyword);
//     }, 300000);

//     return () => clearInterval(interval);
//   }, [selectedKeyword]);

//   const handleKeywordChange = (keyword) => {
//     setSelectedKeyword(keyword);
//   };

//   const toggleFavorite = (article) => {
//     let updatedFavorites;
//     if (favorites.some((fav) => fav.url === article.url)) {
//       // Remove from favorites
//       updatedFavorites = favorites.filter((fav) => fav.url !== article.url);
//     } else {
//       // Add to favorites
//       updatedFavorites = [...favorites, article];
//     }
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.header}>Live Exam Updates</h2>

//       <div className={styles.section}>
//         <h3 className={styles.sectionTitle}>News</h3>
//         <div className={styles.filters}>
//           <select
//             value={selectedKeyword}
//             onChange={(e) => handleKeywordChange(e.target.value)}
//             className={styles.filterDropdown}
//           >
//             <option value="">All Exams</option>
//             {keywords.map((keyword, index) => (
//               <option key={index} value={keyword}>
//                 {keyword}
//               </option>
//             ))}
//           </select>
//         </div>

//         <ul className={styles.list}>
//           {filteredNews.map((article, index) => (
//             <li key={index} className={styles.listItem}>
//               <a
//                 href={article.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.articleLink}
//               >
//                 {article.title} - <em>{article.source.name}</em>
//               </a>
//               <button
//                 className={`${styles.starButton} ${
//                   favorites.some((fav) => fav.url === article.url)
//                     ? styles.favorited
//                     : ''
//                 }`}
//                 onClick={() => toggleFavorite(article)}
//               >
//                 ★
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LiveUpdates;


import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/LiveUpdate.module.css';

const LiveUpdates = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const keywords = ['JEE', 'NEET', 'CAT', 'UPSC', 'CA', 'SSC', 'CUET'];

  useEffect(() => {
    const fetchNews = async (keyword = '') => {
      try {
        const response = await axios.get('http://localhost:8080/api/news', {
          params: { keyword },
        });
        setNews(response.data);
        setFilteredNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews(selectedKeyword);

    const interval = setInterval(() => {
      fetchNews(selectedKeyword);
    }, 300000);

    return () => clearInterval(interval);
  }, [selectedKeyword]);

  useEffect(() => {
    const email = localStorage.getItem('loggedInUser');
    setUserEmail(email); // Fetch user email from local storage
  }, []);

  const handleKeywordChange = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const addToFavorites = async (article) => {
    try {
      await axios.post('http://localhost:8080/auth/favorites', {
        email: userEmail,
        article,
      });
      alert('Article added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add article to favorites');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Live Exam Updates</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>News</h3>
        <div className={styles.filters}>
          <select
            value={selectedKeyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            className={styles.filterDropdown}
          >
            <option value="">All Exams</option>
            {keywords.map((keyword, index) => (
              <option key={index} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
        </div>

        <ul className={styles.list}>
          {filteredNews.map((article, index) => (
            <li key={index} className={styles.listItem}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.articleLink}
              >
                {article.title} - <em>{article.source.name}</em>
              </a>
              <button
                onClick={() => addToFavorites(article)}
                className={styles.favoriteButton}
              >
                ⭐ Add to Favorites
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveUpdates;
