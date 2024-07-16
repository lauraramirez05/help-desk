import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import SearchTicket from './SearchTicket';
import { Button } from '@mui/material';
import FilterModal from './FilterModal';

const AdminPortal = () => {
  const limit = 5;

  const [tickets, setTickets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);

  //Fetch Tickets
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

  //Fetch request to update status
  const updateTicketStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/update-status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTicket = await response.json();
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, status: updatedTicket.status }
            : ticket
        )
      );
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const searchTicket = async (query) => {
    if (query) {
      //Look in the current list
      const results = tickets.filter((ticket) => ticket._id.includes(query));
      //Fetch to the server
      if (results.length === 0) {
        try {
          const response = await fetch(`/api/search-ticket/${query}`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setTickets([data]);
        } catch (error) {
          console.error('Error looking for ticket:', error);
        }
      }
    }
  };

  const FilterTickets = async (filters) => {
    const baseURL = '/api/filter-tickets';

    const queryParams = new URLSearchParams({
      status: JSON.stringify(filters.status),
      orderBy: filters.orderBy,
      startDate: filters.StartDate,
      endDate: filters.endDate,
    });

    const urlWithParams = `${baseURL}?${queryParams.toString()}`;
    try {
      const response = await fetch(`${urlWithParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data);
      setTickets(data);
    } catch (error) {
      console.error('Error filtering the tickets:', error);
    }
  };
  console.log(tickets);
  const handleClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <SearchTicket onSearch={searchTicket} />
      <Button onClick={handleClick}>Filter</Button>
      <FilterModal
        open={openModal}
        onClose={setOpenModal}
        onFilter={FilterTickets}
      />
      <div className='ticket-feed'>
        {tickets.map((ticket) => (
          <Ticket
            key={ticket._id}
            info={ticket}
            onUpdateStatus={updateTicketStatus}
          />
        ))}
      </div>
    </div>
  );
};
export default AdminPortal;
