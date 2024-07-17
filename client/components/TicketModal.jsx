import React, { useState } from 'react';
import { Modal, Box, Backdrop } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMessage,
  faEnvelope,
  faLightbulb,
} from '@fortawesome/free-regular-svg-icons';

const TicketModal = ({ open, onClose, info, onUpdateMessages }) => {
  const { _id, name, email, description, createdAt, status, messages } = info;
  const [newMessage, setNewMessage] = useState('');

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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleClick = () => {
    onUpdateMessages(_id, newMessage);
    onClose(false);
  };

  return (
    <Modal open={open} close={onClose}>
      <Box sx={modalStyle}>
        <Box sx={contentStyle}>
          <div className='header'>
            <div className='right-header'>
              <FontAwesomeIcon icon={faMessage} />
              <span className='user'>{name}</span>
            </div>
            <button onClick={onClose}>x</button>
          </div>
          <div className='ticket-info'>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
              <span className='email'>{email}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faLightbulb} />
              <span className='status'>{status}</span>
            </div>
            <div>
              <span>{description}</span>
            </div>
          </div>
          <div className='messages-container'>
            {messages.map((message) => (
              <div>{message}</div>
            ))}
          </div>
          <div className='chat-container'>
            <label htmlFor='reply'>Your Message</label>
            <textarea
              id='reply'
              rows='4'
              placeholder='Type your response here...'
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button type='submit' onClick={handleClick}>
              Send
            </button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default TicketModal;
