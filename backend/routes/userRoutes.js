const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authmiddleware')
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers);
router.get('/me', authenticate, userController.getLoggedInUser);

router.post('/logout', (req, res) => {
    res.clearCookie('token'); // or whatever cookie name you set for JWT
    return res.status(200).json({ message: 'Logged out successfully' });
  });

  router.get('/validate', authenticate, (req, res) => {
    res.json({ isLoggedIn: true, userId: req.user.id });
  });
module.exports = router;
