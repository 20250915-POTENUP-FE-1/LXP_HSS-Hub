// DetailPage.tsx
import CurriculumItem from './components/curriculumItem/CurriculumItem';
import './DetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag, UserRound, UsersRound } from 'lucide-react';
import { getLecture, updateLecture } from '../../services/lectureService';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../store/userSlice';
import { RootState, AppDispatch } from '../../store/store';
import { Lecture, User } from 'types/types';

// 3.userRole 타입 정의 (GUEST 포함)
type UserRole = 'GUEST' | 'STUDENT' | 'TEACHER';

function DetailPage() {

  //1. useParams 타입 지정
  const { lectureId } = useParams<{ lectureId: string }>();
  const navigate = useNavigate();
  
  //4 Redux dispatch 타입 지정
  const dispatch = useDispatch<AppDispatch>();

  //2. useState 타입 지정
  const [lecture, setLecture] = useState<Lecture | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Redux에서 userInfo 가져오기
  const userInfo = useSelector((state: RootState) => state.user.userInfo) as User | null;
  const userRole: UserRole = userInfo?.role ?? 'GUEST';

  // 강의 정보 가져오기
  useEffect(() => {
    const fetchLecture = async () => {
      if (!lectureId) return;
      setIsLoading(true);
      const data = await getLecture(lectureId);
      setLecture(data as Lecture);
      setIsLoading(false);
    };
    fetchLecture();
  }, [lectureId]);

  // 수강신청 버튼 클릭 이벤트
  const handleRegistLecture = async () => {
    if (!lecture) return;

    if (userRole === 'GUEST') {
      if (window.confirm('로그인 상태가 아닙니다. 로그인하시겠습니까?')) {
        navigate(`/login`);
      }
      return;
    }

    if (userRole === 'STUDENT') {
      // 이미 수강중인지 확인
      const already = userInfo?.lectureList.includes(lecture.lectureId);
      if (already) {
        if (window.confirm('이미 수강 중인 강의 입니다. 마이페이지로 이동하시겠습니까?')) {
          navigate('/mypage');
        }
        return;
      }

      // UI 업데이트
      setLecture((prev) =>
        prev ? { ...prev, enrollmentCount: prev.enrollmentCount + 1 } : prev
      );

      // Firestore 업데이트
      await updateLecture(lecture.lectureId, {
        enrollmentCount: lecture.enrollmentCount + 1,
      });

      // Redux userInfo 업데이트
      const updatedLectureList = [...(userInfo?.lectureList || []), lectureId!];
      await dispatch(
        updateInfo({
          userId: userInfo!.userId,
          userInfo: { lectureList: updatedLectureList },
        })
      );

      if (window.confirm('수강신청이 완료되었습니다. 마이페이지로 이동하시겠습니까?')) {
        navigate(`/mypage`);
      }
      return;
    }

    if (userRole === 'TEACHER') {
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
            {/* Optional chaining과 null 체크 */}
            {lecture?.curriculum?.map((item, index) => (
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
            userInfo?.lectureList.includes(lectureId!)) && (
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
