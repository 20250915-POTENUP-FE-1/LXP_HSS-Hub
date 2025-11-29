import React, { useState } from 'react';
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
import { updateInfo, UserState } from '../../store/userSlice';
import { AppDispatch, RootState } from 'store/store';
import { Lecture, LectureRegistStep } from 'types/types';

function RegistPage() {
  const { userInfo, loading } = useSelector(
    (state: RootState) => state.user,
  ) as UserState;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<LectureRegistStep>('basic');
  const [formData, setFormData] = useState<Partial<Lecture>>({
    thumbnailURL: '',
    lectureTitle: '',
    category: '',
    price: 0,
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
    try {
      setIsLoading(true);
      const lectureId = await createLecture({
        ...formData,
        authorId: userInfo!.userId,
        authorName: userInfo!.userName,
      });

      // 유저 정보 변경 하는 내용
      const updatedLectureList = [...userInfo!.lectureList, lectureId];
      await dispatch(
        updateInfo({
          userId: userInfo!.userId,
          userInfo: { lectureList: updatedLectureList },
        }),
      ).unwrap();
      alert('강의 등록이 완료되었습니다.');
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
    <div className="regist-page">
      <div className="regist-page-wrapper">
        <div className="regist-page-top">
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
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default RegistPage;
