// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get all orders
router.get('/orders', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.productId', 'title price')
      .populate('userId', 'username email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

// Update order status
router.put('/orders/:id', verifyTokenAndAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
});

// Get all users
router.get('/users', verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// Analytics
router.get('/analytics', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalUsers = await User.countDocuments();

    const productSales = {};
    orders.forEach(order => {
      order.products.forEach(item => {
        const id = item.productId.toString();
        productSales[id] = (productSales[id] || 0) + item.quantity;
      });
    });

    const sortedProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
    const mostSoldProductId = sortedProducts?.[0]?.[0];
    const mostSoldProduct = mostSoldProductId
      ? await Product.findById(mostSoldProductId).select('title price')
      : null;

    res.json({
      totalRevenue,
      totalUsers,
      mostSoldProduct,
    });
  } catch (err) {
    res.status(500).json({ message: 'Analytics error', error: err.message });
  }
});

module.exports = router;
