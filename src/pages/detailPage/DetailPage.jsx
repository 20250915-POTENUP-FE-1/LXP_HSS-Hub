import CurriculumItem from './components/curriculumItem/CurriculumItem';
import './DetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag, UserRound, UsersRound } from 'lucide-react';
import { getLecture, updateLecture } from '../../services/lectureService';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../store/userSlice';

function DetailPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Redux에서 userInfo 가져오기
  const userInfo = useSelector((state) => state.user.userInfo);
  const userRole = userInfo?.role || 'GUEST'; //로그인 안하면 GUEST
  const dispatch = useDispatch();

  //  a. useParams의 id값으로 해당 강의 정보 가져오기
  useEffect(() => {
    const fetchLecture = async () => {
      setIsLoading(true);
      const data = await getLecture(lectureId); // Firestore에서 강의 불러오기
      setLecture(data);
      setIsLoading(false);
    };
    fetchLecture();
  }, [lectureId]);

  //수강신청 버튼 클릭 이벤트
  const handleRegistLecture = async () => {
    if (userRole === 'GUEST') {
      if (window.confirm('로그인 상태가 아닙니다. 로그인하시겠습니까?')) {
        navigate(`/login`);
      }
      return;
    } else if (userRole === 'STUDENT') {
      // 학생일 경우 수강생 수 증가@@

      // true면 이미 수강중인 강의, false면 아직 수강하지 않은 강의
      if (
        userInfo.lectureList.find(
          (lectureId) => lectureId === lecture.lectureId,
        )
      ) {
        if (
          confirm('이미 수강 중인 강의 입니다. 마이페이지로 이동하시겠습니까?')
        ) {
          navigate('/mypage');
        }
        return;
      }

      //ui lectureList업데이트
      setLecture((prev) => ({
        ...prev,
        enrollmentCount: prev.enrollmentCount + 1,
      }));

      await updateLecture(lecture.lectureId, {
        enrollmentCount: lecture.enrollmentCount + 1,
      });

      //user lectureList업데이트
      const updatedLectureList = [...userInfo.lectureList, lectureId];

      await dispatch(
        updateInfo({
          userId: userInfo.userId,
          userInfo: { lectureList: updatedLectureList },
        }),
      );

      if (
        window.confirm(
          '수강신청이 완료되었습니다. 마이페이지로 이동하시겠습니까?',
        )
      ) {
        navigate(`/mypage`);
      }
      return;
    } else if (userRole === 'TEACHER') {
      navigate(`/mypage/edit/${lectureId}`);
    }
  };

  return (
    <div className="detailpage">
      <div className="detailpage-wrapper">
        <div className="detailpage-left">
          <div className="detailpage-thumbnail">
            <img src={lecture?.thumbnailURL} alt={lecture?.lectureTitle} />
          </div>

          <div className="detailpage-desc white-box">
            <h2>강의 상세 설명</h2>
            <p>{lecture?.description}</p>
          </div>
          <div className="detailpage-curriculum">
            <h2>커리큘럼</h2>
            {/* 각 커리큘럼 아이템에 인덱스(index)와 item을 전달 */}
            {lecture?.curriculum.map((item, index) => (
              <CurriculumItem key={item.lessonId} index={index} item={item} />
            ))}
          </div>
        </div>
        <div className="detailpage-inform white-box">
          <h2 className="detailpage-inform-title">{lecture?.lectureTitle}</h2>
          <div className="category-box">{lecture?.category}</div>
          <div className="detailpage-inform-list">
            <ul>
              <li>
                <em>
                  <UserRound size={20} color="#64748B" />
                  강사명:
                </em>
                <p className="teacher">{lecture?.authorName}</p>
              </li>
              <li>
                <em>
                  <Tag size={22} color="#fff" fill="#64748B" />
                  가격:
                </em>
                <p className="price">{lecture?.price.toLocaleString()} 원</p>
              </li>
              <li>
                <em>
                  <UsersRound size={20} color="#64748B" />
                  수강생 수:
                </em>
                <p className="enrollment-count">
                  {lecture?.enrollmentCount.toLocaleString()} 명
                </p>
              </li>
            </ul>
          </div>

          {(userRole !== 'TEACHER' ||
            userInfo.lectureList.some((id) => id === lectureId)) && (
            <button
              className="lecture-regist-button"
              onClick={handleRegistLecture}
            >
              {userRole !== 'TEACHER' ? '수강 신청' : '강의 수정'}
            </button>
          )}
        </div>
      </div>
      {isLoading && <span className="loader"></span>}
    </div>
  );
}

export default DetailPage;
