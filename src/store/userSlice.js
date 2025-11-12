// redux toolkit을 사용한 전역 상태 관리
// createAsyncThunk를 통해 로그인, 로그아웃 처리

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUser, getUser } from '../services/userService';

// 전역으로 관리할 상태
const initialState = {
  userInfo: null,
  loading: false,
  error: '',
};

export const signup = createAsyncThunk(
  'user/signup',
  async (payload, { rejectWithValue }) => {
    // payload: 유저정보 객체(패스워드 포함) (userEmail: "", password: "", userName: "", ...)
    try {
      // authentication에 정보 보내기
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.userEmail,
        payload.password,
      );
      const uid = userCredential.user.uid;
      // firestore에 저장
      await createUser(uid, {
        userEmail: payload.userEmail,
        role: payload.role,
        userName: payload.userName,
      });

      //
    } catch (error) {
      let errorMessage = '회원가입 중 오류가 발생했습니다.';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = '올바른 이메일 형식이 아닙니다.';
          break;
        case 'auth/weak-password':
          errorMessage = '더 안전한 비밀번호를 설정해 주세요.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = '이미 사용중인 이메일입니다.';
          break;
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    // payload : { userEmail: "", password: ""}
    try {
      // authentication 검
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.userEmail,
        payload.password,
      );

      const uid = userCredential.user.uid;

      // firestore에 정보 요청
      const userInfo = await getUser(uid);
      return { userInfo };
    } catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = '올바른 이메일 형식이 아닙니다.';
          break;
        case 'auth/invalid-credential':
          errorMessage = '계정이 존재하지 않거나 비밀번호가 일치하지 않습니다.';
          break;
        case 'auth/too-many-requests':
          errorMessage =
            '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
          break;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return '로그아웃 완료';
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1. 회원가입 액션 처리
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // 2. 로그인 액션 처리
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // 3. 로그아웃 액션 처리
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.error = '';
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser } = userSlice.actions;

export default userSlice.reducer;
