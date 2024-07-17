import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, FormControl, Select, MenuItem, Paper } from '@mui/material';
import {
  faUser,
  faEnvelope,
  faClock,
} from '@fortawesome/free-regular-svg-icons'; // Import specific icons
import { formatDateTime } from '../utils/dateUtils';
import TicketModal from './TicketModal';

const Ticket = ({ info, onUpdateStatus, onUpdateMessages }) => {
  const { _id, name, email, description, createdAt, status } = info;
  const [currenStatus, setCurrentStatus] = useState(status);
  const [openModal, setOpenModal] = useState(false);

  const formattedDate = formatDateTime(createdAt);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    await onUpdateStatus(_id, newStatus);
  };

  const handleClick = () => {
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
          <div className='value'>{name}</div>
        </div>
        <div className='info ticket-email'>
          <div className='category'>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className='value'>{email}</div>
        </div>
        <div className='info ticket-description'>
          {/* <div className='category'>Description:</div> */}
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
            value={currenStatus}
          >
            <option value='New'>New</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
          {/* <FormControl fullWidth variant='outlined'>
          <Select
            labelId='status-select-label'
            id='status-select'
            // value={status}
            // onChange={handleChange}
            label='Status'
          >
            <MenuItem value='new'>New</MenuItem>
            <MenuItem value='in-progress'>In Progress</MenuItem>
            <MenuItem value='done'>Done</MenuItem>
          </Select>
        </FormControl> */}
          {/* <div className='value'>status</div> */}
        </div>
      </Paper>
      <TicketModal
        open={openModal}
        onClose={handleCloseModal}
        info={info}
        onUpdateMessages={onUpdateMessages}
      />
    </div>
  );
};

export default Ticket;
