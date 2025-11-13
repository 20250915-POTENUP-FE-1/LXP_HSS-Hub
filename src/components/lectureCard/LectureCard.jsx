import { useDispatch, useSelector } from 'react-redux';
import { updateLecture } from '../../services/lectureService';
import Button from '../common/button/Button';
import './LectureCard.css';
import { useNavigate } from 'react-router-dom';
import { updateInfo } from '../../store/userSlice';

function LectureCard({ lecture, type = 'MAIN' }) {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickCard = () => {
    if (type === 'MAIN') {
      navigate(`/detail/${lecture.lectureId}`);
    }
  };

  const handleClickDelete = async () => {
    if (confirm(`정말 ${lecture.lectureTitle}를 삭제하시겠습니까?`)) {
      await updateLecture(lecture.lectureId, {
        authorId: null,
      });

      const updatedLectureList = userInfo.lectureList.filter((lectureId) => {
        return lectureId !== lecture.lectureId;
      });

      await dispatch(
        updateInfo({
          userId: userInfo.userId,
          userInfo: {
            lectureList: updatedLectureList,
          },
        }),
      );
    }
  };

  return (
    <div className="lecture-card" onClick={handleClickCard}>
      <img
        className="lecture-card-thumbnail"
        src={lecture.thumbnailURL}
        alt="썸네일 이미지"
      />
      <div className="lecture-card-wrapper">
        <div className="category">{lecture.category}</div>
        <div className="title">{lecture.lectureTitle}</div>
        {type !== 'TEACHER' && (
          <div className="author">{lecture.authorName}</div>
        )}
        {type === 'MAIN' && (
          <div className="price-enrollment">
            <div className="price">{lecture.price?.toLocaleString()}원</div>
            <div className="enrollment">수강생 {lecture.enrollmentCount}명</div>
          </div>
        )}
        {type === 'STUDENT' && (
          <div className="buttons">
            <Button
              variant="primary"
              block={'true'}
              disabled={lecture.authorName ? false : true}
            >
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
            <Button variant="ghost" size="sm" onClick={handleClickDelete}>
              삭제
            </Button>
          </div>
        )}
      </div>
      {!lecture.authorName && (
        <div className={'backdrop-blur'}></div>
      )}
    </div>
  );
}

export default LectureCard;
