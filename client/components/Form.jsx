import React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminPortal from './AdminPortal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        'https://help-desk-n98w.vercel.app/api/submit-form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setCurrentId(result);
      setSubmissionStatus('success');
      // Handle success (e.g., show a success message, reset form, etc.)
      console.log('Form submitted successfully:', result);
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Form submission error:', error);
    }

    setFormData({
      name: '',
      email: '',
      description: '',
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setCurrentId(null);
    }, 8000);
  };

  return (
    <div className='main-page'>
      <div className='header'>
        <h1 className='heading'>Contact Us</h1>
        <Link to='/admin'>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>

      {/* <div className='form-container'> */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor='name'>Name:</label> */}
          <input
            type='text'
            id='name'
            value={formData.name}
            onChange={handleChange}
            required
            placeholder='Name'
          />
        </div>
        <div>
          {/* <label htmlFor='email'>Email:</label> */}
          <input
            type='email'
            id='email'
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='Email'
          />
        </div>
        <div>
          {/* <label htmlFor='description'>Description:</label> */}
          <textarea
            id='description'
            name='message'
            rows='4'
            cols='45'
            value={formData.description}
            onChange={handleChange}
            placeholder='How can we help?'
            require='true'
          ></textarea>
        </div>
        <button type='submit' className='submit-btn'>
          Submit
        </button>
      </form>
      {submitted && submissionStatus === 'success' && (
        <Alert severity={`${submissionStatus}`}>
          Your ticket ${currentId} was submmited
        </Alert>
      )}
      {submitted && submissionStatus === 'error' && (
        <Alert severity={`${submissionStatus}`}>
          Your ticket couldn't be submitted, due to network issues. Try again
          later
        </Alert>
      )}
      {/* </div> */}
    </div>
  );
};

export default Form;
