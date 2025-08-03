const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'is invalid']  // Email format validation
    },
    password: {
      type: String,
      required: true,
      select: false  // Do not return password by default
    },
    address: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'ngo','admin'],  // You can also add 'admin' here if needed
      default: 'user',
      required: true
    }
  },
  {
    timestamps: true  // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);
