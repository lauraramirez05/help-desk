import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';

const FilterModal = ({ open, onClose, onFilter }) => {
  // const [open, setOpen] = useState(true);
  const [statusFilters, setStatusFilters] = useState({
    new: false,
    inProgress: false,
    done: false,
  });
  const [orderBy, setOrderBy] = useState('New to Old');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const style = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  const handleSubmit = () => {
    const filters = {
      status: statusFilters,
      orderBy: orderBy,
      startDate: startDate,
      endDate: endDate,
    };
    onFilter(filters);
    onClose(false);

    // Reset all states to their initial values
    setStatusFilters({
      new: false,
      inProgress: false,
      done: false,
    });
    setOrderBy('');
    setStartDate('');
    setEndDate('');


  };

  return (
    <Modal open={open}>
      <Box sx={{ style }}>
        <h2>Filter Tickets</h2>
        <div className='status'>
          <h4>By Status</h4>
          <div className='options'>
            <div>
              <input
                type='checkbox'
                id='new'
                name='new'
                checked={statusFilters.new}
                onChange={(e) =>
                  setStatusFilters({ ...statusFilters, new: e.target.checked })
                }
              />
              <label htmlFor='new'>New</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='in-progress'
                name='in-progress'
                checked={statusFilters.inProgress}
                onChange={(e) => {
                  setStatusFilters({
                    ...statusFilters,
                    inProgress: e.target.checked,
                  });
                }}
              />
              <label htmlFor='in-progress'>In Progress</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='done'
                name='done'
                checked={statusFilters.done}
                onChange={(e) =>
                  setStatusFilters({ ...statusFilters, done: e.target.checked })
                }
              />
              <label htmlFor='done'>Done</label>
            </div>
          </div>
        </div>

        <div className='order'>
          <h4>Order By</h4>
          <div className='options'>
            <div>
              <input
                type='radio'
                id='oldToNew'
                name='order'
                value='Old to New'
                checked={orderBy === 'Old to New'}
                onChange={() => setOrderBy('Old to New')}
              />
              <label htmlFor='oldToNew'>Oldest to Newest</label>
            </div>
            <div>
              <input
                type='radio'
                id='newToOld'
                name='order'
                value='New to Old'
                checked={orderBy === 'New to Old'}
                onChange={() => setOrderBy('New to Old')}
              />
              <label htmlFor='newToOld'>Newest to Oldest</label>
            </div>
          </div>
        </div>

        <div className='date'>
          <h4>By Range</h4>
          <div>
            <label htmlFor='startDate'>Start Date:</label>
            <input
              type='date'
              id='startDate'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='endDate'>End Date:</label>
            <input
              type='date'
              id='endDate'
              value='endDate'
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>submit</button>
      </Box>
    </Modal>
  );
};

export default FilterModal;
