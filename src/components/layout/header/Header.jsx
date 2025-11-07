import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        {/* ✅ PNG 안에 아이콘 + HSSHUB 글자까지 다 있으니까 span 제거 */}
        <img
          src="/hsshub-logo.png"
          alt="HSSHUB 로고"
          className="header-logo-img"
        />
      </div>
    </header>
  );
}

export default Header;
