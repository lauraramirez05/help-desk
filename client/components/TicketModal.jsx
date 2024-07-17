import React, { useState } from 'react';
import { Modal, Box, Backdrop } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMessage,
  faEnvelope,
  faLightbulb,
} from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
    width: '80%',
    borderRadius: '10px',
    backgroundColor: 'white', // Replace with your desired background color
    color: '#333333',
    padding: '15px',
    margin: '20px auto',
    boxShadow: '0px 20px 10px -15px rgba(133, 189, 215, 0.8784313725)',
    border: 'none',
  };

  const handleClick = () => {
    onUpdateMessages(_id, newMessage);
    onClose(false);
  };

  return (
    <Modal open={open} close={onClose}>
      <Box sx={modalStyle}>
        <Box sx={contentStyle}>
          <div className='ticket-modal modal-header'>
            <div className='right-header'>
              <FontAwesomeIcon icon={faMessage} />
              <span className='user'>{name}</span>
            </div>
            <div onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
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
