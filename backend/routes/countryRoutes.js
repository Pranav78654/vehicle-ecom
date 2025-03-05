const express = require('express');
const countryController = require('../controllers/countryController'); 
const router = express.Router();

// Route to add new countries
router.post('/add-countries', countryController.addCountries);

// Route to get all countries
router.get('/countries', countryController.getCountries);

module.exports = router;
