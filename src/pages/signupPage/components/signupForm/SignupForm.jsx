import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/common/form/input/Input';
import FormField from '../../../../components/common/form/formField/FormField';
import Button from '../../../../components/common/button/Button';
import './SignupForm.css';

function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: '',
    userEmail: '',
    password: '',
    passwordConfirm: '',
    role: 'STUDENT',
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

    if (
      !form.userEmail ||
      !form.password ||
      !form.passwordConfirm ||
      !form.userName
    ) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 시도', form);
  };

  return (
    <div className="form-card">
      <h1 className="form-title">회원가입</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <FormField label="이메일" htmlFor="signup-email" required>
          <Input
            id="signup-email"
            type="email"
            name="userEmail"
            placeholder="이메일을 입력하세요"
            value={form.userEmail}
            onChange={handleChange}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {/* 비밀번호 */}
        <FormField label="비밀번호" htmlFor="signup-password" required>
          <Input
            id="signup-password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={handleChange}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {/* 비밀번호 확인 */}
        <FormField
          label="비밀번호 확인"
          htmlFor="signup-password-confirm"
          required
        >
          <Input
            id="signup-password-confirm"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력하세요"
            value={form.passwordConfirm}
            onChange={handleChange}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {/* 이름 */}
        <FormField label="이름" htmlFor="signup-name" required>
          <Input
            id="signup-name"
            type="text"
            name="userName"
            placeholder="이름을 입력하세요"
            value={form.userName}
            onChange={handleChange}
            style={{ backgroundColor: '#F9FAFB' }}
          />
        </FormField>

        {/* 역할 선택 */}
        <FormField label="유형" required>
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
        </FormField>

        {/* 에러 메시지 */}
        {error && <p className="form-error">{error}</p>}

        {/* 회원가입 버튼 */}
        <Button type="submit" variant="primary" size="lg" block>
          회원가입
        </Button>
      </form>

      <p className="form-bottom-text">
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
