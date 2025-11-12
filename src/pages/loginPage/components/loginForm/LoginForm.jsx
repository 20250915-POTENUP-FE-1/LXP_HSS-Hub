import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/form/input/Input';
import FormField from '../../../../components/common/form/formField/FormField';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../../../store/userSlice';

function LoginForm() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

      <form className="loginForm-container" onSubmit={handleSubmit}>
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
          <Input
            id="login-password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {loginError && <p className="loginForm-error">{loginError}</p>}
        {error && <p className="loginForm-error">{error}</p>}

        <Button type="submit" variant="primary" size="lg" block>
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
    </div>
  );
}

export default LoginForm;
