const express = require("express");
const router = express.Router();
const controller = require("../controllers/carTypeController");

router.get("/", controller.getAllCarTypes);
router.post("/", controller.createCarType);
router.put("/:id", controller.updateCarType);
router.delete("/:id", controller.deleteCarType);

module.exports = router;
