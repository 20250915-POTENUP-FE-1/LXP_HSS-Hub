import './Header.css';
import { Infinity as Inf } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        {/* ✅ HSS + Lucide Infinity 아이콘 조합 */}
        <div className="header-logo">
          <span className="header-logo-text">HSS</span>
          <Inf size={40} strokeWidth={3} className="header-logo-icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
