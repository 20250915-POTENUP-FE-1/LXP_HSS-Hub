import { ButtonHTMLAttributes } from 'react';
import './StepButton.css';

interface StepButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  step: 'basic' | 'curriculum';
}

function StepButton({ step, onClick }: StepButtonProps) {
  return (
    <div className="step-button">
      <div className={`step-button-btn ${step === 'basic' ? 'active' : ''}`}>
        <button name="basic" onClick={onClick}>
          Step 1. 기본 정보 등록
        </button>
      </div>
      <div
        className={`step-button-btn ${step === 'curriculum' ? 'active' : ''}`}
      >
        <button name="curriculum" onClick={onClick}>
          Step 2. 커리큘럼 정보 등록
        </button>
      </div>
    </div>
  );
}

export default StepButton;
