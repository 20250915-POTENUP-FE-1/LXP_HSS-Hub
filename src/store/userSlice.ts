// redux toolkit을 사용한 전역 상태 관리
// createAsyncThunk를 통해 로그인, 로그아웃 처리

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUser, getUser, updateUser } from '../services/userService';
import { User } from 'types/types';

interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string;
}

interface CustomError {
  code?: string;
  message?: string;
}

// 전역으로 관리할 상태
const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: '',
};

export const signup = createAsyncThunk(
  'user/signup',
  async (payload: User & { password: string }, { rejectWithValue }) => {
    // payload: 유저정보 객체(패스워드 포함) (userEmail: "", password: "", userName: "", ...)
    try {
      // authentication에 정보 보내기
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.userEmail,
        payload.password,
      );
      const uid = userCredential.user.uid;
      await auth.signOut();
      // firestore에 저장
      await createUser(uid, {
        userEmail: payload.userEmail,
        role: payload.role,
        userName: payload.userName,
      });

      return;
    } catch (err) {
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      const error = err as CustomError;

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
  async (payload: User & { password: string }, { rejectWithValue }) => {
    // payload : { userEmail: "", password: ""}
    try {
      // authentication
      await signInWithEmailAndPassword(
        auth,
        payload.userEmail,
        payload.password,
      );

      return;
    } catch (err) {
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      const error = err as CustomError;
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
    } catch (err) {
      const error = err as CustomError;
      return rejectWithValue(error.message);
    }
  },
);

export const updateInfo = createAsyncThunk(
  'user/updateInfo',
  async (payload: { userId: string; userInfo: User }, { rejectWithValue }) => {
    try {
      await updateUser(payload.userId, payload.userInfo);
      const userInfo = await getUser(payload.userId);
      return { userInfo };
    } catch (error) {
      return rejectWithValue(error);
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
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    // 1. 회원가입 액션 처리
    builder
      .addCase(signup.pending, (state: UserState) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signup.fulfilled, (state: UserState) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // 2. 로그인 액션 처리
    builder
      .addCase(login.pending, (state: UserState) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state: UserState) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // 3. 로그아웃 액션 처리
    builder
      .addCase(logout.pending, (state: UserState) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logout.fulfilled, (state: UserState) => {
        state.userInfo = null;
        state.error = '';
        state.loading = false;
      })
      .addCase(logout.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // 4. 유저 정보 수정 액션 처리
    builder
      .addCase(updateInfo.pending, (state: UserState) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateInfo.fulfilled, (state: UserState, action) => {
        state.userInfo = action.payload.userInfo;
        state.loading = false;
        state.error = '';
      })
      .addCase(updateInfo.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
