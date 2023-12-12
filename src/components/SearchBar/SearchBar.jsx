import { useState } from "react";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="search-bar">
      <span className="search-icon">
        <IoIosSearch size={20} />
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {props.clearable && searchQuery && (
        <span className="clear-icon" onClick={handleClear}>
          <IoIosClose size={24} />
        </span>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  clearable: PropTypes.bool,
};

export default SearchBar;
