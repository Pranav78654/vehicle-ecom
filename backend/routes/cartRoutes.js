const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/authmiddleware');

// Add to cart
router.post('/add', auth, cartController.addToCart);

// Get user cart
router.get('/my-cart', auth, cartController.getUserCart);

// Remove from cart
router.delete('/remove/:carId', auth, cartController.removeFromCart);

module.exports = router;
