import React, { useEffect, useState } from 'react';
import LectureList from '../../components/lectureList/LectureList';
import CategoryList from './components/categoryList/CategoryList';
import Filter from './components/filter/Filter';
import SearchBar from './components/searchBar/SearchBar';
import { getLectures } from '../../services/lectureService';
import { Lecture, Category, Sort } from 'types/types';
import './MainPage.css';

const MainPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [displayLectures, setDisplayLectures] = useState<Lecture[]>([]);
  const [sortCondition, setSortCondition] = useState<Sort>('createdAt');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAndSetLectures = async (category: Category, sort: Sort, searchKeyword: string) => {
    try {
      setIsLoading(true);
      const data: Lecture[] = await getLectures(category, sort, searchKeyword);
      setDisplayLectures(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetLectures(selectedCategory, sortCondition, keyword);
  }, []);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setKeyword('');
    fetchAndSetLectures(category, sortCondition, '');
  };

  const handleSortClick = (sort: Sort) => {
    setSortCondition(sort);
    fetchAndSetLectures(selectedCategory, sort, keyword);
  };

  const handleSearch = (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    setSelectedCategory('all');
    fetchAndSetLectures('all', sortCondition, searchKeyword);
  };

  return (
    <main className="mainpage">
      <SearchBar keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />

      <div className="mainpage-top">
        <CategoryList selected={selectedCategory} handleCategoryClick={handleCategoryClick} />
        <Filter value={sortCondition} handleSortClick={handleSortClick} />
      </div>

      {!isLoading && displayLectures.length === 0 ? (
        <div>등록된 강의가 없습니다.</div>
      ) : (
        <LectureList lectures={displayLectures} />
      )}
      {isLoading && <span className="loader" />}
    </main>
  );
};

export default MainPage;
