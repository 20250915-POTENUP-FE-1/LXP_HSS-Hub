import { FC } from 'react';
import './CategoryList.css';

interface CategoryListProps {
  selected: string;
  handleCategoryClick: (category: string) => void; 
}

const CategoryList: FC<CategoryListProps> = ({ selected, handleCategoryClick,
}) => {
  const categories: string[] = ['all', 'web', 'basic', 'data', 'ai'];

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