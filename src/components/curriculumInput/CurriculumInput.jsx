import { Trash2 } from 'lucide-react';
import Button from '../common/button/Button';
import Input from '../common/form/input/Input';
import './CurriculumInput.css';

function CurriculumInput({ lesson, order, handleChangeLesson, handleDelete }) {
  return (
    <div className="curriculum-input">
      <div className="order">{order}.</div>
      <Input
        data-order={order}
        value={lesson.lessonTitle}
        onChange={(e) => handleChangeLesson(e)}
        placeholder={'세부 강의 제목을 입력해주세요'}
        style={{ padding: '10px 24px' }}
      />
      <div className="delete-btn">
        <Button variant="clear" size="sm" onClick={() => handleDelete(order)}>
          <Trash2 size={18} />
          삭제
        </Button>
      </div>
    </div>
  );
}

export default CurriculumInput;
