// 전역 상태 관리(Slice를 모아서 등록)

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userSlice';
import storageSession from 'redux-persist/lib/storage/session'; // 1. rootReducer 설정
import { User } from 'types/types';

// 1. persist 설정
const persistConfig = {
  key: 'root', // 저장소에 저장될 키 이름
  storage: storageSession, // 로컬 스토리지 사용
  blacklist: ['user'], // user 리듀서만 저장하겠다 (생략 시 전체 저장)
};

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
  blacklist: ['role'],
};

// 2. 리듀서 합치기
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  // 다른 리듀서들...
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
