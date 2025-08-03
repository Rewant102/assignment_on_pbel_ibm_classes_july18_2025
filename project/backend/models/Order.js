const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  status: { type: String, default: 'Pending' }, // Pending → Confirmed → Completed
  totalAmount: { type: Number },
  contactInfo: { type: String }, // email or phone for bill
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
