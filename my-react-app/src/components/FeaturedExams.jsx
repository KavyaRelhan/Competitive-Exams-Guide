const featuredExams = [
  { id: 1, name: 'JEE Main', date: 'April 2024' },
  { id: 6, name: 'NEET', date: 'May 2024' },
  { id: 3, name: 'UPSC CSE', date: 'June 2024' },
  {id: 2, name: 'JEE Advanced', date: 'June 2024'}
];

const FeaturedExams = () => {
  return (
    <div className="featured-exams">
      <h2>Featured Exams</h2>
      <ul>
        {featuredExams.map((exam) => (
          <li key={exam.id}>
            <h3>{exam.name}</h3>
            <p>Exam Date: {exam.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedExams;
