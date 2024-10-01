import { ticketModel } from '../models/ticket-model.js';
import { StatusCodes } from 'http-status-codes';
import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from '../errors/index.js';

// Get all tickets
const getTickets = async (req, res) => {
  res.send('get tickets route');
};

// Create a ticket
const createTicket = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const ticket = await ticketModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ ticket });
};

// Get a ticket by id
const getTicket = async (req, res) => {
  res.send('get ticket route');
};

// Update a ticket by id
const updateTicket = async (req, res) => {
  res.send('update ticket route');
};

// Delete a ticket by id
const deleteTicket = async (req, res) => {
  res.send('delete ticket route');
};

export { createTicket, getTicket, getTickets, updateTicket, deleteTicket };
