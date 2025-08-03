const express = require('express');
const router = express.Router();

// Fix the error by passing a real function
router.get('/cart', (req, res) => {
  res.json({ message: 'Cart route is working' });
});

module.exports = router;
