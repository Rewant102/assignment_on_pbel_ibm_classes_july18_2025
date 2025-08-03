const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
 // JWT middleware
const Product = require('../models/Product'); // if needed for price validation
const User = require('../models/User');

// Create a new order
router.post('/', protect, async (req, res) => {

  try {
    const userId = req.user.id;
    const { products, contactInfo } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Products are required' });
    }

    // Calculate totalAmount
    let totalAmount = 0;

    for (let item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      totalAmount += product.price * item.quantity;
    }

    const newOrder = new Order({
      userId,
      products,
      contactInfo,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
