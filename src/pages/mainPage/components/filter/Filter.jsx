import React from 'react';
import './Filter.css';

function Filter({ value, onChange }) {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="latest">최신 순</option>
      <option value="popularity">인기 순</option>
    </select>
  );
}

export default Filter;
