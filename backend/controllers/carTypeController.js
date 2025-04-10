const db = require("../models");
const CarType = db.CarType;

exports.getAllCarTypes = async (req, res) => {
  try {
    const types = await CarType.findAll();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCarType = async (req, res) => {
  try {
    const type = await CarType.create(req.body);
    res.status(201).json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCarType = async (req, res) => {
  try {
    const updated = await CarType.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCarType = async (req, res) => {
  try {
    await CarType.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
