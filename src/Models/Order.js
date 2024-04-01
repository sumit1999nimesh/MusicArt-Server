const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  paymentType: { type: String, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productColor: { type: String, required: true },
    productImage: { type: String, required: true },
    productQuantity: { type: Number, required: true }
  }],
  grandTotal: { type: Number, required: true }
}, { timestamps: true });

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;