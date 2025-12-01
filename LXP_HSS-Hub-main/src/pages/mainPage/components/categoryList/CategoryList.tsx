import { FC } from 'react';
import './CategoryList.css';

//1) Props 타입 정의 (props 타입을 명시해야 타입 안전성을 확보)
//이 컴포넌트가 외부에서 받는 데이터는 무엇인가? → selected, handleCategoryClick
//각각 타입은 무엇이어야 하는가? → 문자열, 문자열 인자를 받는 함수
interface CategoryListProps {
  selected: string;
  handleCategoryClick: (category: string) => void; //이 함수는 클릭하면 **무엇을 처리할지(상태 갱신)**만 하고, 값을 반환할 필요는 없으니 void
}

//2) FC: Functional Component 타입 지정
//실제 컴포넌트를 변수로 선언하는 부분
const CategoryList: FC<CategoryListProps> = ({ selected, handleCategoryClick,
}) => {
  const categories: string[] = ['all', 'web', 'basic', 'data', 'ai'];

  // @inferface랑 const랑 왜 따로 코드써줘야하는지? 

  //4단계: 내부 데이터 타입 안전화
  //categoryText[key]를 사용할 때, key가 문자열임을 TypeScript에게 알려줘야 안전
                    //Record<K, T>는 객체 타입을 만드는 유틸 타입
                    //K → 키(key)의 타입 , T → 값(value)의 타입
                    //즉, 모든 key와 value가 문자열인 객체라는 의미
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
