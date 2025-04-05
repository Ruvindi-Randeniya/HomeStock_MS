const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs'); // Add this line at the top
const User = require("../../Models/user-management/userModel");
const { protect, adminOnly } = require("../../middleware/user-management/auth"); // Ensure these middleware functions are implemented

const router = express.Router();

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Register User (Admin Only)
// Register User (Admin Only)
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    const normalizedRole = role.toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password, // plain password, will be hashed in pre-save
      role: normalizedRole,
    });

    await user.save(); // trigger pre-save middleware

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Login (Universal)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log("Login attempt:", { email, password }); // Log login attempt
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  const userObject = user.toObject();
  delete userObject.password;

  res.json({
    token,
    role: user.role,
    user: userObject,
  });
});

// Fetch All Users (Admin Only)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err); // Log error for debugging
    res.status(500).json({ error: err.message });
  }
});

// Update User (Admin Only)
// Update User (Admin Only)
router.put("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const { firstname, lastname, email, role } = req.body;

    // Ensure role is lowercase
    const normalizedRole = role.toLowerCase();

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, role: normalizedRole },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete User (Admin Only)
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Error deleting user:', err); // Log error for debugging
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
