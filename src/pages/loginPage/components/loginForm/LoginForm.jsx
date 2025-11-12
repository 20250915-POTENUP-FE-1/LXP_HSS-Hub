import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/form/input/Input';
import FormField from '../../../../components/common/form/formField/FormField';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../../../store/userSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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

    if (!email || !password) {
      dispatch(clearError());
      setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const result = await dispatch(
      login({
        userEmail: email,
        password: password,
      }),
    );
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="loginForm-card">
      <h1 className="loginForm-title">로그인</h1>

      <form className="loginForm-container">
        <FormField label="이메일" htmlFor="login-email">
          <Input
            id="login-email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        <FormField label="비밀번호" htmlFor="login-password">
          <div className="password-wrapper">
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'} // 👈 비밀번호 보이기/숨기기
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: '#F9FAFB', paddingRight: '40px' }} // 아이콘 자리 확보
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
              onMouseDown={(e) => e.preventDefault()} // 포커스 유지
              onClick={() => setShowPassword((v) => !v)} // 👈 토글
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </FormField>

        {loginError && <p className="loginForm-error">{loginError}</p>}
        {error && <p className="loginForm-error">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          block
          disabled={loading}
          onClick={handleSubmit}
        >
          로그인
        </Button>
      </form>

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
      {loading && <span className="loader" />}
    </div>
  );
}

export default LoginForm;
