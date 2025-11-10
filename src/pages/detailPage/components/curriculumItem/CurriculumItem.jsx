import './CurriculumItem.css';

function CurriculumItem({ index, item }) {
  return (
    <div className="curriculum-item white-box">
      {/* index는 0부터 시작하므로 +1 */}
      강의 {index + 1} : {item.lessonTitle}
    </div>
  );
}

export default CurriculumItem;