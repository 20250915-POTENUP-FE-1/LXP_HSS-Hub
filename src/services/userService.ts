// user firestore

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { User } from 'types/types';

const USERS_COLLECTION_NAME = 'users';

// 유저 정보 가져오기
export const getUser = async (userId: string): Promise<User> => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION_NAME, userId));
  return {
    userId: snapshot.id,
    ...snapshot.data(),
  } as User;
};

// 유저 정보 저장(생성) userId: authentication에서 만들어진 uid
export const createUser = async (
  userId: string,
  userInfo: Pick<User, 'userEmail' | 'userName' | 'role'>,
) => {
  await setDoc(doc(db, USERS_COLLECTION_NAME, userId), {
    ...userInfo,
    lectureList: [],
    createdAt: serverTimestamp(),
  });
};

export const updateUser = async (
  userId: string,
  userInfo: Pick<User, 'lectureList'>,
) => {
  await updateDoc(doc(db, USERS_COLLECTION_NAME, userId), {
    ...userInfo,
  });
};
