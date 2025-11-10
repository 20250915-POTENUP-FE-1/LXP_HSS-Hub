// src/layouts/mainLayout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import './MainLayout.css';

function MainLayout() {
  const location = useLocation();
  const { pathname } = location;

  const getHeaderType = () => {
    // 2) 로그인 페이지: 로고만 (버튼 없음)
    if (pathname.startsWith('/login')) return 'none';

    // 3) 회원가입 페이지: 로고만 (버튼 없음)
    if (pathname.startsWith('/signup')) return 'none';

    // 1) 메인페이지(비회원 기준): 로그인 버튼만
    if (pathname === '/') return 'logout';

    // 그 외 페이지: 일단 버튼 없음
    return 'none';
  };

  const headerType = getHeaderType();

  return (
    <div className="main-layout">
      <Header type={headerType} />
      <main className="main-layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
