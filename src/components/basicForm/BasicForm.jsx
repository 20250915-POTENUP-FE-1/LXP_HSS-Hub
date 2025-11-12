import Input from '../../components/common/form/input/Input';
import Textarea from '../../components/common/form/textarea/Textarea';
import Select from '../../components/common/form/select/Select';
import ThumbnailInput from '../../components/thumbnailInput/ThumbnailInput';
import Button from '../common/button/Button';
import './BasicForm.css';

function BasicForm({ formData, setFormData, handleChange, handleNext }) {
  return (
    <form className="basic-form">
      <div className="form-input thumbnail">
        <div className="label">썸네일 업로드</div>
        <ThumbnailInput
          thumbnail={formData.thumbnailURL}
          onFileChange={(file) =>
            setFormData((prev) => ({ ...prev, thumbnailURL: file }))
          }
        />
      </div>
      <div className="form-input title">
        <div className="label">강의 제목</div>
        <Input
          id="lectureTitle"
          value={formData.lectureTitle}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, lectureTitle: e.target.value }));
          }}
          placeholder={'강의 제목을 입력하세요'}
        />
      </div>
      <div className="form-input catergory">
        <div className="label">카테고리 선택</div>
        <Select
          id="category"
          value={formData.category}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              category: e.target.value,
            }));
          }}
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          <option value="basic">코딩 기초</option>
          <option value="web">웹 개발</option>
          <option value="data">데이터 분석</option>
          <option value="ai">생성형 AI 활용</option>
        </Select>
      </div>
      <div className="form-input price">
        <div className="label">가격</div>
        <Input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => handleChange(e)}
          placeholder={'가격을 입력하세요'}
        />
      </div>
      <div className="form-input description">
        <div className="label">강의 설명</div>
        <Textarea
          id="description"
          value={formData.description}
          rows={6}
          onChange={(e) => handleChange(e)}
          placeholder={
            '수강생들이 강의에 대해 쉽게 이해할 수 있도록 명확하게 설명해주세요'
          }
        />
      </div>
      <div className="next">
        <Button variant="primary" size="md" onClick={handleNext}>
          다음
        </Button>
      </div>
    </form>
  );
}

export default BasicForm;
