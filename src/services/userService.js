// user firestore

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const USERS_COLLECTION_NAME = 'users';

// 유저 정보 가져오기
export const getUser = async (userId) => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION_NAME, userId));
  return {
    userId: snapshot.id,
    ...snapshot.data(),
  };
};

// 유저 정보 저장(생성) userId: authentication에서 만들어진 uid
export const createUser = async (userId, userInfo) => {
  await setDoc(doc(db, USERS_COLLECTION_NAME, userId), {
    ...userInfo,
    lectureList: [],
    createdAt: serverTimestamp(),
  });
};
