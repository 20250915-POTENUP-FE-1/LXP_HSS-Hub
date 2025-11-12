import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import './MainPage.css';
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

  // 데이터 불러오기 통합 함수
  const fetchAndSetLectures = async (category, sort, searchKeyword) => {
    const data = await getLectures(category, sort, searchKeyword);
    setDisplayLectures(data);
  };

  //selectedCategory (카테고리)가 변경될 때마다 실행
  useEffect(() => {
    setKeyword('');
    fetchAndSetLectures(selectedCategory, sortCondition, '');
  }, [selectedCategory]);

  //sortCondition (정렬 기준)이 변경될 때마다 실행
  useEffect(() => {
    fetchAndSetLectures(selectedCategory, sortCondition, keyword);
  }, [sortCondition]);

  // 검색 기능
  const handleSearch = (searchKeyword) => {
    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    setSelectedCategory('all'); // 검색 시 전체 카테고리 기준
    setKeyword(searchKeyword);
    fetchAndSetLectures('all', sortCondition, searchKeyword);
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
          setSelected={setSelectedCategory}
        />
        <Filter value={sortCondition} setSortCondition={setSortCondition} />
      </div>

      <LectureList
        lectures={displayLectures}
        onLectureClick={handleLectureClick}
      />
    </main>
  );
}

export default MainPage;
