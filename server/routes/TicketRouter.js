const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controller/TicketController');

ticketRouter.post('/submit-form', ticketController.createTicket, (req, res) => {
  return res.status(200).json(res.locals.ticketId);
});

ticketRouter.get('/get-tickets', ticketController.getTickets, (req, res) => {
  console.log('sending data to frontend');
  return res.status(200).json(res.locals.tickets);
});

ticketRouter.patch(
  '/update-status/:id',
  ticketController.updateStatus,
  (req, res) => {
    console.log('hellooooo', res.locals.updatedTicket);
    return res.status(200).json(res.locals.updatedTicket);
  }
);

ticketRouter.patch(
  '/update-messages/:id',
  ticketController.updateMessages,
  (req, res) => {
    console.log('succesfully got to the end of route');
    return res.send(200);
  }
);

ticketRouter.get(
  '/search-ticket/:query',
  ticketController.searchTicket,
  (req, res) => {
    return res.status(200).json(res.locals.matchingTicket);
  }
);

ticketRouter.get(
  '/filter-tickets',
  ticketController.filterTickets,
  (req, res) => {
    return res.status(200).json(res.locals.filteredTickets);
  }
);

module.exports = ticketRouter;
