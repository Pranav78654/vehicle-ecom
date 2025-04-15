const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

// ✅ Signup User
exports.signup = async (req, res) => {
  try {
    const { name, phone, password, role_id } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'Name, phone, and password are required' });
    }

    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const newUser = await User.create({
      name,
      phone,
      password, // ✅ pass raw password
      role_id: role_id || 2, // default role_id
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Signup successful',
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        role_id: newUser.role_id,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error during signup' });
  }
};

// ✅ Login User (Phone Based)
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Error logging in' });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};


exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'phone', 'role_id']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
};

// ✅ Forgot Password (Phone Based)
exports.forgotPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    if (!phone || !newPassword) {
      return res.status(400).json({ error: 'Phone number and new password are required' });
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Forgot Password error:', error);
    return res.status(500).json({ error: 'Error updating password' });
  }
};
