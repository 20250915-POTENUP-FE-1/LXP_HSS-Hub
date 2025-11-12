import { useState, useRef, useCallback, useEffect } from 'react';
import { CloudUpload, XCircle } from 'lucide-react';
import './ThumbnailInput.css';

// 허용할 이미지 파일 확장자 목록
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

function ThumbnailInput({ thumbnail, onFileChange }) {
  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 URL 상태
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const fileInputRef = useRef(null); // 숨겨진 file input에 대한 참조

  useEffect(() => {
    if (thumbnail) {
      if (typeof thumbnail === 'string') {
        setPreviewImage(thumbnail);
      } else if (
        thumbnail instanceof File &&
        ALLOWED_IMAGE_TYPES.includes(thumbnail.type)
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(thumbnail);
      } else {
        setPreviewImage(null);
      }
    } else {
      setPreviewImage(null);
    }
  }, [thumbnail]);

  // 파일 유효성 검사 및 미리보기 생성
  const handleFile = useCallback(
    (file) => {
      if (file && ALLOWED_IMAGE_TYPES.includes(file.type)) {
        // 유효한 이미지 파일인 경우
        const reader = new FileReader();
        reader.onloadend = () => {
          // 파일 읽기가 완료되면 미리보기 URL을 상태에 저장
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file); // 파일을 Data URL로 읽기

        // 부모 컴포넌트로 파일 객체 전달
        if (onFileChange) {
          onFileChange(file);
        }
      } else {
        // 허용되지 않는 파일 형식인 경우
        alert('PNG, JPG, GIF 파일만 업로드할 수 있습니다.');
        setPreviewImage(null); // 미리보기 초기화
        if (onFileChange) {
          onFileChange(null);
        }
      }
    },
    [onFileChange],
  );

  // 박스 클릭 시 파일 선택창 열기
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택창에서 파일이 변경되었을 때
  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  // 드래그 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleClearFile = (e) => {
    e.stopPropagation(); // 부모 div의 onClick 이벤트(파일 선택창 열기) 방지
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 실제 input 값 초기화
    }
    if (onFileChange) {
      onFileChange(null); // 부모 컴포넌트에 파일이 없음을 알림
    }
  };

  return (
    <div
      className={`thumbnail-input ${isDragging ? 'drag-over' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={ALLOWED_IMAGE_TYPES.join(',')} // input에서부터 파일 형식 필터링
        style={{ display: 'none' }}
      />

      {previewImage ? (
        // 미리보기 이미지가 있을 경우
        <>
          <img src={previewImage} alt="미리보기" className="image-preview" />
          <button
            className="clear-button"
            onClick={handleClearFile}
            aria-label="Clear image"
          >
            <XCircle size={24} />
          </button>
        </>
      ) : (
        // 기본 업로드 프롬프트
        <div className="upload-prompt">
          <span className="upload-icon">
            <CloudUpload size={48} />
          </span>
          <div>파일을 선택하거나 드래그 앤 드롭하세요</div>
          <p>PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
}

export default ThumbnailInput;
