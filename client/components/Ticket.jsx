import React from 'react';

const Ticket = (info) => {
  const { id, name, email, description } = info;

  return (
    <div className='ticket-container'>
      <div className='ticket-id'>ID</div>
      <div className='ticket-name'>NAME</div>
      <div className='ticket-email'>EMAIL</div>
      <div className='ticket-description'>DESCRIPTION</div>
      <div className='ticket-status'>STATUS</div>
      <div className='ticket-created'>CREATED</div>
    </div>
  );
};

export default Ticket;
