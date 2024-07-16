import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, FormControl, Select, MenuItem, Paper } from '@mui/material';
import {
  faUser,
  faEnvelope,
  faClock,
} from '@fortawesome/free-regular-svg-icons'; // Import specific icons
import { formatDateTime } from '../utils/dateUtils';

const Ticket = (info) => {
  const { _id, name, email, description, createdAt, status } = info.info;
  const [currenStatus, setCurrentStatus] = useState(status);

  const formattedDate = formatDateTime(createdAt);

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const response = await fetch(`/api/update-status/${_id}`, {
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
      console.log(updatedTicket);
      setCurrentStatus(updatedTicket.status);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  console.log(currenStatus);

  return (
    <Paper elevation={3} className='ticket-container'>
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
          <option value='In progress'>In Progress</option>
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
  );
};

export default Ticket;
