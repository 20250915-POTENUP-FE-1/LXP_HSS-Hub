// 전역 상태 관리(Slice를 모아서 등록)

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // {state: { user: { userInfo, loading, error } } }
  },
});

export default store;
