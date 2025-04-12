const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require("../middlewares/upload");
router.get("/search", carController.searchCars);
router.get("/suggestions", carController.getSuggestions);
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.post("/", upload.single('image'), carController.createCar);

module.exports = router;
