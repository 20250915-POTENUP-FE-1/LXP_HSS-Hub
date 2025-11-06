import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="search"
        name="keyword"
        placeholder="검색어를 입력해주세요"
        // value={}
        // onChange={}
      />
      <button>
        {/* <SearchIcon /> */}
        검색아이콘 @
      </button>
    </div>
  );
}
export default SearchBar;
