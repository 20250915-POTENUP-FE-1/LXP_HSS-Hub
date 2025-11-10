import { useState } from 'react';
import './SearchBar.css';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  // 엔터 키로도 검색 가능
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        name="keyword"
        className="search-bar-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="검색어를 입력해주세요"
      />
      <button className="search-bar-button" onClick={() => onSearch(keyword)}>
        <Search size={20} color="#ffffff" />
      </button>
    </div>
  );
}

export default SearchBar;
