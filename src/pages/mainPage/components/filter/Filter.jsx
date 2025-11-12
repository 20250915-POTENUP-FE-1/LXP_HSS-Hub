import React from 'react';
import './Filter.css';

function Filter({ value, setSortCondition }) {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => setSortCondition(e.target.value)}
    >
      <option value="createdAt">최신 순</option>
      <option value="enrollmentCount">인기 순</option>
    </select>
  );
}

export default Filter;
