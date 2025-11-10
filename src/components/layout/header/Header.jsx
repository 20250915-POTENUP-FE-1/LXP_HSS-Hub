import './Header.css';
import { Infinity as Inf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // ✅ 로고 클릭 시 메인페이지('/')로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* ✅ 클릭 가능한 로고 (버튼처럼 보이지 않음) */}
        <div className="header-logo" onClick={handleLogoClick}>
          <span className="header-logo-text">HSS</span>
          <Inf size={40} strokeWidth={3} className="header-logo-icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
