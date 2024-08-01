import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Ticket from './Ticket';
import SearchTicket from './SearchTicket';
import { Button } from '@mui/material';
import FilterModal from './FilterModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const AdminPortal = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const initialLoadRef = useRef(true);

  //Fetch Tickets
  const fetchTickets = async (page) => {
    console.log('fetching tickets', page);
    try {
      const response = await fetch(
        // `/api/get-tickets?page=${page}&limit=7`,
        `https://help-desk-n98w.vercel.app/api/get-tickets?page=${page}&limit=${7}`,
        {
          method: 'GET',
          // mode: 'no-cors',
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);

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
      // Handle error state or throw it further
    }
  };

  const fetchMoreTickets = () => {
    console.log('fetching more tickets');
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchTickets(nextPage);
      return nextPage;
    });
  };

  console.log(page);

  //Fetch request to update status
  const updateTicketStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `https://help-desk-n98w.vercel.app/api/update-status/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      const updatedTicket = await response.json();
      console.log(updatedTicket);
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
      let results = [];

      // Look in the current list
      if (tickets.length > 0) {
        console.log('inside of tickets.length');
        results = tickets.filter((ticket) => ticket._id.includes(query));

        console.log(results);

        // If tickets are found locally, update the state and return
        if (results.length > 0) {
          return setTickets(results);
        }
      }

      if (results.length === 0) {
        console.log('fetchingd database');
        try {
          const response = await fetch(
            // `/api/search-ticket/${query}`
            `https://help-desk-n98w.vercel.app/api/search-ticket/${query}`
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log(data);
          if (data) {
            setSearchSuccessful(true);
            setTickets([data]);
          } else {
            console.log('hereee');
            setSearchSuccessful(false);
            setTickets([]);
          }
        } catch (error) {
          console.error('Error looking for ticket:', error);
        }
      }
      // Fetch from the server if no local results
    }
  };
  //Fetch to Filter Ticket
  const filterTickets = async (filters) => {
    console.log(filters);
    const baseURL = '/api/filter-tickets';
    // const baseURL = 'https://help-desk-n98w.vercel.app/api/filter-tickets';

    // Check and log filters object
    console.log('Filters:', filters);

    // Construct query parameters
    const queryParams = new URLSearchParams({
      // Convert status object to JSON string if it's not empty
      status:
        Object.keys(filters.status).length > 0
          ? JSON.stringify(filters.status)
          : '',

      // Ensure orderBy, startDate, and endDate have default values
      orderBy: filters.orderBy || '',
      startDate: filters.startDate || '',
      endDate: filters.endDate || '',
    });

    // Log the constructed query parameters string
    console.log('Query Parameters String:', queryParams.toString());

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
      const response = await fetch(
        `https://help-desk-n98w.vercel.app/api/update-messages/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ messages: newMessage }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        console.log('inside else because we got ok response');
        setMessageSubmitted(true);
      }
      // const updatedTicket = await response.json();
      // console.log('updated ticket with mesage', updatedTicket);
    } catch (error) {
      console.error('Error updating the messages', error);
    }
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (initialLoadRef.current) {
      console.log('inside if in useEffect');
      fetchTickets(1); // Fetch only if tickets are not yet fetched
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
          <SearchTicket onSearch={searchTicket} />
          <Button onClick={handleClick}>Filter</Button>
        </div>
      </div>

      <FilterModal
        open={openModal}
        onClose={setOpenModal}
        onFilter={filterTickets}
      />
      <div className='ticket-feed'>
        <InfiniteScroll
          className='scrollable-section'
          dataLength={tickets.length}
          next={fetchMoreTickets}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>All tickets have been loaded</p>}
          // scrollableTarget='ticket-feed'
        >
          {tickets.map((ticket) => (
            <Ticket
              key={ticket._id}
              info={ticket}
              onUpdateStatus={updateTicketStatus}
              onUpdateMessages={updateMessages}
              messageSubmitted={messageSubmitted}
              setMessageSubmitted={setMessageSubmitted}
            />
          ))}

          <Button className='load-btn' onClick={fetchMoreTickets}>
            Load More
          </Button>
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default AdminPortal;
