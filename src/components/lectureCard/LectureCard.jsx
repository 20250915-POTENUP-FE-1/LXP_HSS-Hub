import Button from '../common/button/Button';
import './LectureCard.css';
import { useNavigate } from 'react-router-dom';

function LectureCard({ lecture, type = 'MAIN', onClick }) {
  const navigate = useNavigate();

  return (
    <div className="lecture-card" onClick={onClick}>
      <img
        className="lecture-card-thumbnail"
        src={lecture.thumbnailURL}
        alt="썸네일 이미지"
      />
      <div className="lecture-card-wrapper">
        <div className="category">{lecture.category}</div>
        <div className="title">{lecture.lectureTitle}</div>
        {type !== 'TEACHER' && <div className="author">{lecture.authorId}</div>}
        {type === 'MAIN' && (
          <div className="price-enrollment">
            <div className="price">{lecture.price?.toLocaleString()}원</div>
            <div className="enrollment">수강생 {lecture.enrollmentCount}명</div>
          </div>
        )}
        {type === 'STUDENT' && (
          <div className="buttons">
            <Button variant="primary" block={'true'}>
              수강하기
            </Button>
          </div>
        )}
        {type === 'TEACHER' && (
          <div className="buttons">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`edit/${lecture.lectureId}`)}
            >
              수정
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LectureCard;
