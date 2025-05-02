const jwt = require('jsonwebtoken');
const User = require('../../Models/user-management/userModel');

// Middleware to protect routes requiring authentication
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    console.log('No token provided'); // Log for debugging purposes
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user:', decoded); // Log decoded token for debugging purposes
    req.user = await User.findById(decoded.id).select('-password'); // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err); // Log error for debugging
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to allow access only to admin users
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    console.log('Access denied: User is not an admin'); // Log for debugging
    return res.status(403).json({ message: 'Access denied. Admins only' });
  }
  console.log('User is admin, access granted'); // Log for debugging
  next(); // Proceed to the next middleware or route handler
};

module.exports = { protect, adminOnly };
