const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded 
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin@123";

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
 
  try {
     // Prevent admin registration via API
     if (email === ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Admin account cannot be registered' });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user'
      
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let user = await User.findOne({ email });

    // Admin login handling
    if (email === ADMIN_EMAIL) {
      if (!user) {
        return res.status(404).json({ message: 'Admin account does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid admin credentials' });
      }

      const token = jwt.sign({ userId: user._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token, role: "admin" });
    }

    // Regular user login
    if (!user) {
      return res.status(404).json({ message: `User with email ${email} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
