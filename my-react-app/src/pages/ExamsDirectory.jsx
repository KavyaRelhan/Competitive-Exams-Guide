import { useState } from 'react';
import { examsData } from '../data/examsData';
import ExamCategoryList from '../components/ExamCategoryList';
import ExamCard from '../components/ExamCard';
import ExamDetail from '../components/ExamDetail';
import '../styles/ExamsDirectory.css';
import HeroBanner from '../components/HeroBanner';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const ExamsDirectory = ({ isAuthenticated }) => {
  const categories = [...new Set(examsData.map((exam) => exam.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false); // To track if the user is searching

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedExam(null);
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedExam(null);
    setIsSearching(query.trim() !== ''); // Hide sidebar if there's an active search query
  };

  const handleSearchSubmit = () => {
    setIsSearching(searchQuery.trim() !== ''); // Ensure search happens on button click too
  };

  const filteredExams = isSearching
    ? examsData.filter((exam) =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : examsData.filter((exam) => exam.category === selectedCategory);

  return (
    <>
      <HeroBanner />
      <Navbar isAuthenticated={isAuthenticated} />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <div className="exams-directory">
        {!isSearching && (
          <ExamCategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
        <div className={`exams-content ${isSearching ? 'full-width' : ''}`}>
          {!selectedExam ? (
            <div className="exam-list">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} onClick={() => setSelectedExam(exam)} />
              ))}
            </div>
          ) : (
            <ExamDetail exam={selectedExam} onClose={() => setSelectedExam(null)} />
          )}
        </div>
      </div>
    </>
  );
};

export default ExamsDirectory;
