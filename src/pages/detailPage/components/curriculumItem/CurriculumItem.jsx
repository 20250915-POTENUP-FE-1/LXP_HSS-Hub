import './CurriculumItem.css';

function CurriculumItem({ index, item }) {
  return (
    <div className="curriculum-item white-box">
      강의 {index + 1} : {item.lessonTitle}
    </div>
  );
}

export default CurriculumItem;