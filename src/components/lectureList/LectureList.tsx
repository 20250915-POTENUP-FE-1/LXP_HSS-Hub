import { Lecture } from 'types/types';
import LectureCard from '../lectureCard/LectureCard';
import './LectureList.css';

interface LectureListProps {
  lectures: Lecture[];
  type: 'MAIN' | 'STUDENT' | 'TEACHER';
}

function LectureList({ lectures, type }: LectureListProps) {
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
