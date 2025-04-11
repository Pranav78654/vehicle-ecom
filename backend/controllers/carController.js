const db = require("../models");
const Car = db.Car;
const Brand = db.Brand;

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