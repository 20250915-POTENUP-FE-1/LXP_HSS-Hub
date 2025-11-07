import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
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
    <div className="auth-card">
      <h1 className="auth-title">로그인</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">
          이메일
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="auth-label">
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-button">
          로그인
        </button>
      </form>

      <p className="auth-bottom-text">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="auth-link">
          회원가입
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
