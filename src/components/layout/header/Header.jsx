// src/components/layout/header/Header.jsx
import './Header.css';
import { Infinity as Inf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/userSlice';

function Header({ type = 'none' }) {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    window.location.href = '/';
  };
  const handleLoginClick = () => navigate('/login');
  const handleMyPageClick = () => navigate('/mypage');
  const handleLogoutClick = async () => {
    try {
      await dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* 로고 */}
        <div className="header-logo" onClick={handleLogoClick}>
          <span className="header-logo-text">HSS</span>
          <Inf size={40} strokeWidth={3} className="header-logo-icon" />
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div className="header-actions">
          {type === 'login' && (
            <>
              <Button variant="clear" size="md" onClick={handleMyPageClick}>
                마이페이지
              </Button>
              <Button variant="clear" size="md" onClick={handleLogoutClick}>
                로그아웃
              </Button>
            </>
          )}

          {type === 'logout' && (
            <Button variant="clear" size="md" onClick={handleLoginClick}>
              로그인
            </Button>
          )}
          {/* type === 'none' → 아무 버튼도 안 뜸 */}
        </div>
      </div>
    </header>
  );
}

export default Header;
