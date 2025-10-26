const db = require("../models");
const Car = db.Car;
const Brand = db.Brand;
const CarType = db.CarType; // import CarType at the top
const { Op } = require("sequelize");
const cloudinary = require('../config/cloudinary');

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

    // If a file is uploaded, upload it to Cloudinary
    if (req.file) {
      const uploadToCloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'vehicle-images' }, // optional folder
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(fileBuffer);
        });
      };

      const result = await uploadToCloudinary(req.file.buffer);
      carData.imageUrl = result.secure_url; // save Cloudinary URL
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
  const orderMap = {
    "price_asc": ["price", "ASC"],
    "price_desc": ["price", "DESC"],
    "year_asc": ["registeredYear", "ASC"],
    "year_desc": ["registeredYear", "DESC"],
    "kms_asc": ["kmsDriven", "ASC"],
    "kms_desc": ["kmsDriven", "DESC"],
  };
  const sortOrder = orderMap[req.query.sort] || ["id", "ASC"];
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
      order: [sortOrder],
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
        [Op.or]: [
          { carName: { [Op.like]: `%${query}%` } },
          { "$Brand.brandName$": { [Op.like]: `%${query}%` } },
          { "$CarType.typeName$": { [Op.like]: `%${query}%` } }
        ]
      },
      attributes: ['carName'],
      limit: 5,
      include: [
        { model: Brand, attributes: [], required: false },
        { model: CarType, attributes: [], required: false }
      ]
    });

    const results = suggestions.map((c) => c.carName);
    res.json({ suggestions: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};