// src/layouts/mainLayout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import './MainLayout.css';
import { useSelector } from 'react-redux';

function MainLayout() {
  const { userInfo, loading } = useSelector((state) => state.user);
  const location = useLocation();
  const { pathname } = location;

  const getHeaderType = () => {
    if (!userInfo) {
      // 로그아웃 상태
      if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        // 로그인페이지거나 회원가입 페이지
        return 'none';
      } else {
        // 그냥 일반 로그아웃 상태
        return 'logout';
      }
    } else {
      // 로그인 상태
      return 'login';
    }
  };

  const headerType = getHeaderType();

  return (
    <div className="main-layout">
      <Header type={headerType} />
      <main className="main-layout-content">
        <Outlet />
      </main>
      <Footer />
      {loading && <span className="loader"></span>}
    </div>
  );
}

export default MainLayout;
