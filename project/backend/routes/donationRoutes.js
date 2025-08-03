const express = require('express');
const { createDonation, getDonationsByUser, getAllDonations } = require('../controllers/donationController');
const router = express.Router();

// Create donation
router.post('/', createDonation);

// Get donations by a specific user (donor or NGO)
router.get('/user/:userId', getDonationsByUser);

// Get all donations (for admin or NGO dashboard)
router.get('/', getAllDonations);

module.exports = router;
