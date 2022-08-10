const mongoose = require('mongoose');

const ProductTypeSchema = mongoose.Schema({
  name: String,
});

const ProductType = mongoose.model('ProductType', ProductTypeSchema);

module.exports = ProductType;
