import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import StepButton from '../../components/stepButton/StepButton';
import Button from '../../components/common/button/Button';
import BasicForm from '../../components/basicForm/BasicForm';
import CurriculumForm from '../../components/curriculumForm/CurriculumForm';
import './EditPage.css';
import { lectures } from '../../data/dummy';

function EditPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const [step, setStep] = useState('basic');
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: '',
    category: '',
    price: '',
    description: '',
    curriculum: [
      {
        lessonId: '',
        lessonTitle: '',
      },
      {
        lessonId: '',
        lessonTitle: '',
      },
      {
        lessonId: '',
        lessonTitle: '',
      },
    ],
  });

  useEffect(() => {
    // 정보 불러오기
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(formData);
  };

  const handleNext = () => {
    // 유효성 체크
    setStep('curriculum');
  };

  const handlePrev = () => {
    setStep('basic');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 유효성 체크

    // firebase에 등록

    // 성공 시 mypage로 이동
    navigate('/mypage', { replace: true });
  };

  const handleClickStep = (e) => {
    const target = e.target.name;
    if (target === 'curriculum') {
      // 유효성 체크
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
        <StepButton step={step} handleClick={handleClickStep} />
        {step === 'basic' ? (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        ) : (
          <CurriculumForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            mode={'edit'}
          />
        )}
      </div>
    </div>
  );
}

export default EditPage;
