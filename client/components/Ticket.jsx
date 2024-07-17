import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faClock,
} from '@fortawesome/free-regular-svg-icons'; // Import specific icons
import { formatDateTime } from '../utils/dateUtils';
import TicketModal from './TicketModal';
import { Paper } from '@mui/material';

const Ticket = ({ info, onUpdateStatus, onUpdateMessages, messageSubmitted, setMessageSubmitted }) => {
  const { _id, name, email, description, createdAt, status } = info;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [openModal, setOpenModal] = useState(false);

  const formattedDate = formatDateTime(createdAt);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    postStatus(_id, newStatus);
  };

  const postStatus = async (id, updatedStatus) => {
    setCurrentStatus(updatedStatus);
    await onUpdateStatus(_id, updatedStatus);
  };

  const handleClick = (e) => {
    // Check if the clicked element is the select element or its child
    if (
      e.target.id === 'status-select' ||
      e.target.parentElement.id === 'status-select'
    ) {
      return; // Do nothing if clicking on the select or its options
    }

    // Open the modal for other parts of the ticket container
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Paper elevation={3} className='ticket-container' onClick={handleClick}>
        <div className='ticket-id'>
          <div className='value'>{_id}</div>
        </div>
        <div className='info ticket-name'>
          <div className='category'>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <a href={`mailto:${email}`} className='value'>
            {name}
          </a>
        </div>
        <div className='info ticket-email'>
          <div className='category'>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <a href={`mailto:${email}`} className='value'>
            {email}
          </a>
        </div>
        <div className='info ticket-description'>
          <div className='value'>{description}</div>
        </div>
        <div className='info ticket-created'>
          <div className='category'>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className='value'>{formattedDate}</div>
        </div>
        <div className='info ticket-status'>
          <select
            name='status-select-label'
            id='status-select'
            onChange={handleChange}
            value={currentStatus}
            className={`${
              currentStatus === 'New'
                ? 'new-status'
                : currentStatus === 'In Progress'
                ? 'in-progress-status'
                : 'done-status'
            }`}
          >
            <option value='New'>New</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
        </div>
      </Paper>
      <TicketModal
        open={openModal}
        onClose={handleCloseModal}
        info={info}
        onUpdateMessages={onUpdateMessages}
        postStatus={postStatus}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        messageSubmitted={messageSubmitted}
        setMessageSubmitted={setMessageSubmitted}
      />
    </div>
  );
};

export default Ticket;
