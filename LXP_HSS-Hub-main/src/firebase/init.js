import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  setDoc,
  doc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = '';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const uid = user.uid;
    return uid;
    // 얘를 firestore 저장 시 userId로 넣어줘야함
    // firestore에 저장함
  } catch (error) {
    console.log(error);
    return null;
  }
}

const users = [
  {
    // 1. 학생 (이영희)
    userId: 'FMBvWlTT96XSYvBmfL8f63m3JaB2',
    userName: '이영희',
    userEmail: 'yh@naver.com',
    role: 'STUDENT',
    createdAt: '2025-11-01T09:15:00Z',
    // 수강 중인 강의 목록 (lectures 데이터의 lectureId와 일치)
    lectureList: [
      'c1Xz2Vb3N4mK5lL6jJ7h', // React.js 입문
      'g8H9jK0lM1nB2vC3xZ4q', // 왕초보를 위한 파이썬
      'w5E6rT7yU8iO9pA1sD2f', // 실무에서 바로 쓰는 SQL
    ],
  },
  {
    // 2. 강사 1 (박선생)
    userId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    userName: '박선생',
    userEmail: 'ss@naver.com',
    role: 'TEACHER',
    createdAt: '2025-10-15T14:30:00Z',
    // 등록(개설)한 강의 목록 (lectures 데이터의 lectureId와 일치)
    lectureList: [
      'a3sD4fG5hJ6kL8mN9bV2', // JS 마스터 클래스
      'g8H9jK0lM1nB2vC3xZ4q', // 왕초보 파이썬
      'G3hJ4kL5mN6bV7cZ8xQ9', // ChatGPT API
      'hJ1kL2mN3bV4cZ5xQ6wE', // Pandas 데이터 분석
      'kL3mN4bV5cZ6xQ7wE8rT', // Stable Diffusion
      'c1Xz2Vb3N4mK5lL6jJ7h', // React.js 입문
      'w5E6rT7yU8iO9pA1sD2f', // SQL 데이터 분석
      'wE4rT5yU6iO7pA8sD9fG', // Next.js 풀스택
      'rT7yU8iO9pA0sD1fG2hJ', // Java OOP
      'yU9iO0pA1sD2fG3hJ4kL', // CS 101
    ],
  },
];

// const uid1 = await signup('yh@naver.com', 'qwer1234');
// const uid2 = await signup('ss@naver.com', 'qwer1234');

// console.log(uid1, uid2);

const initUserData = async () => {
  users.forEach((user) => {
    setDoc(doc(db, 'users', user.userId), user);
  });
};

// initUserData();

