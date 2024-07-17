const mongoose = require('mongoose');
const shortid = require('shortid');

const ticketSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/, //regex expression check the format of the email. Makes sures that it has an @ and .com or .org
      'Please fill a valid email address',
    ],
    trim: true, //remove any white spaces
    lowercase: true, //convert to lower case
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Done'],
    default: 'New',
  },
  createdAt: { type: Date, default: Date.now },
  messages: {
    type: [String],
    default: [],
  },
});

const ticketModel = mongoose.model('ticket', ticketSchema);
module.exports = ticketModel;
