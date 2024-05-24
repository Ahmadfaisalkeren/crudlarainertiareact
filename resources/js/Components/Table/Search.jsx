import React from 'react';

const Search = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      className="px-2 py-1 border rounded-md"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default Search;
