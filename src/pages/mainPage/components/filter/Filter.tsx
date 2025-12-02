import React from 'react';
import './Filter.css';
import { Sort } from 'types/types';

interface FilterProps {
  // types.ts에 Sort 정의
  value: Sort;
  handleSortClick: (sort: Sort) => void;
}

// const Filter: React.FC<FilterProps> = ({ value, handleSortClick }) => {
function Filter({ value, handleSortClick }: FilterProps){
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => handleSortClick(e.target.value as Sort)}
    >
      <option value="createdAt">최신 순</option>
      <option value="enrollmentCount">인기 순</option>
    </select>
  );
};

export default Filter;
