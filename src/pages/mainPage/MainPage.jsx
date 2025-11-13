import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import { getLectures } from '../../services/lectureService';
import './MainPage.css';

function MainPage() {
  const [keyword, setKeyword] = useState('');
  // 전체 강의 리스트 상태 관리
  const [displayLectures, setDisplayLectures] = useState([]);
  // 정렬 기준(최신순/인기순) 상태관리
  const [sortCondition, setSortCondition] = useState('createdAt');
  //선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 불러오기 통합 함수
  const fetchAndSetLectures = async (category, sort, searchKeyword) => {
    try {
      setIsLoading(true);
      const data = await getLectures(category, sort, searchKeyword);
      setDisplayLectures(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

      {!isLoading && displayLectures.length === 0 ? (
        <div>등록된 강의가 없습니다.</div>
      ) : (
        <LectureList lectures={displayLectures} />
      )}
      {isLoading && <span className="loader" />}
    </main>
  );
}

export default MainPage;
