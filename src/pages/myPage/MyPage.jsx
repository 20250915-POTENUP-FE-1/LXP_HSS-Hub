import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LectureList from '../../components/lectureList/LectureList';
import Button from '../../components/common/button/Button';
import './MyPage.css';
import { useSelector } from 'react-redux';
import { getLecturesByLectureIds } from '../../services/lectureService';

function MyPage() {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.user);

  const fetchLectures = async () => {
    try {
      setIsLoading(true);
      const result = await getLecturesByLectureIds(userInfo.lectureList);
      setLectures(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [userInfo]);

  return (
    <div className="mypage">
      <div className="mypage-wrapper">
        <div className="mypage-top">
          <p className="mypage-title">
            {userInfo.role === 'STUDENT' ? '내 수업' : '내 강의 관리'}
          </p>
          {userInfo.role === 'TEACHER' && (
            <Button size="md" radius="md" onClick={() => navigate('regist')}>
              <Plus size={12} />
              강의 등록
            </Button>
          )}
        </div>
        {!isLoading && lectures.length === 0 ? (
          <div className="mypage-no-lecture">등록된 강의가 없습니다.</div>
        ) : (
          <LectureList lectures={lectures} type={userInfo.role} />
        )}
      </div>
      {isLoading && <span className="loader" />}
    </div>
  );
}

export default MyPage;
