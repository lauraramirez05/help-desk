const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRouter = require('./routes/TicketRouter');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3000;

app.use(cors()); //if fe and be and hosted in diff domains
app.use(express.json());

//environment variables
const DB_URL = process.env.DB_URL;

//Connect Database
mongoose
  .connect(DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Serve static files (built React app)
app.use(express.static(path.join(__dirname, '../client', '../build')));

// Use Routes
app.use('/api', ticketRouter);

//404 Handler
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

//Global error handler
app.use((error, req, res, next) => {
  console.log('Hit global error');
  //Default 500 means internal server error
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

// app.post('/api/submit-form', (req, res) => {
//   console.log(req.body);
//   res.send('Hello from the backend!');
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
