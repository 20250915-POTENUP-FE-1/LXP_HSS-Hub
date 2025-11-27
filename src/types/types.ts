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
  category: 'web' | 'basic' | 'data' | 'ai';
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

export type { User, Lecture, Lesson };
