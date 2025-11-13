import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepButton from '../../components/stepButton/StepButton';
import Button from '../../components/common/button/Button';
import BasicForm from '../../components/basicForm/BasicForm';
import CurriculumForm from '../../components/curriculumForm/CurriculumForm';
import './RegistPage.css';
import { createLecture } from '../../services/lectureService';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../store/userSlice';

function RegistPage() {
  const { userInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('basic');
  const [formData, setFormData] = useState({
    thumbnailURL: '',
    lectureTitle: '',
    category: '',
    price: '',
    description: '',
    curriculum: [
      {
        lessonId: nanoid(),
        lessonTitle: '',
      },
      {
        lessonId: nanoid(),
        lessonTitle: '',
      },
      {
        lessonId: nanoid(),
        lessonTitle: '',
      },
    ],
  });

  const handleChange = (e) => {
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
    if (formData.curriculum.some((lesson) => !lesson.lessonTitle)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkBasicInfo() || !checkCurriculumInfo()) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const lectureId = await createLecture({
        ...formData,
        authorId: userInfo.userId,
        authorName: userInfo.userName,
      });

      // 유저 정보 변경 하는 내용
      const updatedLectureList = [...userInfo.lectureList, lectureId];
      await dispatch(
        updateInfo({
          userId: userInfo.userId,
          userInfo: { lectureList: updatedLectureList },
        }),
      ).unwrap();
      navigate('/mypage', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickStep = (e) => {
    const target = e.target.name;
    if (target === 'curriculum') {
      if (!checkBasicInfo()) {
        alert('모든 정보를 입력해 주세요.');
        return;
      }
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
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default RegistPage;
