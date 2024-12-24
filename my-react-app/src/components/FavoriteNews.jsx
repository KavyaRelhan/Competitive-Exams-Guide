import React from 'react';
import styles from '../styles/FavoriteNews.module.css';
import { MdDelete } from "react-icons/md";

const FavoriteNews = ({ favorites, onRemove }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Favorite News</h2>
      {favorites.length === 0 ? (
        <p className={styles.noFavorites}>You have no favorite news articles.</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((article, index) => (
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
                onClick={() => onRemove(article.url)}
                className={styles.removeButton}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteNews;
