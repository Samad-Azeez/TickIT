import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please provide a password'],
      minlength: 6,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Sign JWT and return it
UserSchema.methods.createJWT = async function () {
  return jsonwebtoken.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET, // secret key
    {
      expiresIn: process.env.JWT_LIFETIME, // token lifetime
    }
  );
};

export const userModel = mongoose.model('User', UserSchema);
