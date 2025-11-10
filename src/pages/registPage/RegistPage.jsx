import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepButton from '../../components/stepButton/StepButton';
import Button from '../../components/common/button/Button';
import BasicForm from '../../components/basicForm/BasicForm';
import CurriculumForm from '../../components/curriculumForm/CurriculumForm';
import './RegistPage.css';

function RegistPage() {
  const navigate = useNavigate();
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
    <div className="regist-page">
      <div className="regist-page-wrapper">
        <div className="regist-page-top">
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
          />
        )}
      </div>
    </div>
  );
}

export default RegistPage;
