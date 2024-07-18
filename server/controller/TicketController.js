const shortid = require('shortid');
const db = require('../models/TicketModel');

const TicketController = {
  async createTicket(req, res, next) {
    console.log('creating new ticket middleware');
    console.log(req.body);
    const { name, email, description } = req.body;

    // Log the input data

    try {
      //Checking for duplicate id
      let newTicket;
      let isUnique = false;
      while (!isUnique) {
        const id = shortid.generate();
        const shortedId = id.substring(0, 6);
        const existingTicket = await db.findById(shortedId);
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
      res.locals.ticketId = newTicket._id;
      next();
    } catch (error) {
      console.error('Error creating ticket:', error);
      next(error);
    }
  },

  async getTickets(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
      const tickets = await db
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await db.countDocuments();

      console.log('tickets info from backend:', tickets);
      res.locals.tickets = {
        tickets,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };

      next();
    } catch (error) {
      console.error('Error creating ticket:', error);
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    const ticketId = req.params.id;
    const { status } = req.body;

    try {
      const updatedTicket = await db.findByIdAndUpdate(
        ticketId,
        { status: status },
        { new: true }
      );

      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      console.log('updated ticket', updatedTicket);
      res.locals.updatedTicket = updatedTicket;
      next();
    } catch (error) {
      next(error);
    }
  },

  async searchTicket(req, res, next) {
    console.log('searchTicket controller');
    const query = req.params.query;
    console.log('Query', query);
    try {
      const ticket = await db.findOne({
        _id: query,
      });
      res.locals.matchingTicket = ticket;
      console.log(res.locals.matchingTicket);
      next();
    } catch (error) {
      console.error('Error searching tickets:', error);
      next(error);
    }
  },

  async filterTickets(req, res, next) {
    const { status, orderBy, startDate, endDate } = req.query;

    //Parse the status filter, to make it into an object
    const statusFilters = JSON.parse(status);

    //Quer for MongoDB
    const query = {
      $or: [],
    };

    if (statusFilters.new) query.$or.push({ status: 'New' });
    if (statusFilters.inProgress) query.$or.push({ status: 'In Progress' });
    if (statusFilters.done) query.$or.push({ status: 'Done' });

    //Date Filters
    if (startDate && startDate !== 'undefined') {
      if (!query.createdAt) query.createdAt = {};
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate && endDate !== 'undefined') {
      if (!query.createdAt) query.createdAt = {};
      query.createdAt.$lte = new Date(endDate);
    }

    //Order By
    let sort = {};
    if (orderBy === 'New to Old') sort = { createdAt: -1 };
    else if (orderBy === 'Old to New') sort = { createdAt: 1 };

    try {
      console.log('before querying to database');
      const filteredTickets = await db.find(query).sort(sort).limit(5);
      console.log(filteredTickets);
      res.locals.filteredTickets = filteredTickets;
      console.log(res.locals.filteredTickets);
      return next();
    } catch (error) {
      next(error);
    }
  },

  async updateMessages(req, res, next) {
    const ticketId = req.params.id;
    const { messages } = req.body;

    try {
      const updatedTicket = await db.findByIdAndUpdate(
        ticketId,
        {
          $push: { messages: messages },
        },
        { new: true }
      );
      if (!updatedTicket) {
        return res.status(404).json({ message: `Ticket not found` });
      }

      console.log('updated ticket with messages:', updatedTicket);

      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TicketController;
