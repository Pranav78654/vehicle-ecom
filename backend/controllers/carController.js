const db = require("../models");
const Car = db.Car;
const Brand = db.Brand;
const CarType = db.CarType; // import CarType at the top
const { Op } = require("sequelize");
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({ include: Brand });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id, { include: Brand });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCar = async (req, res) => {
  try {
    const carData = req.body;

    if (req.file) {
      carData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newCar = await Car.create(carData);
    res.status(201).json(newCar);
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(400).json({ error: err.message });
  }
};
exports.searchCars = async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const cars = await Car.findAll({
      where: {
        [Op.or]: [
          { carName: { [Op.like]: `%${query}%` } },
          { fuel: { [Op.like]: `%${query}%` } },
          { ownershipStatus: { [Op.like]: `%${query}%` } },
          { "$Brand.brandName$": { [Op.like]: `%${query}%` } },
          { "$CarType.typeName$": { [Op.like]: `%${query}%` } }
        ]
      },
      include: [
        { model: Brand, attributes: [], required: false },
        { model: CarType, attributes: [], required: false }
      ]
    });

    if (cars.length === 0) {
      return res.status(404).json({ message: "No matching cars found" });
    }

    res.json({ data: cars });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getSuggestions = async (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    const suggestions = await Car.findAll({
      where: {
        carName: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['carName'],
      limit: 5
    });

    const results = suggestions.map((c) => c.carName);
    res.json({ suggestions: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};