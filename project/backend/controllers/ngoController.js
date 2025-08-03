const User = require('../models/User');

// Get all users with role 'ngo'
const getAllNgos = async (req, res) => {
  try {
    const ngos = await User.find({ role: 'ngo' }).select('-password');
    res.status(200).json(ngos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllNgos
};
