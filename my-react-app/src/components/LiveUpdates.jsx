import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/LiveUpdate.module.css';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

const LiveUpdates = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  const keywords = ['JEE', 'NEET', 'CAT', 'UPSC', 'CA', 'SSC', 'CUET'];

  useEffect(() => {
    const email = localStorage.getItem('loggedInUser');
    setUserEmail(email);

    // Fetch user's favorites from the backend
    if (email) {
      fetchFavorites(email);
    }

    // Register Service Worker for push notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          // Subscribe to push notifications
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: import.meta.env.VITE_VAPID_KEY,
            })
            .then((subscription) => {
              console.log('Push subscription:', subscription);
              // Send subscription to the backend
              axios.post('https://competitive-exams-guide.vercel.app/api/subscribe', { subscription, email });
            })
            .catch((error) => console.error('Push subscription failed:', error));
        })
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  }, []);

  useEffect(() => {
    const fetchNews = async (keyword = '') => {
      try {
        const response = await axios.get('https://competitive-exams-guide.vercel.app/api/news', {
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
    }, 300000); // 5 minutes

    return () => clearInterval(interval); // Clear interval on cleanup
  }, [selectedKeyword]);

  const fetchFavorites = async (email) => {
    try {
      const response = await axios.get('https://competitive-exams-guide.vercel.app/auth/favorites', {
        params: { email },
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      handleError('Failed to fetch favorites. Please try again later.');
    }
  };

  const handleKeywordChange = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const toggleFavorite = async (article) => {
    try {
      const isFavorite = favorites.some((fav) => fav.url === article.url);

      if (isFavorite) {
        // Remove from favorites
        await axios.delete('https://competitive-exams-guide.vercel.app/auth/favorites', {
          data: { email: userEmail, url: article.url },
        });
        setFavorites(favorites.filter((fav) => fav.url !== article.url));
        handleSuccess('Article removed from favorites!');
      } else {
        // Add to favorites
        await axios.post('http://competitive-exams-guide.vercel.app/auth/favorites', {
          email: userEmail,
          article,
        });
        setFavorites([...favorites, article]);
        handleSuccess('Article added to favorites!');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      handleError('Failed to update favorites. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Live Exam Updates</h2>

      {notification && notification.title && notification.body && (
        <div className={styles.notification} aria-live="polite">
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}

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

        {filteredNews.length === 0 ? (
          <p className={styles.noData}>No articles available for the selected keyword.</p>
        ) : (
          <ul className={styles.list}>
            {filteredNews.map((article, index) => {
              const isFavorite = favorites.some((fav) => fav.url === article.url);
              return (
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
                    onClick={() => toggleFavorite(article)}
                    className={`${styles.favoriteButton} ${
                      isFavorite ? styles.active : ''
                    }`}
                  >
                    {isFavorite ? '★' : '☆'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LiveUpdates;
