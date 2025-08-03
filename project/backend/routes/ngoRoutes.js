const express = require('express');
const { getAllNgos } = require('../controllers/ngoController');
const router = express.Router();

// Get list of all NGOs
router.get('/', getAllNgos);

module.exports = router;
