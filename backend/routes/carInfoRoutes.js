const express = require('express');
const router = express.Router();
const carInfoController = require('../controllers/carInfoController');

// POST /api/carinfo
router.post('/', carInfoController.createCarInfo);

// GET /api/carinfo/:carId
router.get('/:carId', carInfoController.getCarInfoByCarId);

module.exports = router;
