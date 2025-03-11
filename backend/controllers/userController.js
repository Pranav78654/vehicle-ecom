const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { Op } = require("sequelize");
// **Register User**
exports.register = async (req, res) => {
    try {
      const { username, phone, password, role_id } = req.body;
  
      if (!username || !phone || !password) {
        return res.status(400).json({ error: 'Username, phone, and password are required' });
      }

      const existingUser = await User.findOne({ where: { phone } });
      if (existingUser) {
        return res.status(400).json({ error: 'Phone number already registered' });
      }

      // Default role_id to 2 if not provided
      const newUser = await User.create({ 
        username, 
        phone, 
        password, 
        role_id: role_id || 2 // Defaults to "User" role
      });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: error.message });
    }
};

// **Login User**

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "Identifier and password are required" });
    }

    // Find user by phone or username
    const user = await User.findOne({
      where: {
        [Op.or]: [{ phone: identifier }, { username: identifier }]
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

// **Get All Users**
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};
