import CurriculumItem from './components/curriculumItem/CurriculumItem';
import './DetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag, UserRound, UsersRound } from 'lucide-react';
import { getLecture } from '../../services/lectureService';
import { useSelector } from 'react-redux';
// import { getAuth } from 'firebase/auth';
// import { getUser } from '../../services/userService';
// import { useDispatch, useSelector } from 'react-redux';

function DetailPage() {
  const { lectureId } = useParams(); //useParams()로 URL의 id를 꺼내고,
  const navigate = useNavigate();
  const [lecture, setLecture] = useState();
  // 초기상태: 비회원
  // 유저타입에 따른 수강신청 버튼 기능 다르게
  // const [userType, setUserType] = useState('GUEST');
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user)

  // Redux에서 userInfo 가져오기
  const userInfo = useSelector((state) => state.user.userInfo);
  const userRole = userInfo?.role || 'GUEST'; //로그인 안하면 GUEST

  //  a. useParams의 id값으로 해당 강의 정보 가져오기
  useEffect(() => {
    const fetchLecture = async () => {
      // console.log(lectureId);
      const data = await getLecture(lectureId); // Firestore에서 강의 불러오기
      // console.log(data);
      setLecture(data);
    };
    fetchLecture();
  }, [lectureId]);

  /*
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
        // console.log(userData);
        setUserType(userData.role);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
        setUserType('GUEST');
      }
    };
    fetchUserRole();
  }, []);
*/

  //수강신청 버튼 클릭 이벤트
  /*
  const handleRegistLecture = () => {
    // 비회원일경우
    if (userRole === 'GUEST') {
      const confirmSignup = window.confirm(
        '비회원 상태입니다. 회원가입 하시겠습니까?',
      );
      if (confirmSignup) {``
        navigate(`/signup`); // 회원가입 페이지로 이동
      }
    } else if (userRole === 'STUDENT') {
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
  */

  //수강신청 버튼 클릭 이벤트
  const handleRegistLecture = () => {
    if (userRole === 'GUEST') {
      if (window.confirm('비회원 상태입니다. 회원가입 하시겠습니까?')) {
        navigate(`/signup`);
      }
      return;
    }

    if (userRole === 'STUDENT') {
      // 학생일 경우 수강생 수 증가@@
      setLecture((prev) => ({
        ...prev, //@prev?
        enrollmentCount: prev.enrollmentCount + 1,
      }));

      if (
        window.confirm(
          '수강신청이 완료되었습니다. 마이페이지로 이동하시겠습니까?',
        )
      ) {
        navigate(`/mypage`);
      }
      return;
    }
  };

  //버튼 렌더링 조건
  // const renderRegisterButton = () => {
  //   if (userRole === 'TEACHER') return null; // TEACHER이면 버튼 안보임
  //   return (
  //     <button className="lecture-regist-button" onClick={handleRegistLecture}>
  //       {userRole === 'GUEST' ? '로그인 후 신청 가능' : '수강신청'}
  //     </button>
  //   );
  // };

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
          {userRole !== 'TEACHER' && (
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
