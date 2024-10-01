import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { notFound } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { connectDB } from './db/connect.js';
import { authRouter } from './routes/auth.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRouter);

// Catch All
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Connect to DB and start the server
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
