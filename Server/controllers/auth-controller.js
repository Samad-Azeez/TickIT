import { userModel } from '../models/user-model.js';
import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError, BadRequestError } from '../errors/index.js';

// Register user and send token in response
const register = async (req, res) => {
  const user = await userModel.create(req.body);
  const token = userModel.createJWT();

  res.satus(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// Login user and send token in response
const login = async (req, res) => {
  const { email, password } = req.body;

  // check if the email and password are provided
  if (!email || !password) {
    throw new BadRequestError('please provide email and password');
  }

  const user = userModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }

  const isPasswordCorrect = await userModel.matchPassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials');
  }

  token = userModel.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
export { register, login };
