import express from 'express';
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/tickets-controller.js';

export const ticketRouter = express.Router();

ticketRouter.route('/').get(getTickets).post(createTicket);

ticketRouter
  .route('/:id')
  .get(getTicket)
  .patch(updateTicket)
  .delete(deleteTicket);
