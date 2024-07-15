const shortid = require('shortid');
const db = require('../models/TicketModel');

const TicketController = {
  async createTicket(req, res, next) {
    console.log('in the controller');
    const { name, email, description } = req.body;

    // Log the input data
    console.log('Request body:', req.body);

    try {
      console.log('isnide try block');
      //Checking for duplicate id
      let newTicket;
      let isUnique = false;
      while (!isUnique) {
        const id = shortid.generate();
        console.log(id);
        const existingTicket = await db.findById(id);
        if (!existingTicket) {
          newTicket = await db.create({
            _id: id,
            name: name,
            email: email,
            description: description,
          });

          isUnique = true;
        }
      }
      console.log('new ticket created', newTicket);
      res.locals.ticketId = newTicket._id;
      next();
    } catch (error) {
      console.error('Error creating ticket:', error);
      next(error);
    }
  },
};

module.exports = TicketController;
