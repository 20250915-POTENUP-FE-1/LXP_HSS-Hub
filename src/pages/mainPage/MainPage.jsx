import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import './MainPage.css';
import { lectures } from '../../data/dummy';

function MainPage() {
  // 화면에 표시할 강의 리스트 상태
  const [displayLectures, setDisplayLectures] = useState([]);

  // 현재 선택된 정렬 기준 상태 (latest: 최신순, popularity: 인기순)
  const [sortCondition, setSortCondition] = useState('latest');

  // 초기 렌더링 시 전체 강의 표시
  useEffect(() => {
    setDisplayLectures(sortLectures(lectures, sortCondition));
  }, []);

  // 🔹 검색 실행 함수
  const handleSearch = (keyword) => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    const filtered = lectures.filter(
      (lec) =>
        lec.lectureTitle.toLowerCase().includes(keyword.toLowerCase()) ||
        lec.description.toLowerCase().includes(keyword.toLowerCase()),
    );

    setDisplayLectures(sortLectures(filtered, sortCondition));
  };

  // 필터 변경 시 호출 함수
  const handleFilterChange = (condition) => {
    setSortCondition(condition);
    setDisplayLectures(sortLectures(displayLectures, condition));
  };

  // 정렬 로직
  const sortLectures = (lectureArray, condition) => {
    const sorted = [...lectureArray];
    if (condition === 'latest') {
      // 최신순: createdAt 기준 내림차순
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (condition === 'popularity') {
      // 인기순: enrollmentCount 기준 내림차순
      sorted.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
    }
    return sorted;
  };

  return (
    <main className="main-page">
      <SearchBar onSearch={handleSearch} />

      <div className="main-page-inside">
        <div className="main-page-top">
          <CategoryList />
          <Filter value={sortCondition} onChange={handleFilterChange} />
        </div>

        <LectureList lectures={displayLectures} />
      </div>
    </main>
  );
}

export default MainPage;
