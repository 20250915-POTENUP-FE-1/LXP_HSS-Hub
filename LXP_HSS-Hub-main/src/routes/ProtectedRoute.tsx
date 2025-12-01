import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'store/store';

function ProtectedRoute() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
