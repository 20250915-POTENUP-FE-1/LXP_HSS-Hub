import './CurriculumItem.css';

// CurriculumItemProps : "CurriculumItem 컴포넌트가 받는 props의 타입은 이 interface와 정확히 일치해야 한다" 라고 TS에게 알려주는 것.
interface CurriculumItemProps {
  index: number;
  item: {
    lessonId: string;
    lessonTitle: string;
  };
}

/*
부모 컴포넌트로부터 index와 item이라는 데이터를 받습니다 (구조 분해 할당).
- `{ index, item }` → 부모로부터 받은 props를 구조분해 할당
- `: CurriculumItemProps` → 이 구조분해된 props가 `CurriculumItemProps` 구조와 일치하는지 **TypeScript가 검사**하도록 지정
*/
function CurriculumItem({ index, item }: CurriculumItemProps) {
  return (
    <div className="curriculum-item white-box">
      강의 {index + 1} : {item.lessonTitle}
    </div>
  );
}

export default CurriculumItem;
