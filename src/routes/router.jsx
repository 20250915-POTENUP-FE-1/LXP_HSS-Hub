import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/mainLayout/MainLayout';
import MainPage from '../pages/mainPage/MainPage';
import LoginPage from '../pages/loginPage/LoginPage';
import SignupPage from '../pages/signupPage/SignupPage';
import DetailPage from '../pages/detailPage/DetailPage';
import MyPage from '../pages/myPage/MyPage';
import RegistPage from '../pages/registPage/RegistPage';
import EditPage from '../pages/editPage/EditPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      {
        path: 'detail/:lectureId', // 해당 강의 카드 클릭시 디테일페이지로이동
        element: <DetailPage />,
      },
      {
        path: 'mypage',
        children: [
          { index: true, element: <MyPage /> },
          { path: 'regist', element: <RegistPage /> },
          { path: 'edit', element: <EditPage /> },
        ],
      },
    ],
  },
]);
