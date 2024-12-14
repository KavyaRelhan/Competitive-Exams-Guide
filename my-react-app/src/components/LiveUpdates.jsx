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

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/LiveUpdate.module.css';

const LiveUpdates = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const keywords = ['JEE', 'NEET', 'CAT', 'UPSC', 'CA', 'SSC', 'CUET'];

  useEffect(() => {
    const fetchNews = async (keyword = '') => {
      try {
        const response = await axios.get('http://localhost:5000/api/news', {
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

  const handleKeywordChange = (keyword) => {
    setSelectedKeyword(keyword);
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveUpdates;