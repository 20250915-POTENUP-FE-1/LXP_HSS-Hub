import { useState } from 'react';
import './SearchBar.css';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { menuData } from '../../../../data/dummy';

function SearchBar() {
  // input 검색어 상태관리
  const [searchInput, setSearchInput] = useState({
    keyword: '',
  });

  //  검색결과 상태관리 (결과 표시용)
  const [searchResult, setSearchResult] = useState([])

  const navigate = useNavigate();

  // input 이벤트
  const handleSearchInputChange = (e) => {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  //나중에 더미데이터 파일 만들어지면 수정 @@
  const handleSearch = () => {
    navigate(` `);
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        name="keyword"
        className="search-bar-input"
        value={searchInput.keyword}
        onChange={handleSearchInputChange}
        placeholder="검색어를 입력해주세요"
      />
      <button className="search-bar-button" onClick={handleSearch}>
        <Search size={20} color="#ffffff" />
      </button>
    </div>
  );
}
export default SearchBar;
