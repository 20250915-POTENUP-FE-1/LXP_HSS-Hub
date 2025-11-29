import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import StepButton from '../../components/stepButton/StepButton';
import Button from '../../components/common/button/Button';
import BasicForm from '../../components/basicForm/BasicForm';
import CurriculumForm from '../../components/curriculumForm/CurriculumForm';
import './EditPage.css';
import { getLecture, updateLecture } from '../../services/lectureService';
import { Lecture, LectureRegistStep } from 'types/types';

function EditPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const [step, setStep] = useState<LectureRegistStep>('basic');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Lecture>>({
    thumbnailURL: '',
    lectureTitle: '',
    category: '',
    price: 0,
    description: '',
    curriculum: [],
  });
  const fetchLecture = async () => {
    setIsLoading(true);
    setFormData(await getLecture(lectureId!));
    setIsLoading(false);
  };

  useEffect(() => {
    // 정보 불러오기
    fetchLecture();
  }, []);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleNext = () => {
    if (checkBasicInfo()) {
      setStep('curriculum');
    } else {
      alert('모든 정보를 입력해 주세요.');
    }
  };

  const handlePrev = () => {
    setStep('basic');
  };

  const checkBasicInfo = () => {
    if (
      !formData.lectureTitle ||
      !formData.description ||
      !formData.category ||
      !formData.price
    ) {
      return false;
    }
    return true;
  };

  const checkCurriculumInfo = () => {
    if (formData.curriculum!.some((lesson) => !lesson.lessonTitle)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkBasicInfo() || !checkCurriculumInfo()) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await updateLecture(lectureId!, formData);
      alert('강의 수정이 완료되었습니다.');
      navigate('/mypage', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.name as LectureRegistStep; // currentTarget은 target과 달리 버튼 안에 요소가 있어도, 버튼을 가리킴
    if (target === 'curriculum') {
      if (!checkBasicInfo()) {
        alert('모든 정보를 입력해 주세요.');
        return;
      }
    }
    setStep(target);
  };

  return (
    <div className="edit-page">
      <div className="edit-page-wrapper">
        <div className="edit-page-top">
          <Button variant="clear" onClick={() => navigate('/mypage')}>
            <ArrowLeft />
            강의 목록
          </Button>
        </div>
        <StepButton step={step} onClick={handleClickStep} />
        {step === 'basic' ? (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            handleTextareaChange={handleTextareaChange}
            handleNext={handleNext}
          />
        ) : (
          <CurriculumForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            mode={'edit'}
            isLoading={isLoading}
          />
        )}
      </div>
      {isLoading && <span className="loader" />}
    </div>
  );
}

export default EditPage;
