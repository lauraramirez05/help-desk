import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchTicket = () => {

  const handleClick = (e) => {
    
  }

  return (
    <div className='search-container'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input placeholder='Search Ticket' />
    </div>
  );
};

export default SearchTicket;
