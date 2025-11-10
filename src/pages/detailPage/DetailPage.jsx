import CurriculumItem from './components/curriculumItem/CurriculumItem';
import Button from '../../../src/components/common/button/Button';
import './DetailPage.css';
import { lectures } from '../../data/dummy';
import { useParams } from 'react-router-dom';

function DetailPage() {
  const { lectureId } = useParams();

  const lecture = lectures.find((lec) => lec.lectureId === lectureId);

  return (
    <div className="detailpage">
      <div className="detailpage-wrapper">
        <div className="detailpage-left">
          <picture className="detailpage-thumbnail">
            <img src={lecture.thumbnailURL} alt={lecture.lectureTitle} />
          </picture>

          <div className="detailpage-desc">
            <h2>강의 상세 설명</h2>
            <p>{lecture.description}</p>
          </div>
          <div className="detailpage-curriculum">
            <h2>커리큘럼</h2>
            {/* <CurriculumItem /> */}
            {/* @@코드해석 */}
            {lecture.curriculum.map((item) => (
              <CurriculumItem key={item.lessonId} item={item} />
            ))}
          </div>
        </div>

        <div className="detailpage-inform">
          <h2 className="detailpage-inform-title">{lecture.lectureTitle}</h2>

          <div className="detailpage-inform-list">
            <ul>
              <li>
                <div className="category-box">{lecture.category}</div>
              </li>
              <li>
                <em>강사명: </em>
                {/* authorId?? @@ */}
                <p className="teacher">{lecture.authorId}</p>
              </li>
              <li>
                <em>가격:</em>
                <p className="price">{lecture.price.toLocaleString()} 원</p>
              </li>
              <li>
                <em>수강생 수:</em>
                <p className="enrollment-count">
                  {lecture.enrollmentCount.toLocaleString()} 명
                </p>
              </li>
            </ul>
          </div>

          <div className="actions">
            {/* Button 컴포넌트 사용, variant="secondary" → 스타일 옵션 지정 */}
            {/* 버튼 잘 불러오고 있는거맞는지? @@ */}
            <Button variant="secondary">수강신청</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
