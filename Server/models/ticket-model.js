import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide a user id'],
    },
    title: {
      type: String,
      required: [true, 'please provide a title'],
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: String,
      required: [true, 'please provide a category'],
      enum: ['bug', 'feature request', 'other'],
      required: true,
    },
    description: {
      type: String,
      required: [true, 'please provide a description'],
      minlength: 3,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['open', 'in progress', 'resolved', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

export const ticketModel = mongoose.model('Ticket', TicketSchema);
