import { userModel } from '../models/user-model.js';
import { StatusCodes } from 'http-status-codes';
import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from '../errors/index.js';

const createTicket = async (req, res) => {
  res.send('create ticket route');
};

const getTicket = async (req, res) => {
  res.send('get ticket route');
};

const getTickets = async (req, res) => {
  res.send('get tickets route');
};

const updateTicket = async (req, res) => {
  res.send('update ticket route');
};

const deleteTicket = async (req, res) => {
  res.send('delete ticket route');
};

export { createTicket, getTicket, getTickets, updateTicket, deleteTicket };
