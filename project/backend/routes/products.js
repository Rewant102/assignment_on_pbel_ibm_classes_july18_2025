// backend/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Create product (admin only)
router.post('/', verifyTokenAndAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      title,
      description,
      price,
      category,
      image,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Product creation failed', error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get products', error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

// Update product (admin only)
router.put('/:id', verifyTokenAndAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, category, ...(image && { image }) },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});

module.exports = router;
