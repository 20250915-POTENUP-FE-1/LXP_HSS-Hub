import { FC } from 'react';
import './CategoryList.css';
import { Category } from 'types/types';

// interface: 타입스크립트에서 객체의 **형식(타입)**을 정의할 때 사용
interface CategoryListProps {
  selected: string;
  handleCategoryClick: (category: Category) => void; //함수 타입을 정의
}

//함수형 컴포넌트 정의
//인자 구조분해(destructuring): props.selected와 props.handleCategoryClick을 바로 변수로 가져옴
function CategoryList({ selected, handleCategoryClick }: CategoryListProps) {
  /*CategoryListProps : props가 어떤 형식인지 타입을 알려주는 부분이에요.
여기서는 selected는 문자열, handleCategoryClick은 클릭할 때 실행되는 함수라는 걸 타입스크립트가 알게 돼요.
*/

  const categories: Category[] = ['all', 'web', 'basic', 'data', 'ai'];
  // Record<key, value> 객체 타입을 정의할 때 사용
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
}

export default CategoryList;
