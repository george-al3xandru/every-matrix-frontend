import { IoIosSearch, IoIosClose } from "react-icons/io";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { useRef } from "react";

const SearchBar = (props) => {
  const searchRef = useRef(null);

  const handlerClear = () => {
    props.handleClearSearchQuery();
    searchRef.current.value = "";
  };

  return (
    <div className="search-bar">
      <span className="search-icon">
        <IoIosSearch size={20} />
      </span>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search..."
        className="search-input"
        defaultValue={props.searchQuery}
        onChange={(e) => props.handleSearch(e.target.value)}
      />
      {props.clearable && props.searchQuery && (
        <span className="clear-icon" onClick={handlerClear}>
          <IoIosClose size={24} />
        </span>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  clearable: PropTypes.bool,
  searchQuery: PropTypes.string,
  handleSearch: PropTypes.func,
  handleClearSearchQuery: PropTypes.func,
};

export default SearchBar;
