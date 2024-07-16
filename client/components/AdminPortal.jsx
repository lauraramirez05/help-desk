import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import SearchTicket from './SearchTicket';

const AdminPortal = () => {
  const limit = 5;

  const [tickets, setTickets] = useState([]);

  //Fetch Tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/get-tickets`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        // Handle error state or throw it further
      }
    };

    fetchTickets();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  //Fetch request to update status
  // const updateTicketStatus = async () => {
  //   const newStatus = e.target.value;

  //   try {
  //     const response = await fetch(`/api/update-status/${_id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ status: newStatus }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const updatedTicket = await response.json();
  //     console.log(updatedTicket);
  //     setCurrentStatus(updatedTicket.status);
  //   } catch (error) {
  //     console.error('Error updating ticket:', error);
  //   }
  // };
  return (
    <div>
      <SearchTicket />
      <div className='ticket-feed'>
        {tickets.map((ticket) => (
          <Ticket key={ticket._id} info={ticket} />
        ))}
      </div>
    </div>
  );
};
export default AdminPortal;