const lectures = [
  // 1. web (인기 많음)
  {
    lectureId: 'a3sD4fG5hJ6kL8mN9bV2',
    lectureTitle: 'JavaScript 마스터 클래스: ES6부터 실전 프로젝트까지',
    category: 'web',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '웹 개발의 핵심, 자바스크립트를 A부터 Z까지 심층적으로 다룹니다. 실전 프로젝트를 통해 포트폴리오를 완성하세요.',
    thumbnailURL: '/src/assets/images/thumbnail_01.jpg',
    price: 180000,
    enrollmentCount: 1520,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'T3oB_R9gK7pWqXzL8vYcI',
        lessonTitle: '섹션 1: ES6 핵심 문법',
      },
      {
        lessonId: 'eN4jA-sD1vF0hG2kL5mN9',
        lessonTitle: '섹션 2: 비동기 처리 (Promise, async/await)',
      },
      {
        lessonId: 'P0oI9uY8tR7eW6qA5sD4',
        lessonTitle: '섹션 3: 실전 미니 프로젝트 - 투두리스트',
      },
    ],
  },
  // 2. web (중간)
  {
    lectureId: 'c1Xz2Vb3N4mK5lL6jJ7h',
    lectureTitle: 'React.js 입문: 기초부터 차근차근',
    category: 'web',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '가장 인기 있는 프론트엔드 라이브러리, 리액트의 기본기를 다집니다.',
    thumbnailURL: '/src/assets/images/thumbnail_02.jpg',
    price: 120000,
    enrollmentCount: 850,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'fG3hJ4kL6mN7bV8cZ0x',
        lessonTitle: '리액트 소개 및 개발 환경 세팅',
      },
      {
        lessonId: 'qW1eR2tY4uI5oP6aS7d',
        lessonTitle: '컴포넌트와 Props',
      },
      {
        lessonId: 'zL9xK8jH7gV6fB5dN4m',
        lessonTitle: 'State와 생명주기',
      },
      {
        lessonId: 'A_sD2fG3hJ4kL5mN6bV',
        lessonTitle: 'Hooks (useState, useEffect)',
      },
    ],
  },
  // 3. basic (가장 인기 많음, 오래됨)
  {
    lectureId: 'g8H9jK0lM1nB2vC3xZ4q',
    lectureTitle: '왕초보를 위한 파이썬 프로그래밍',
    category: 'basic',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '코딩이 처음이신 분들을 위한 파이썬 입문 강의입니다. 설치부터 기본 문법까지.',
    thumbnailURL: '/src/assets/images/thumbnail_03.jpg',
    price: 99000,
    enrollmentCount: 2100,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'rE5tY6uI7oP8aS9dF0g',
        lessonTitle: '파이썬 설치와 환경설정',
      },
      {
        lessonId: 'hJ1kL2mN3bV4cZ5xQ6w',
        lessonTitle: '변수와 자료형',
      },
      {
        lessonId: 'E7rT8yU9iO0pA-sD1f',
        lessonTitle: '조건문과 반복문',
      },
    ],
  },
  // 4. data (인기 많음)
  {
    lectureId: 'w5E6rT7yU8iO9pA1sD2f',
    lectureTitle: '실무에서 바로 쓰는 SQL 데이터 분석',
    category: 'data',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '데이터 분석의 필수 언어 SQL! 기초 문법부터 실무 쿼리 작성까지.',
    thumbnailURL: '/src/assets/images/thumbnail_04.jpg',
    price: 150000,
    enrollmentCount: 1300,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'gH2jK3lM4nB5vC6xZ7q',
        lessonTitle: '데이터베이스와 SQL 기초',
      },
      {
        lessonId: 'W8eR9tY0uI1oP2aS3d',
        lessonTitle: 'SELECT 쿼리 마스터',
      },
      {
        lessonId: 'F4gH5jK6lM7nB8vC9x',
        lessonTitle: 'JOIN과 서브쿼리',
      },
      {
        lessonId: 'Z0qW1eR2tY3uI4oP5a',
        lessonTitle: '데이터 그룹핑 (GROUP BY)',
      },
    ],
  },
  // 5. ai (최신) - ※ 날짜 변경 주의 (UTC 18:00 -> KST 익일 03:00)
  {
    lectureId: 'G3hJ4kL5mN6bV7cZ8xQ9',
    lectureTitle: 'ChatGPT API 활용: 나만의 AI 챗봇 만들기',
    category: 'ai',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      'OpenAI API를 활용하여 실제 작동하는 AI 챗봇 서비스를 만들어봅니다.',
    thumbnailURL: '/src/assets/images/thumbnail_05.jpg',
    price: 165000,
    enrollmentCount: 780,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'sD6fG7hJ8kL9mN0bV1c',
        lessonTitle: 'OpenAI API 키 발급 및 환경 세팅',
      },
      {
        lessonId: 'Z2xQ3wE4rT5yU6iO7p',
        lessonTitle: '기본 API 호출과 응답 처리',
      },
      {
        lessonId: 'A8sD9fG0hJ1kL2mN3b',
        lessonTitle: 'React로 챗봇 UI 만들기',
      },
    ],
  },
  // 6. web (중간)
  {
    lectureId: 'wE4rT5yU6iO7pA8sD9fG',
    lectureTitle: 'Next.js 풀스택 마스터: SSR과 SSG 정복',
    category: 'web',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '현대 웹 개발의 표준, Next.js를 이용한 서버 사이드 렌더링과 정적 사이트 생성을 배웁니다.',
    thumbnailURL: '/src/assets/images/thumbnail_06.jpg',
    price: 190000,
    enrollmentCount: 950,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'V4cZ5xQ6wE7rT8yU9i',
        lessonTitle: 'Next.js 소개와 라우팅',
      },
      {
        lessonId: 'O0pA-sD1fG2hJ3kL4m',
        lessonTitle: '데이터 페칭: SSR vs SSG',
      },
      {
        lessonId: 'N5bV6cZ7xQ8wE9rT0y',
        lessonTitle: 'API Routes로 백엔드 구현',
      },
      {
        lessonId: 'U1iO2pA-sD3fG4hJ5k',
        lessonTitle: 'Vercel 배포',
      },
    ],
  },
  // 7. data (중간) - ※ 날짜 변경 주의 (UTC 16:00 -> KST 익일 01:00)
  {
    lectureId: 'hJ1kL2mN3bV4cZ5xQ6wE',
    lectureTitle: '파이썬 Pandas 데이터 분석 실무',
    category: 'data',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '데이터 분석의 핵심 라이브러리 Pandas! 데이터 정제부터 시각화까지 한번에.',
    thumbnailURL: '/src/assets/images/thumbnail_07.jpg',
    price: 135000,
    enrollmentCount: 1120,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'L6mN7bV8cZ9xQ0wE1r',
        lessonTitle: 'DataFrame과 Series 이해',
      },
      {
        lessonId: 'T2yU3iO4pA-sD5fG6h',
        lessonTitle: '데이터 불러오기 및 정제',
      },
      {
        lessonId: 'J7kL8mN9bV0cZ1xQ2w',
        lessonTitle: '데이터 분석 및 시각화 기초',
      },
    ],
  },
  // 8. basic (중간)
  {
    lectureId: 'rT7yU8iO9pA0sD1fG2hJ',
    lectureTitle: 'Java로 배우는 객체 지향 프로그래밍 (OOP)',
    category: 'basic',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '프로그래밍의 핵심 패러다임, OOP를 Java 언어를 통해 확실하게 이해합니다.',
    thumbnailURL: '/src/assets/images/thumbnail_08.jpg',
    price: 140000,
    enrollmentCount: 980,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'E3rT4yU5iO6pA-sD7f',
        lessonTitle: '객체 지향이란?',
      },
      {
        lessonId: 'G8hJ9kL0mN1bV2cZ3x',
        lessonTitle: '클래스와 객체',
      },
      {
        lessonId: 'Q4wE5rT6yU7iO8pA-s',
        lessonTitle: '상속과 다형성',
      },
      {
        lessonId: 'D9fG0hJ1kL2mN3bV4c',
        lessonTitle: '추상 클래스와 인터페이스',
      },
    ],
  },
  // 9. ai (인기 적음)
  {
    lectureId: 'kL3mN4bV5cZ6xQ7wE8rT',
    lectureTitle: 'Stable Diffusion 이미지 생성 AI 활용법',
    category: 'ai',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      'WebUI 설치부터 프롬프트 엔지니어링, LoRA 활용까지. AI 아티스트가 되어보세요.',
    thumbnailURL: '/src/assets/images/thumbnail_09.jpg',
    price: 110000,
    enrollmentCount: 650,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'Z5xQ6wE7rT8yU9iO0p',
        lessonTitle: 'WebUI 설치 및 기본 사용법',
      },
      {
        lessonId: 'A-sD1fG2hJ3kL4mN5b',
        lessonTitle: '프롬프트 엔지니어링 기초',
      },
      {
        lessonId: 'V6cZ7xQ8wE9rT0yU1i',
        lessonTitle: 'ControlNet과 LoRA 활용하기',
      },
    ],
  },
  // 10. basic (인기 많음, 오래됨)
  {
    lectureId: 'yU9iO0pA1sD2fG3hJ4kL',
    lectureTitle: '개발자 필수: 컴퓨터 사이언스 101',
    category: 'basic',
    authorId: '2udvwRp51XetB6WF5NGJEQC6Lyh1',
    authorName: '박선생',
    description:
      '비전공자도 이해할 수 있는 CS 핵심 지식. 자료구조, 알고리즘, 네트워크 기초.',
    thumbnailURL: '/src/assets/images/thumbnail_10.jpg',
    price: 170000,
    enrollmentCount: 1450,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    curriculum: [
      {
        lessonId: 'O2pA-sD3fG4hJ5kL6m',
        lessonTitle: '자료구조 (배열, 리스트, 스택, 큐)',
      },
      {
        lessonId: 'N7bV8cZ9xQ0wE1rT2y',
        lessonTitle: '알고리즘 기초 (정렬, 탐색)',
      },
      {
        lessonId: 'U3iO4pA-sD5fG6hJ7k',
        lessonTitle: '네트워크 (OSI 7계층, TCP/IP)',
      },
      {
        lessonId: 'L8mN9bV0cZ1xQ2wE3r',
        lessonTitle: '운영체제 (프로세스, 스레드)',
      },
    ],
  },
];

const initLectureData = async () => {
  lectures.forEach((lecture) => {
    setDoc(doc(db, 'lectures', lecture.lectureId), lecture);
  });
};

initLectureData();
