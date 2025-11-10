import './CategoryList.css';
import { useState } from 'react';

function CategoryList({ onCategorySelect }) {
  //  카테고리 목록을 배열로 정의
  const categories = ['전체', 'Web', 'Basic', 'Data', 'AI']; 

  // 선택된 카테고리를 상태 관리.
  const [selected, setSelected] = useState('전체');

  // 버튼 클릭 시 실행되는 함수.
  const handleClick = (category) => {
    setSelected(category); 
    onCategorySelect(category); 
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          //선택된 버튼만 CSS 적용
          className={selected === category ? 'active' : '' }
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
