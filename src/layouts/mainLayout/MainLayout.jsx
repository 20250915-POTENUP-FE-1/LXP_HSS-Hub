import { Outlet } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
