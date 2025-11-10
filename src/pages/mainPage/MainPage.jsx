import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import './MainPage.css';
import { lectures } from '../../data/dummy';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [keyword, setKeyword] = useState('');
  // 전체 강의 리스트 상태 관리
  const [displayLectures, setDisplayLectures] = useState([]);
  // 정렬 기준(최신순/인기순) 상태관리
  const [sortCondition, setSortCondition] = useState('latest');
  //선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('전체');
  //강의 아이템 클릭시 디테일페이지로 이동 네비게이션 관리
  const navigate = useNavigate();

  // 초기 렌더링 시 전체 강의 표시
  useEffect(() => {
    setDisplayLectures(sortLectures(lectures, sortCondition));
  }, []);

  // 검색 기능 구현
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
    setSelectedCategory('전체');

    setDisplayLectures(sortLectures(filtered, sortCondition));
  };

  // 정렬 기능 구현
  const handleFilterChange = (condition) => {
    setSortCondition(condition);
    setDisplayLectures(sortLectures(displayLectures, condition));
  };

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

  // 카테고리 선택 기능 구현
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // 현재 선택 카테고리 상태 업데이트

    if (category === '전체') {
      setKeyword(''); //키워드 초기화
      setDisplayLectures(sortLectures(lectures, sortCondition)); // 전체 강의 표시
    } else {
      const filtered = displayLectures.filter(
        (lec) => lec.category.toLowerCase() === category.toLowerCase(),
      );
      setDisplayLectures(sortLectures(filtered, sortCondition)); // 선택한 카테고리 강의만 표시
    }
  };

  //강의 버튼 클릭시 디테일페이지로 이동
  const handleLectureClick = (lectureId) => {
    navigate(`/detail/${lectureId}`);
  };

  return (
    <main className="mainpage">
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />

      <div className="mainpage-top">
        <CategoryList
          selected={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <Filter value={sortCondition} onChange={handleFilterChange} />
      </div>

      <LectureList
        lectures={displayLectures}
        onLectureClick={handleLectureClick}
      />
    </main>
  );
}

export default MainPage;
