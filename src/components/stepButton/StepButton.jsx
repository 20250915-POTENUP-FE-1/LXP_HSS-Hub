import './StepButton.css';

function StepButton({ step, handleClick }) {
  return (
    <div className="step-button">
      <div className={`step-button-btn ${step === 'basic' ? 'active' : ''}`}>
        <button name="basic" onClick={(e) => handleClick(e)}>
          Step 1. 기본 정보 등록
        </button>
      </div>
      <div
        className={`step-button-btn ${step === 'curriculum' ? 'active' : ''}`}
      >
        <button name="curriculum" onClick={(e) => handleClick(e)}>
          Step 2. 커리큘럼 정보 등록
        </button>
      </div>
    </div>
  );
}

export default StepButton;
