const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: {
    type: Map,
    of: Number,
    default: {}
  },
  totalProducts: {
    type: Number,
    default: 0
  }
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;