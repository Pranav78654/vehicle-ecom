const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authmiddleware");

// All cart routes now protected
router.get("/cart", authMiddleware, cartController.getCartByUser);
router.post("/cart", authMiddleware, cartController.addToCart);
router.delete("/cart", authMiddleware, cartController.removeFromCart);
router.delete("/cart/clear", authMiddleware, cartController.clearCart);

module.exports = router;
