import { ticketModel } from '../models/ticket-model.js';
import { StatusCodes } from 'http-status-codes';
import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from '../errors/index.js';

// Get all tickets
const getTickets = async (req, res) => {
  const ticket = await ticketModel
    .find({ createdBy: req.user.userId })
    .sort({ createdAt: 1 });

  const nbHits = ticket.length;
  res.status(StatusCodes.OK).json({ ticket, nbHits });
};

// Create a ticket
const createTicket = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const ticket = await ticketModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ ticket });
};

// Get a ticket by id
const getTicket = async (req, res) => {
  // get the user id and ticket id from the request object
  const {
    user: { userId },
    params: { id: ticketId },
  } = req;

  const ticket = await ticketModel.findOne({
    // find the ticket by id and user id
    _id: ticketId,
    createdBy: userId,
  });

  // check if the ticket exists
  if (!ticket) {
    throw new NotFoundError(`No job with id : ${ticketId}`);
  }

  res.status(StatusCodes.OK).json({ ticket });
};

// Update a ticket by id
const updateTicket = async (req, res) => {
  // get the user id and ticket id from the request object
  const {
    user: { userId },
    params: { id: ticketId },
    body: { title, category, description },
  } = req;

  // check if the request body is empty
  if (!title || !category || !description) {
    throw new BadRequestError('Please provide all fields');
  }

  // find the ticket by id and user id and update it
  const ticket = await ticketModel.findOneAndUpdate(
    {
      _id: ticketId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  // check if the ticket exists
  if (!ticket) {
    throw new NotFoundError(`No job with id : ${ticketId}`);
  }

  res.status(StatusCodes.OK).json({ ticket });
};

// Delete a ticket by id
const deleteTicket = async (req, res) => {
  // get the user id and ticket id from the request object
  const {
    user: { userId },
    params: { id: ticketId },
  } = req;

  // find the ticket by id and user id and delete it
  const ticket = await ticketModel.findOneAndDelete({
    _id: ticketId,
    createdBy: userId,
  });

  // check if the ticket exists
  if (!ticket) {
    throw new NotFoundError(`No job with id : ${ticketId}`);
  }

  // send a response
  res.status(StatusCodes.OK).json({ msg: 'Ticket deleted' });
};

export { createTicket, getTicket, getTickets, updateTicket, deleteTicket };
