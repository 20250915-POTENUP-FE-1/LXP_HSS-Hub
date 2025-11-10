import CurriculumItem from './components/curriculumItem/CurriculumItem';
import Button from '../../../src/components/common/button/Button';
import './DetailPage.css';
import { lectures } from '../../data/dummy';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag, UserRound, UsersRound } from 'lucide-react';

function DetailPage() {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState();

  useEffect(() => {
    getLecture(lectureId);
  }, [lectureId]); //  lectureId 변경 시에도 새로 불러오도록 수정

  const getLecture = (lectureId) => {
    const target = lectures.find((lec) => lec.lectureId === lectureId);
    setLecture(target);
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
                  강사명:{' '}
                </em>
                {/* 나중에 firebase연동 */}
                <p className="teacher">{lecture?.authorId}</p>
              </li>
              <li>
                <em>
                  <Tag size={22} color="#fff" fill="#64748B" />
                  가격:
                </em>
                {/* 수강생 수랑 똑같이 스타일 넣어주시고 ₩표시말고 뒤에 원으로 붙여주세요! lectureCard도 그렇게 구현 */}
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


          {/* 비회원일경우 => 비회원상태입니다. 회원가입하시겠습니까? 이동하기전에 confirm으로 한 번 묻고 확인 시 => 회원가입 페이지로 이동
          학생의 경우 상세 페이지에서 수강신청 버튼이 보여지며, 수강신청을 누르면, 수강신청이 완료되며, 마이 페이지로 이동할지 안할지 선택(이동하기전에 confirm으로 한 번 묻고 확인 시) => 마이페이지 이동한다고하면 마이페이지로 이동
          강사의 경우 상세페이지에서 수강신청 버튼이 보이지 않음 */}
          {/* <div className="lecture-regist-button">
            <Button variant="primary" block={true} size="lg" radius="md" font- >
              수강신청
            </Button>
          </div> */}
          <button></button>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
