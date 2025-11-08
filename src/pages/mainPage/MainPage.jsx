import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import './MainPage.css';

// 메인 페이지 기본 틀 생성 (그리드 레이아웃)

function MainPage() {
  return (
    <main className="main-page">
      {/* 검색창 */}
      <SearchBar />
      <div className="main-page-inside">
        <div className="main-page-top">
          {/* 카테고리 리스트 */}
          <CategoryList />
          {/* 필터 */}
          <Filter />
        </div>
        <div className="lecture-list">
          강의 목록 리스트 컴포넌트가 들어갑니다
        </div>
      </div>
    </main>
  );
}

export default MainPage;
