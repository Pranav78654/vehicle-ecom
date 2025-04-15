const { Cart, Car, Brand, CarType } = require('../models');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId } = req.body;

    // Prevent duplicate
    const existing = await Cart.findOne({ where: { userId, carId } });
    if (existing) return res.status(409).json({ error: 'Car already in cart' });

    const item = await Cart.create({ userId, carId });
    res.status(201).json({ message: 'Added to cart', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.getUserCart = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: Car,
            include: [
              { model: Brand },
              { model: CarType }
            ]
          }
        ],
      });
  
      res.json({ cart: cartItems });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  };

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId } = req.params;

    const deleted = await Cart.destroy({ where: { userId, carId } });
    if (!deleted) return res.status(404).json({ error: 'Item not found in cart' });

    res.json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};
