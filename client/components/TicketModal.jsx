import React, { useState, useEffect } from 'react';
import { Modal, Box, Backdrop, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMessage,
  faEnvelope,
  faLightbulb,
  faPaperPlane,
  faComment,
} from '@fortawesome/free-regular-svg-icons';
import { faXmark, faReply } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';

const TicketModal = ({
  open,
  onClose,
  info,
  onUpdateMessages,
  postStatus,
  currentStatus,
  setCurrentStatus,
  messageSubmitted,
  setMessageSubmitted,
}) => {
  const { _id, name, email, description, createdAt, status, messages } = info;
  const [newMessage, setNewMessage] = useState(null);

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

  const handleClose = () => {
    setCurrentStatus(status);
    onClose(false);
  };

  const handleStatus = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
  };

  const handleClick = () => {
    postStatus(_id, currentStatus);
    onUpdateMessages(_id, newMessage);
    // setNewMessage('');
  };

  // Added useEffect to reset messageSubmitted and newMessage
  useEffect(() => {
    if (messageSubmitted) {
      const timer = setTimeout(() => {
        setMessageSubmitted(false);
        setNewMessage('');
      }, 15000);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timer);
    }
  }, [messageSubmitted, setMessageSubmitted]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={contentStyle}>
          <div className='ticket-modal modal-header'>
            <div className='right-header'>
              <FontAwesomeIcon icon={faMessage} />
              <span className='user'>{name}</span>
            </div>
            <div onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div className='ticket-info'>
            <div className='ticket-email'>
              <FontAwesomeIcon icon={faEnvelope} />
              <span className='email'>{email}</span>
            </div>

            <div className='info ticket-status'>
              <select
                name='status-select-label'
                id='status-select'
                onChange={handleStatus}
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
            <div className='description-container'>
              <Paper className='modal-description'>
                <FontAwesomeIcon icon={faComment} />
                {description}
              </Paper>
            </div>
          </div>
          {/* <div className='messages-container'>
            {messages.map((message) => (
              <div>
                {message}
                <FontAwesomeIcon icon={faReply} />
              </div>
            ))}
          </div> */}
          <Paper elevation={3} className='chat-container'>
            <label htmlFor='reply'>Send Message</label>
            <textarea
              id='reply'
              rows='4'
              placeholder='Type your response here...'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button className='submit-btn' type='submit' onClick={handleClick}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            {messageSubmitted && (
              <Alert severity='success'>
                `Would normally send email here with body: {newMessage}`
              </Alert>
            )}
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
};

export default TicketModal;
