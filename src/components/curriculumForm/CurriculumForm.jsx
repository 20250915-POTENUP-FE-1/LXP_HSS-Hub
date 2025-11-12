import { nanoid } from 'nanoid';
import CurriculumInput from '../../components/curriculumInput/CurriculumInput';
import Button from '../common/button/Button';
import './CurriculumForm.css';

function CurriculumForm({
  formData,
  setFormData,
  handleSubmit,
  handlePrev,
  mode = 'regist',
  isLoading,
}) {
  const handleChangeLesson = (e) => {
    const target = e.target.dataset.order;
    setFormData((prev) => {
      const updated = prev.curriculum.map((lesson, idx) => {
        if (idx + 1 === parseInt(target)) {
          return { ...lesson, lessonTitle: e.target.value };
        }
        return lesson;
      });

      return {
        ...prev,
        curriculum: updated,
      };
    });
  };

  const handleAdd = () => {
    setFormData((prev) => {
      const updated = prev.curriculum;
      updated.push({
        lessonId: nanoid(),
        lessonTitle: '',
      });
      return {
        ...prev,
        curriculum: updated,
      };
    });
  };

  const handleDelete = (order) => {
    if (formData.curriculum.length <= 1) {
      alert('1개 이상의 강의는 필수로 등록해야 합니다.');
      return;
    }

    setFormData((prev) => {
      const updated = prev.curriculum.filter(
        (lesson, idx) => idx + 1 !== order,
      );
      return {
        ...prev,
        curriculum: updated,
      };
    });
  };

  return (
    <form className="curriculum-form">
      <div className="curriculum-length">
        {formData.curriculum.length}개의 강의
      </div>
      <div className="input-wrapper">
        {formData.curriculum.map((lesson, idx) => (
          <CurriculumInput
            key={idx}
            order={idx + 1}
            lesson={lesson}
            handleChangeLesson={handleChangeLesson}
            handleDelete={handleDelete}
          />
        ))}
        <Button variant="dashed" block={true} onClick={handleAdd}>
          강의 추가
        </Button>
      </div>

      <div className="buttons">
        <Button variant="ghost" size="md" onClick={() => handlePrev()}>
          이전
        </Button>
        <Button onClick={(e) => handleSubmit(e)} disabled={isLoading}>
          {mode === 'regist' ? '등록' : '수정'}
        </Button>
      </div>
    </form>
  );
}

export default CurriculumForm;
