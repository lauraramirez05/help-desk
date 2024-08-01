import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';

const SearchTicket = ({ onSearch, onFetch, setPage, setSearchSuccessful }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    console.log('hitting handleclick');
    console.log('query');
    if (e.key === 'Enter') {
      console.log('we pressed enter');
      e.preventDefault();

      if (query === '') {
        setPage(1);
        setSearchSuccessful(true);
        onFetch();
      }
      if (query) {
        onSearch(query);
      }
    }
  };

  const handleCloseClick = () => {
    setQuery('');
    setPage(1);
    setSearchSuccessful(true);
    onFetch();
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
      <FontAwesomeIcon
        className='close-btn'
        icon={faX}
        onClick={handleCloseClick}
      />
    </div>
  );
};

export default SearchTicket;
