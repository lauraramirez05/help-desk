const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const ticketRouter = require('./routes/TicketRouter');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(
  cors({
    origin: [
      'https://help-desk-frontend5.vercel.app',
      'https://help-desk-n98w.vercel.app',
    ],
    methods: ['GET', 'POST', 'PATCH'], // Adjust methods as needed
    credentials: true, // If your frontend sends credentials (cookies, headers)
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', ticketRouter);

app.get('/', (req, res) => res.send('Express on Vercel'));

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

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
