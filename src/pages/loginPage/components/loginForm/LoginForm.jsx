import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/form/input/Input';
import FormField from '../../../../components/common/form/formField/FormField';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // TODO: 나중에 Firebase 로그인 로직(userService) 연결
    console.log('로그인 시도', { email, password });
  };

  return (
    <div className="loginForm-card">
      <h1 className="loginForm-title">로그인</h1>

      <form className="loginForm-container" onSubmit={handleSubmit}>
        <FormField label="이메일" htmlFor="login-email" required>
          <Input
            id="login-email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        <FormField label="비밀번호" htmlFor="login-password" required>
          <Input
            id="login-password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

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
