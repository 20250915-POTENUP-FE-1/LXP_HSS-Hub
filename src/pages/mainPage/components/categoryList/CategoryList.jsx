import './CategoryList.css';
import { useState } from 'react';

function CategoryList({ selected, onCategorySelect }) {
  //  카테고리 목록을 배열로 정의
  const categories = ['전체', 'Web', 'Basic', 'Data', 'AI'];

  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          //선택된 버튼만 CSS 적용
          className={selected === category ? 'active' : ''}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
