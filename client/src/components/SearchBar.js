import React, { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = ({ setSearchFromdb }) => {
  const [searchToggle, setsearchToggle] = useState(true);
  const [searchValue, setsearchValue] = useState(" ");

  const run = (e) => {
    e.preventDefault();
    searchToggle ? setsearchToggle(false) : setsearchToggle(true);
  };

  const searchInit = (e) => {
    e.preventDefault();
    setsearchValue(e.target.value);
    setSearchFromdb(e.target.value);
  };

  return (
    <div>
      {searchToggle ? (
        <div className='topbar'>
          <div
            className='vocab-title'
            style={{ padding: "20px", visibility: "visible" }}
          >
            <div style={{ fontSize: "40px" }}>Vocab</div>
          </div>
          <div onClick={run} style={{ padding: "20px" }}>
            <SearchIcon style={{ fontSize: "40px" }} />
          </div>
        </div>
      ) : (
        <div className='topbar-afterClick'>
          <div>
            <input
              className='input-search'
              autoFocus='autoFocus'
              onChange={searchInit}
              value={searchValue}
            />
          </div>
          <div onClick={run} className='search-icon'>
            <CloseIcon style={{ fontSize: "40px" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
