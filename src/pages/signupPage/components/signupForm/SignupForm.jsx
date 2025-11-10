import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../../components/common/form/input/Input';
import './SignupForm.css';

function SignupForm() {
  const [form, setForm] = useState({
    userEmail: '',
    password: '',
    passwordConfirm: '',
    userName: '',
    role: 'STUDENT', // 'STUDENT' | 'TEACHER'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password || !form.passwordConfirm || !form.name) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: Firebase 회원가입 로직 연결
    console.log('회원가입 시도', form);
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">회원가입</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">
          이메일
          <input
            type="userEmail"
            name="userEmail"
            placeholder="이메일을 입력하세요"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label className="auth-label">
          비밀번호
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
          />
        </label>

        <label className="auth-label">
          비밀번호 확인
          <Input placeholder="비밀번호를 다시 입력하세요" />
        </label>

        <label className="auth-label">
          이름
          <input
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            className="auth-input"
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <div className="auth-label">
          유형
          <div className="role-toggle">
            <button
              type="button"
              className={`role-btn ${
                form.role === 'STUDENT' ? 'role-btn--active' : ''
              }`}
              onClick={() => handleRoleChange('STUDENT')}
            >
              수강생
            </button>
            <button
              type="button"
              className={`role-btn ${
                form.role === 'TEACHER' ? 'role-btn--active' : ''
              }`}
              onClick={() => handleRoleChange('TEACHER')}
            >
              강사
            </button>
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-button">
          회원가입
        </button>
      </form>

      <p className="auth-bottom-text">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="auth-link">
          로그인하기
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;
