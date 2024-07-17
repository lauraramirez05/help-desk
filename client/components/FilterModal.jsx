import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  };

  const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    borderRadius: '10px',
    backgroundColor: 'white', // Replace with your desired background color
    color: '#333333',
    padding: '15px',
    margin: '20px auto',
    boxShadow: '0px 20px 10px -15px rgba(133, 189, 215, 0.8784313725)',
    border: 'none',
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

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Modal open={open}>
      <Box sx={modalStyle}>
        <Box sx={contentStyle}>
          <div className='modal-header'>
            <h2 className='modal-title'>Filter Tickets</h2>
            <div onClick={handleClose} className='close-btn'>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className='status'>
            <div className='title'>
              <h4>By Status</h4>
              <div className='horizontal'></div>
            </div>
            <div className='options'>
              <div>
                <input
                  type='checkbox'
                  id='new'
                  name='new'
                  checked={statusFilters.new}
                  onChange={(e) =>
                    setStatusFilters({
                      ...statusFilters,
                      new: e.target.checked,
                    })
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
                    setStatusFilters({
                      ...statusFilters,
                      done: e.target.checked,
                    })
                  }
                />
                <label htmlFor='done'>Done</label>
              </div>
            </div>
          </div>

          <div className='order'>
            <div className='title'>
              <h4>Order By</h4>
              <div className='horizontal'></div>
            </div>

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
            <div className='title'>
              <h4>By Range</h4>
              <div className='horizontal'></div>
            </div>

            <div className='date-option'>
              <label htmlFor='startDate'>Start Date:</label>
              <input
                type='date'
                id='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className='date-option'>
              <label htmlFor='endDate'>End Date:</label>
              <input
                type='date'
                id='endDate'
                value='endDate'
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleSubmit} className='submit-btn'>
            submit
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
