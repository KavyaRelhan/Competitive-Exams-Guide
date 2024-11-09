import { useState } from 'react';
import { examsData } from '../data/examsData';
import ExamCategoryList from '../components/ExamCategoryList';
import ExamCard from '../components/ExamCard';
import ExamDetail from '../components/ExamDetail';
import '../styles/ExamsDirectory.css';
import HeroBanner from '../components/HeroBanner';
import Navbar from '../components/Navbar';

const ExamsDirectory = () => {
  const categories = [...new Set(examsData.map((exam) => exam.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedExam(null); // Reset selected exam when changing category
  };

  const filteredExams = examsData.filter((exam) => exam.category === selectedCategory);

  return (
    <>
    <HeroBanner/>
    <Navbar/>
    <div className="exams-directory">
      <ExamCategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="exams-content">
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
