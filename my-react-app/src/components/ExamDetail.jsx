import React from 'react';
import '../styles/ExamDetails.css'

const ExamDetail = ({ exam, onClose }) => {
  return (
    <div className="exam-detail">
      <button className='back-button' onClick={onClose}>⬅ Back to Exams List</button>
      <h2>{exam.name}</h2>
      <p><strong>Overview:</strong> {exam.overview}</p>
      <p><strong>Eligibility Criteria:</strong> {exam.eligibility}</p>
      <p><strong>Exam Pattern:</strong> {exam.pattern}</p>
      <p><strong>Syllabus:</strong> {exam.syllabus.join(', ')}</p>
      <div>
        <strong>Important Dates:</strong>
        <ul>
          <li>Application Start: {exam.importantDates.applicationStart}</li>
          <li>Application End: {exam.importantDates.applicationEnd}</li>
          <li>Exam Date: {exam.importantDates.examDate}</li>
          <li>Result: {exam.importantDates.result}</li>
        </ul>
      </div>
      <div>
        <strong>Application Process:</strong>
        <ul>
          {exam.applicationProcess.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        <p>Fees: {exam.applicationProcess.fees}</p>
        <p>Payment Methods: {exam.applicationProcess.paymentMethods.join(', ')}</p>
      </div>
      <p><strong>Preparation Tips:</strong> {exam.preparationTips.join(', ')}</p>
      <p><strong>Resources:</strong></p>
      <ul>
        {exam.resources.map((resource, index) => (
          <li key={index}><a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default ExamDetail;
