import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchTicket = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  console.log(query);
  const handleClick = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query) {
        onSearch(query);
      }
    }
  };

  return (
    <div className='search-container'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        type='text'
        value={query}
        placeholder='Search by ticket code'
        onChange={handleChange}
        onKeyDown={handleClick}
      />
    </div>
  );
};

export default SearchTicket;
