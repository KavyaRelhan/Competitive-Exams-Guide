
const ExamCategoryList = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="exam-category-list">
      <h2>Exam Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamCategoryList;
