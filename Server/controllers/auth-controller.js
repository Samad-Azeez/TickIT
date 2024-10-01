import { userModel } from '../models/user-model.js';
import { StatusCodes } from 'http-status-codes';
import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from '../errors/index.js';

const register = async (req, res) => {
  res.send('register route');
};

const login = async (req, res) => {
  res.send('login route');
};

export { register, login };
