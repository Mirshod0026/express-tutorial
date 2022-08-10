const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: String,
  color: {
    type: String,
    enum: ['black', 'white'],
    default: 'black',
  },
  price: Number,
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'ProductType',
  },
  isActive: Boolean,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
