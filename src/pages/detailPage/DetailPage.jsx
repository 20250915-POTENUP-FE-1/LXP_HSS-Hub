import CurriculumItem from './components/curriculumItem/CurriculumItem';
import './DetailPage.css';
import { lectures } from '../../data/dummy';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag, UserRound, UsersRound } from 'lucide-react';
import { getLecture } from '../../services/lectureService';
import { getAuth } from 'firebase/auth';
import { getUser } from '../../services/userService';

function DetailPage() {
  const { lectureId } = useParams(); //useParams()로 URL의 id를 꺼내고,
  const navigate = useNavigate();
  const [lecture, setLecture] = useState();
  // 초기상태: 비회원
  // 유저타입에 따른 수강신청 버튼 기능 다르게
  const [userType, setUserType] = useState('GUEST');

  //  a. useParams의 id값으로 해당 강의 정보 가져오기
  useEffect(() => {
    const fetchLecture = async () => {
      const data = await getLecture(lectureId); // Firestore에서 강의 하나 불러오기
      // console.log('firestore강의 데이터확인:', data);
      setLecture(data);
    };
    fetchLecture();
  }, [lectureId]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        //로그인 안한상태
        setUserType('GUEST');
        return;
      }
      try {
        const userData = await getUser(currentUser.uid);
        // console.log(' 로그인한 유저 정보:', userData);
        setUserType(userData.role);
      } catch (error) {
        // console.error('유저 정보 가져오기 실패:', error);
        setUserType('GUEST');
      }
    };
    fetchUserRole();
  }, []);

  //수강신청 버튼 클릭 이벤트
  const handleRegistLecture = () => {
    // 비회원일경우
    if (userType === 'GUEST') {
      const confirmSignup = window.confirm(
        '비회원 상태입니다. 회원가입 하시겠습니까?',
      );
      if (confirmSignup) {
        navigate(`/signup`); // 회원가입 페이지로 이동
      }
    } else if (userType === 'STUDENT') {
      // 학생일 경우
      // 1. 수강생 수 증가 ( firebase연동 후 추후 수정)
      setLecture((prev) => ({
        ...prev,
        enrollmentCount: prev.enrollmentCount + 1,
      }));

      // 2. 완료 메시지 확인 후 마이페이지 이동
      const confirmMypage = window.confirm(
        '수강신청이 완료되었습니다. 마이페이지로 이동하시겠습니까?',
      );
      if (confirmMypage) {
        navigate(`/mypage`); // 학생 마이페이지로 이동
      }
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
                {/* 나중에 firebase연동후 수정 */}
                <p className="teacher">{lecture?.authorId}</p>
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
          {userType !== 'TEACHER' && (
            <button
              className="lecture-regist-button"
              onClick={handleRegistLecture}
            >
              수강신청
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
