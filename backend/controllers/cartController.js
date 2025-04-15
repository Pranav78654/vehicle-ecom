const { Cart, Car } = require("../models");

// ✅ Get cart for logged-in user (userId from token)
exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from verified JWT

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Car }],
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

// ✅ Add item to cart for logged-in user
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token
    const { carId, quantity } = req.body;

    const existingItem = await Cart.findOne({ where: { userId, carId } });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json({ message: "Quantity updated", item: existingItem });
    }

    const newItem = await Cart.create({ userId, carId, quantity: quantity || 1 });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error });
  }
};

// ✅ Remove item from cart for logged-in user
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId } = req.body;

    const deleted = await Cart.destroy({
      where: { userId, carId },
    });

    if (deleted) {
      res.status(200).json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error });
  }
};

// ✅ Clear entire cart for logged-in user
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.destroy({ where: { userId } });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};
