import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import './MainPage.css';
import { lectures } from '../../data/dummy';

function MainPage() {
  // 전체 강의 리스트 상태관리 
  const [searchLecture, setSearchLectures] = useState([]); 

  useEffect(() => {
    setSearchLectures(lectures); 
  }, []);

  // 검색 실행 함수 (SearchBar에서 호출됨)
  const handleSearch = (keyword) => {
    if (!keyword.trim()) {
      // 검색어가 비어있으면 alert 표시
      alert('검색어를 입력해주세요.');
      return;
    }

    // 강의 제목 또는 설명에 키워드가 포함된 항목 필터링
    const filtered = lectures.filter(
      (lec) =>
        lec.lectureTitle.toLowerCase().includes(keyword.toLowerCase()) ||
        lec.description.toLowerCase().includes(keyword.toLowerCase())
    );

    setSearchLectures(filtered);
  };

  return (
    <main className="main-page">
      {/* 검색창 (검색 이벤트 전달) */}
      <SearchBar onSearch={handleSearch} />

      <div className="main-page-inside">
        <div className="main-page-top">
          <CategoryList />
          <Filter />
        </div>

        {/* 검색 결과 목록 표시 */}
        <LectureList lectures={searchLecture} />
      </div>
    </main>
  );
}

export default MainPage;
