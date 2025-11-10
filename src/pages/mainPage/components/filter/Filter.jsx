import React from 'react';
import './Filter.css';

function Filter({ value, onChange }) {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="latest">최신순</option>
      <option value="popularity">인기순</option>
    </select>
  );
}

export default Filter;
