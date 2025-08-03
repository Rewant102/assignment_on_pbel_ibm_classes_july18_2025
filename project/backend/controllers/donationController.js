const Donation = require('../models/Donation');

// Create a new donation
const createDonation = async (req, res) => {
  const { donor, ngo, items, status } = req.body;

  try {
    const newDonation = new Donation({ donor, ngo, items, status });
    await newDonation.save();
    res.status(201).json({ message: 'Donation created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get donations by user (either donor or NGO)
const getDonationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const donations = await Donation.find({
      $or: [{ donor: userId }, { ngo: userId }]
    }).populate('donor', 'name email').populate('ngo', 'name email');
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'name email')
      .populate('ngo', 'name email');
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createDonation,
  getDonationsByUser,
  getAllDonations
};
