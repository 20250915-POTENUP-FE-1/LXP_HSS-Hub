import React, { FC } from 'react';
import './Filter.css';

//1) Props 타입 정의 
interface FilterProps {
  value: string; //value: 선택된 정렬 기준 (string)
  handleSortClick: (sortBy: string) => void; //handleSortClick: 선택 변경 시 실행되는 함수, string 인자, 반환값 없음
  
  //@void가 왜들어가는건지 모르겠
}

//2) Functional Component 타입 지정
//FC 사용 → props 타입 체크 가능, children 포함 
//@ children 포함  ????
const Filter: FC<FilterProps> = ({ value, handleSortClick }) => {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => handleSortClick(e.target.value)}
    >
      <option value="createdAt">최신 순</option>
      <option value="enrollmentCount">인기 순</option>
    </select>
  );
};

export default Filter;
