

const ExamCard = ({ exam, onClick }) => {
  return (
    <div className="exam-card" onClick={onClick}>
      <h3>{exam.name}</h3>
      <p>{exam.overview}</p>
      <button>View Details</button>
    </div>
  );
};

export default ExamCard;
