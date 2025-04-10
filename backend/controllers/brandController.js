const db = require("../models");
const Brand = db.Brand;

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new brand
exports.createBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update existing brand
exports.updateBrand = async (req, res) => {
  try {
    const updated = await Brand.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: "Brand updated successfully", updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete brand (also deletes associated cars via CASCADE)
exports.deleteBrand = async (req, res) => {
  try {
    const deleted = await Brand.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Brand not found" });
    res.json({ message: "Brand and associated cars deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
