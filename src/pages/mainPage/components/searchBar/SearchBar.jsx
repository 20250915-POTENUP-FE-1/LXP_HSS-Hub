import './SearchBar.css';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="search" name="keyword" placeholder="검색어를 입력해주세요" />
      <button className="search-bar-btn">
        <Search size={16} color="#ffffff" />
      </button>
    </div>
  );
}
export default SearchBar;
