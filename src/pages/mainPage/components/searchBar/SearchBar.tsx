import { ChangeEvent, KeyboardEvent } from 'react';
import './SearchBar.css';
import { Search } from 'lucide-react';

interface SearchBarProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, setKeyword, onSearch }) => {
  // 엔터 키로도 검색 가능
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        name="keyword"
        className="search-bar-input"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="검색어를 입력해주세요"
      />
      <button className="search-bar-button" onClick={() => onSearch(keyword)}>
        <Search size={20} color="#ffffff" />
      </button>
    </div>
  );
};

export default SearchBar;