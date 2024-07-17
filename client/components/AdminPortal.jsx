import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ticket from './Ticket';
import SearchTicket from './SearchTicket';
import { Button } from '@mui/material';
import FilterModal from './FilterModal';
import { updateMessages } from '../../server/controller/TicketController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

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

  //Fetch Search Ticket
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

  //Fetch to Filter Ticket
  const filterTickets = async (filters) => {
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

  //Fetch to Update Messages
  const updateMessages = async (id, newMessage) => {
    console.log('Inside the fetch call to update message');

    try {
      const response = await fetch(`/api/update-messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessage }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTicket = await response.json();
    } catch (error) {
      console.error('Error updating the messages', error);
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
    <div className='admin-page'>
      <Button className='house-btn'>
        {/* <Link to='/'> */}
        <FontAwesomeIcon icon={faHouse} />
        {/* </Link> */}
      </Button>
      <div className='header'>
        <SearchTicket onSearch={searchTicket} />
        <Button onClick={handleClick}>Filter</Button>
      </div>

      <FilterModal
        open={openModal}
        onClose={setOpenModal}
        onFilter={filterTickets}
      />
      <div className='ticket-feed'>
        {tickets.map((ticket) => (
          <Ticket
            key={ticket._id}
            info={ticket}
            onUpdateStatus={updateTicketStatus}
            onUpdateMessages={updateMessages}
          />
        ))}
      </div>
    </div>
  );
};
export default AdminPortal;
