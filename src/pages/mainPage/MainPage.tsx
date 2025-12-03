import { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import { getLectures } from '../../services/lectureService';
import './MainPage.css';
import { Category, Lecture, Sort } from 'types/types';

function MainPage() {
  const [keyword, setKeyword] = useState<string>('');
  // 전체 강의 리스트 상태 관리
  const [displayLectures, setDisplayLectures] = useState<Lecture[]>([]);
  // 정렬 기준(최신순/인기순) 상태관리
  const [sortCondition, setSortCondition] = useState<Sort>('createdAt');
  //선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. 데이터 불러오기 통합 함수
  const fetchAndSetLectures = async (
    category: Category,
    sort: Sort,
    searchKeyword: string,
  ) => {
    try {
      setIsLoading(true); //1) 로딩 시작 → setIsLoading(true)
      const data = await getLectures(category, sort, searchKeyword); //2) 호출 → API에서 데이터 받아오기
      setDisplayLectures(data); //받아온 데이터를 화면에 표시
    } catch (error) {
      console.log(error); //4) 오류 발생 시 콘솔에 출력
    } finally {
      setIsLoading(false); //5) 로딩 끝
    }
  };

  //2. 컴포넌트 마운트 시 실행
  //useEffect 빈 배열 [] → 컴포넌트가 처음 화면에 렌더링될 때 한 번만 실행 (초기 강의 데이터를 불러오는 역할)
  useEffect(() => {
    fetchAndSetLectures(selectedCategory, sortCondition, keyword);
  }, []);

  //3. 이벤트 핸들러
  //카테고리 버튼 클릭 시
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category); //선택 상태 업데이트
    setKeyword(''); //검색어 초기화
    fetchAndSetLectures(category, sortCondition, ''); //해당 카테고리 강의 데이터를 새로 불러옴
  };

  //정렬 클릭
  const handleSortClick = (sort: Sort) => {
    setSortCondition(sort); //상태 업데이트
    fetchAndSetLectures(selectedCategory, sort, keyword); //현재 선택 카테고리와 검색어 기준으로 강의 다시 불러오기
  };

  // 검색 기능
  const handleSearch = (searchKeyword: string) => {
    if (!searchKeyword.trim()) { //검색어가 없으면 경고
      alert('검색어를 입력해주세요.');
      return;
    }
    setSelectedCategory('all'); //카테고리를 전체(all)로 변경
    fetchAndSetLectures('all', sortCondition, searchKeyword); //입력한 키워드로 강의 검색
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
          handleCategoryClick={handleCategoryClick}
        />
        <Filter value={sortCondition} handleSortClick={handleSortClick} />
      </div>

      {!isLoading && displayLectures.length === 0 ? (
        <div>등록된 강의가 없습니다.</div>
      ) : (
        <LectureList lectures={displayLectures} type="MAIN" />
      )}
      {isLoading && <span className="loader" />}
    </main>
  );
}

export default MainPage;
