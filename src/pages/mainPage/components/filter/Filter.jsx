import React from 'react';
import './Filter.css';

function Filter({ value, handleSortClick }) {
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
}

export default Filter;
