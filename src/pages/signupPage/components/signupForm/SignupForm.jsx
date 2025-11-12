import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/common/form/input/Input';
import FormField from '../../../../components/common/form/formField/FormField';
import Button from '../../../../components/common/button/Button';
import './SignupForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../../store/userSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    userEmail: '',
    password: '',
    passwordConfirm: '',
    role: 'STUDENT',
  });

  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [signupError, setSignupError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPw, setShowPw] = useState(false); // 비밀번호 보이기/숨기기
  const [showPw2, setShowPw2] = useState(false); // 비밀번호 확인 보이기/숨기기

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handlePasswordCheck = (e) => {
    const type = e.target.name;
    if (type === 'password') {
      if (!e.target.value) {
        setPasswordError('');
      }
    } else {
      // passwordConfirm
      if (form.password && form.password !== e.target.value) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');

    if (
      !form.userEmail ||
      !form.password ||
      !form.passwordConfirm ||
      !form.name
    ) {
      setSignupError('모든 항목을 입력해주세요.');
      return;
    }

    try {
      await dispatch(
        signup({
          userName: form.name,
          userEmail: form.userEmail,
          password: form.password,
          role: form.role,
        }),
      );
    } catch (error) {
      console.log(error);
      return;
    }
    navigate('/login');
  };

  return (
    <div className="signupForm-card">
      <h1 className="signupForm-title">회원가입</h1>

      <form
        className="signupForm-container"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* 이메일 */}
        <FormField label="이메일" htmlFor="signup-email" required>
          <Input
            id="signup-email"
            type="email"
            name="userEmail"
            placeholder="이메일을 입력하세요"
            value={form.userEmail}
            onChange={handleChange}
          />
        </FormField>

        {/* 비밀번호 */}
        <FormField label="비밀번호" htmlFor="signup-password" required>
          <div className="password-wrapper">
            <Input
              id="signup-password"
              type={showPw ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={(e) => {
                handleChange(e);
                handlePasswordCheck(e);
              }}
              style={{ backgroundColor: '#F9FAFB', paddingRight: '40px' }}
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보이기'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPw((v) => !v)}
            >
              {showPw ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>
        </FormField>

        {/* 비밀번호 확인 */}
        <FormField
          label="비밀번호 확인"
          htmlFor="signup-password-confirm"
          required
          error={passwordError}
        >
          <div className="password-wrapper">
            <Input
              id="signup-password-confirm"
              type={showPw2 ? 'text' : 'password'}
              name="passwordConfirm"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.passwordConfirm}
              onChange={(e) => {
                handleChange(e);
                handlePasswordCheck(e);
              }}
              style={{ backgroundColor: '#F9FAFB', paddingRight: '40px' }}
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPw2 ? '비밀번호 숨기기' : '비밀번호 보이기'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPw2((v) => !v)}
            >
              {showPw2 ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>
        </FormField>

        {/* 이름 */}
        <FormField label="이름" htmlFor="signup-name" required>
          <Input
            id="signup-name"
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={handleChange}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {/* 역할 선택 */}
        <FormField label="유형" required>
          <div className="signupForm-roleToggle">
            <button
              type="button"
              className={`signupForm-roleBtn ${
                form.role === 'STUDENT' ? 'signupForm-roleBtn--active' : ''
              }`}
              onClick={() => handleRoleChange('STUDENT')}
            >
              수강생
            </button>
            <button
              type="button"
              className={`signupForm-roleBtn ${
                form.role === 'TEACHER' ? 'signupForm-roleBtn--active' : ''
              }`}
              onClick={() => handleRoleChange('TEACHER')}
            >
              강사
            </button>
          </div>
        </FormField>

        {/* 에러 메시지 */}
        {signupError && <p className="signupForm-error">{signupError}</p>}
        {error && <p className="signupForm-error">{error}</p>}

        {/* 회원가입 버튼 */}
        <Button type="submit" variant="primary" size="lg" block>
          회원가입
        </Button>
      </form>

      <p className="signupForm-bottomText">
        이미 계정이 있으신가요?{' '}
        <Button
          variant="link"
          size="md"
          style={{ fontSize: '13px' }}
          onClick={() => navigate('/login')}
        >
          로그인
        </Button>
      </p>
    </div>
  );
}

export default SignupForm;
