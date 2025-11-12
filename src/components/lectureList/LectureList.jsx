import LectureCard from '../lectureCard/LectureCard';
import './LectureList.css';

function LectureList({ lectures, type }) {
  return (
    <div className="lecture-list">
      <div className="lecture-list-grid">
        {lectures.map((lecture, index) => (
          <LectureCard key={index} lecture={lecture} type={type} />
        ))}
      </div>
    </div>
  );
}

export default LectureList;
