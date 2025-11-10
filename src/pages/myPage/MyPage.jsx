import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { userStudent, userTeacher, lectures } from '../../data/dummy';
import { useNavigate } from 'react-router-dom';
import LectureList from '../../components/lectureList/LectureList';
import Button from '../../components/common/button/Button';
import './MyPage.css';

function MyPage() {
  const navigate = useNavigate();
  // TODO: 전역에서 user 역할 가져오기
  const [lecs, setLecs] = useState([]); // 임시
  const [user, setUser] = useState(); // 임시

  useEffect(() => {
    // TODO: firestore에서 uid로 역할 검증 후, 강의 가져오기
    setLecs(lectures);
    setUser(userStudent);
  }, []);

  return (
    <div className="mypage">
      <div className="mypage-wrapper">
        <div className="mypage-top">
          <p className="mypage-title">
            {user?.role === 'STUDENT' ? '내 수업' : '내 강의 관리'}
          </p>
          <Button size="md" radius="md" onClick={() => navigate('regist')}>
            <Plus size={12} />
            강의 등록
          </Button>
        </div>
        {/* type 임시로 넣어줌 */}
        <LectureList lectures={lectures} type={'TEACHER'} />
      </div>
    </div>
  );
}

export default MyPage;
