const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }], // Will store file URLs or paths
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
