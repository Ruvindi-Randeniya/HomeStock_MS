const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteUser,
  updateUser
} = require('../../Controller/user-management/userController');

const { protect, adminOnly } = require('../../middleware/user-management/auth');

// Register a new user (admin only)
router.post('/register', protect, adminOnly, registerUser);

// Login
router.post('/login', loginUser);

// Get own profile
router.get('/profile', protect, getProfile);

// Update own profile
router.put('/profile', protect, updateProfile);

// Get all users (admin only)
router.get('/', protect, adminOnly, getAllUsers);

// Get single user by ID (admin only)
router.get('/:id', protect, adminOnly, getUserById);

// Delete user (admin only)
router.delete('/:id', protect, adminOnly, deleteUser);

// Update user (admin only)
router.put('/:id', protect, adminOnly, updateUser);

module.exports = router;
