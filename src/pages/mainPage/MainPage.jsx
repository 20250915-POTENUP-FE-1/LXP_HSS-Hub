import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import './MainPage.css';
import { lectures } from '../../data/dummy';
import { useNavigate } from 'react-router-dom';
import { getLectures } from '../../services/lectureService';

function MainPage() {
  const [keyword, setKeyword] = useState('');
  // 전체 강의 리스트 상태 관리
  const [displayLectures, setDisplayLectures] = useState([]);
  // 정렬 기준(최신순/인기순) 상태관리
  const [sortCondition, setSortCondition] = useState('createdAt');
  //선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('all');
  // 강의 클릭시 해당 디테일 페이지 이동
  const navigate = useNavigate();

  // 초기 렌더링 시 전체 강의 표시
  // useEffect(() => {
  //   setDisplayLectures(sortLectures(lectures, sortCondition));
  // }, []);
  // useEffect(() => {
  //   const fetchLectures = async () => {
  //     const data = await getLectures(
  //       selectedCategory,
  //       sortCondition,
  //       keyword || '',
  //     );
  //     console.log('Firebase에서 가져온 데이터:', data);
  //     setDisplayLectures(data);
  //   };
  //   fetchLectures();
  // }, [selectedCategory, sortCondition, keyword]);

  // 모든 조회를 하나로 관리
  const fetchAndSetLectures = async (category, sort, searchKeyword) => {
    const data = await getLectures(category, sort, searchKeyword);
    setDisplayLectures(data);
  };

  // 초기 렌더링 및 상태 변화 시 Firebase 조회
  useEffect(() => {
    fetchAndSetLectures(selectedCategory, sortCondition, keyword);
  }, [selectedCategory, sortCondition, keyword]);

  // 검색 기능 구현
  // const handleSearch = (keyword) => {
  //   if (!keyword.trim()) {
  //     alert('검색어를 입력해주세요.');
  //     return;
  //   }
  //   const filtered = lectures.filter(
  //     (lec) =>
  //       lec.lectureTitle.toLowerCase().includes(keyword.toLowerCase()) ||
  //       lec.description.toLowerCase().includes(keyword.toLowerCase()),
  //   );
  //   setSelectedCategory('all');
  //   setDisplayLectures(sortLectures(filtered, sortCondition));
  // };

  // 검색 기능
  const handleSearch = (searchKeyword) => {
    if (!searchKeyword.trim()) {
      //@trim ?? trim이 아니라면이 무슨말
      alert('검색어를 입력해주세요.');
      return;
    }
    setKeyword(searchKeyword); //@??
    setSelectedCategory('all'); // 검색 시 전체 카테고리 기준
  };

  // 정렬 기능 구현
  /*
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
  */
  const handleFilterChange = (condition) => {
    const sort = condition === 'latest' ? 'createdAt' : 'enrollmentCount'; //@뭔말
    setSortCondition(sort);
  };

  // 카테고리 선택 기능 구현
  /*
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // 현재 선택 카테고리 상태 업데이트

    setKeyword(''); //키워드 초기화
    if (category === 'all') {
      // 전체 강의 표시
      setDisplayLectures(sortLectures(lectures, sortCondition));
    } else {
      // 선택한 카테고리의 강의만 표시 (검색 결과와 무관하게 전체 lectures 기준)
      const filtered = lectures.filter(
        (lec) => lec.category.toLowerCase() === category.toLowerCase(),
      );
      // 선택한 카테고리 강의만 표시
      setDisplayLectures(sortLectures(filtered, sortCondition));
    }
  };
  */
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setKeyword(''); //카테고리 클릭시 검색 초기화
  };

  //강의 클릭시 해당 강의 상세 페이지 이동
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
