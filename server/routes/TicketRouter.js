const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controller/TicketController');

ticketRouter.post('/submit-form', ticketController.createTicket, (req, res) => {
  return res.status(404).json(res.locals.ticketId);
});

module.exports = ticketRouter;
