import LectureCard from '../lectureCard/LectureCard';
import './LectureList.css';

function LectureList({ lectures, onLectureClick  }) {
  return (
    <div className="lecture-list">
      {lectures.length === 0 ? (
        <div>등록된 강의가 없습니다.</div>
      ) : (
        <div className="lecture-list-grid">
          {lectures.map((lecture, index) => (
            <LectureCard key={index} lecture={lecture} onClick={() => onLectureClick(index)}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default LectureList;
