import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/form/input/Input';
import FormField from '../../../../components/common/form/formField/FormField';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../../../store/userSlice';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    // 🔹 앞뒤 공백 제거
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // 상태 업데이트
    setEmail(trimmedEmail);
    setPassword(trimmedPassword);

    // 🔹 공백 또는 미입력 검증
    if (!trimmedEmail || !trimmedPassword) {
      dispatch(clearError());
      setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 🔹 로그인 시도
    const result = await dispatch(
      login({
        userEmail: trimmedEmail,
        password: trimmedPassword,
      }),
    );

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="loginForm-card">
      <h1 className="loginForm-title">로그인</h1>

      {/* ✅ onSubmit으로 제출 */}
      <form className="loginForm-container" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <FormField label="이메일" htmlFor="login-email">
          <Input
            id="login-email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))} // 공백 제거
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {/* 비밀번호 */}
        <FormField label="비밀번호" htmlFor="login-password">
          <div className="password-wrapper">
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))} // 공백 제거
              style={{ backgroundColor: '#F9FAFB', paddingRight: '40px' }}
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </FormField>

        {/* 에러 메시지 */}
        {loginError && <p className="loginForm-error">{loginError}</p>}
        {error && <p className="loginForm-error">{error}</p>}

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          block
          disabled={loading}
        >
          로그인
        </Button>
      </form>

      {/* 회원가입 링크 */}
      <p className="loginForm-bottomText">
        계정이 없으신가요?{' '}
        <Button
          variant="link"
          size="md"
          style={{ fontSize: '13px' }}
          onClick={() => navigate('/signup')}
        >
          회원가입
        </Button>
      </p>
    </div>
  );
}

export default LoginForm;
