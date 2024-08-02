import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Ticket from './Ticket';
import SearchTicket from './SearchTicket';
import { Button } from '@mui/material';
import FilterModal from './FilterModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  fetchTickets,
  updateTicketStatus,
  searchTicket,
  filterTickets,
  updateMessages,
} from '../services/ticketServices'; // Import service functions

const AdminPortal = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(true);
  const initialLoadRef = useRef(true);

  //Fetch Tickets
  const loadTickets = async (page) => {
    try {
      const data = await fetchTickets(page);
      const { tickets: newTickets, totalPages } = data;

      // Filter out duplicate tickets based on their _id before updating state
      const filteredNewTickets = newTickets.filter((newTicket) => {
        return !tickets.some((ticket) => ticket._id === newTicket._id);
      });

      setTickets((prevTickets) => [...prevTickets, ...filteredNewTickets]);

      if (page >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchMoreTickets = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      loadTickets(nextPage);
      return nextPage;
    });
  };

  //Fetch request to update status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updatedTicket = await updateTicketStatus(id, newStatus);
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
  const handleSearch = async (query) => {
    if (query) {
      let results = [];

      // Look in the current list
      if (tickets.length > 0) {
        results = tickets.filter((ticket) => ticket._id.includes(query));

        // If tickets are found locally, update the state and return
        if (results.length > 0) {
          return setTickets(results);
        }
      }

      if (results.length === 0) {
        try {
          const data = await searchTicket(query);
          if (data) {
            setSearchSuccessful(true);
            setTickets([data]);
          } else {
            setSearchSuccessful(false);
            setTickets([]);
          }
        } catch (error) {
          console.error('Error looking for ticket:', error);
        }
      }
    }
  };

  //Fetch to Filter Ticket
  const handleFilter = async (filters) => {
    try {
      const data = await filterTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error('Error filtering the tickets:', error);
    }
  };

  //Fetch to Update Messages
  const handleUpdateMessages = async (id, newMessage) => {

    try {
      const data = await updateMessages(id, newMessage);
      if (data.ok) {
        setMessageSubmitted(true);
      }
    } catch (error) {
      console.error('Error updating the messages', error);
    }
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (initialLoadRef.current) {
      loadTickets(1); // Fetch only if tickets are not yet fetched
      initialLoadRef.current = false; // Update initialLoadRef after initial fetch
    }
  }, []);

  return (
    <div className='admin-page'>
      <div className='header'>
        <Button className='house-btn'>
          <Link to='/'>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </Button>
        <div className='filter-container'>
          <SearchTicket
            onSearch={handleSearch}
            setPage={setPage}
            setSearchSuccessful={setSearchSuccessful}
            onFetch={loadTickets}
          />
          <Button onClick={handleClick}>Filter</Button>
        </div>
      </div>

      <FilterModal
        open={openModal}
        onClose={setOpenModal}
        onFilter={handleFilter}
      />
      <div className='ticket-feed'>
        <InfiniteScroll
          className='scrollable-section'
          dataLength={tickets.length}
          next={fetchMoreTickets}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>All tickets have been loaded</p>}
        >
          {tickets.map((ticket) => (
            <Ticket
              key={ticket._id}
              info={ticket}
              onUpdateStatus={handleUpdateStatus}
              onUpdateMessages={handleUpdateMessages}
              messageSubmitted={messageSubmitted}
              setMessageSubmitted={setMessageSubmitted}
            />
          ))}

          {!searchSuccessful && <p>The ticket doesn't exist</p>}

          <Button className='load-btn' onClick={fetchMoreTickets}>
            Load More
          </Button>
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default AdminPortal;
