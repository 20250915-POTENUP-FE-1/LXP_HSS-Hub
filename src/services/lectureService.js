// lecture firestore

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const LECTURES_COLLECTION_NAME = 'lectures';

// 전체 강의 조회(필터링, 정렬, 검색어를 인수로 받아서) sort: createdAt | enrollmentCount
// 반환 값은 필터링, 정렬, 검색어 옵션이 처리되어서 반환됨
export const getLectures = async (category, sort, keyword) => {
  let q = null;
  // 카테고리 전체면, 모든 강의 가져오기
  if (category === 'all') {
    // 카테고리 전체, 인기순 정렬
    q = query(collection(db, LECTURES_COLLECTION_NAME), orderBy(sort, 'desc'));
  } else {
    // 카테고리 전체 아니고, 해당 카테고리만 가져오기
    q = query(
      collection(db, LECTURES_COLLECTION_NAME),
      where('category', '==', category),
      orderBy(sort, 'desc'),
    );
  }

  const snapshot = await getDocs(q);

  const result = [];
  snapshot.docs.forEach((doc) => {
    result.push({ lectureId: doc.id, ...doc.data() });
  });

  // 키워드 필터링 로직
  if (keyword) {
    const filtered = result.filter((lecture) =>
      lecture.lectureTitle.includes(keyword),
    );
    return filtered;
  } else {
    return result;
  }
};

// lectureId 배열로 강의 가져오기
export const getLecturesByLectureIds = async (lectureIds) => {
  const lecutrePromise = lectureIds.map(async (lectureId) => {
    const lec = await getLecture(lectureId);
    return lec;
  });

  const result = Promise.all(lecutrePromise);
  return result;
};

// 특정 강의 조회(강의 ID)
export const getLecture = async (lectureId) => {
  const snapshot = await getDoc(doc(db, LECTURES_COLLECTION_NAME, lectureId));
  return {
    lectureId: snapshot.id,
    ...snapshot.data(),
  };
};

// 강의 추가(사용자가 입력한 강의 정보)
export const createLecture = async (lectureInfo) => {
  const docRef = await addDoc(collection(db, LECTURES_COLLECTION_NAME), {
    ...lectureInfo,
    enrollmentCount: 0,
    thumbnailURL: '/src/assets/images/thumbnail_10.jpg',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

// 강의 수정(강의ID, 수정한 강의 정보)
export const updateLecture = async (lectureId, lectureInfo) => {
  await updateDoc(doc(db, LECTURES_COLLECTION_NAME, lectureId), {
    ...lectureInfo,
    updatedAt: serverTimestamp(),
  });
};

// 강의 삭제(강의ID)
export const deleteLecture = async (lectureId) => {
  await deleteDoc(doc(db, LECTURES_COLLECTION_NAME, lectureId));
};
