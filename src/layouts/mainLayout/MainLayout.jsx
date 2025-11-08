import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
