import { useState } from 'react';
// import '../styles/SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value); // Trigger real-time search
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(); // Trigger search on button click
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search exams..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
