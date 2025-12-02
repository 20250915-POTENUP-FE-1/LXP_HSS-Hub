import React, { FC } from 'react';
import './Filter.css';

interface FilterProps {
  value: string; 
  handleSortClick: (sortBy: string) => void; 
  //@void가 왜들어가는건지 모르겠
}

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