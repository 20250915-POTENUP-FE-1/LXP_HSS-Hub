import { FieldValue } from 'firebase/firestore'; // serverTimeStamp의 결과 타입이 FieldValue라고 함

type User = {
  userId: string;
  userName: string;
  userEmail: string;

  role: 'STUDENT' | 'TEACHER';

  createdAt: FieldValue;
  lectureList: string[];
};

type Lecture = {
  lectureId: string;
  lectureTitle: string;
  category: 'web' | 'basic' | 'data' | 'ai' | ''; // 초기 등록 시 select 부분에서 빈 값으로 입력되기 때문에 빈 값도 추가
  authorId: string | null;
  authorName: string;
  description: string;
  thumbnailURL: string;
  price: number;
  enrollmentCount: number;

  createdAt: FieldValue;
  updatedAt: FieldValue;

  curriculum: Lesson[];
};

type Lesson = {
  lessonId: string;
  lessonTitle: string;
};

type Category = Lecture['category'] | 'all';
type Sort = 'createdAt' | 'enrollmentCount';
type LectureRegistStep = 'basic' | 'curriculum';

export type { User, Lecture, Lesson, Category, Sort, LectureRegistStep };
