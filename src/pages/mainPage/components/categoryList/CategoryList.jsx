import './CategoryList.css';
import { useState } from 'react';

function CategoryList({ selected, setSelected }) {
  //  카테고리 목록을 배열로 정의
  const categories = ['all', 'web', 'basic', 'data', 'ai'];

  const categoryText = {
    all: '전체',
    web: '웹 개발',
    basic: '코딩 기초',
    data: '데이터 분석',
    ai: '생성형 AI 활용',
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          //선택된 버튼만 CSS 적용
          className={selected === category ? 'active' : ''}
          onClick={() => setSelected(category)}
        >
          {categoryText[category]}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
