const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  email: String, // unique
  verify: {
    type: Boolean,
    default: false,
  },
  password: String,
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
  basket: [
    {
      product: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
      ],
      status: {
        type: String,
        enum: ['ACCEPT', 'ORDER'],
        default: 'ACCEPT',
      },
    },
  ],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
