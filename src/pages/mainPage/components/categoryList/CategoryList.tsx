import { FC } from 'react';
import './CategoryList.css';
import { Category } from 'types/types';

interface CategoryListProps {
  selected: string;
  handleCategoryClick: (category: Category) => void; 
}

function CategoryList({ selected, handleCategoryClick }: CategoryListProps) {
  const categories: Category[] = ['all', 'web', 'basic', 'data', 'ai'];

  const categoryText: Record<string, string> = {
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
          className={selected === category ? 'active' : ''}
          onClick={() => handleCategoryClick(category)}
        >
          {categoryText[category]}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;