import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/LiveUpdate.module.css';

const LiveUpdates = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [favorites, setFavorites] = useState([]);

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
    setUserEmail(email);

    // Fetch user's favorites from the backend
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

  const handleKeywordChange = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const toggleFavorite = async (article) => {
    try {
      const isFavorite = favorites.some((fav) => fav.url === article.url);

      if (isFavorite) {
        // Remove from favorites
        await axios.delete('http://localhost:8080/auth/favorites', {
          data: { email: userEmail, url: article.url },
        });
        setFavorites(favorites.filter((fav) => fav.url !== article.url));
        alert('Article removed from favorites!');
      } else {
        // Add to favorites
        await axios.post('http://localhost:8080/auth/favorites', {
          email: userEmail,
          article,
        });
        setFavorites([...favorites, article]);
        alert('Article added to favorites!');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites');
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
      </div>
    </div>
  );
};

export default LiveUpdates;
