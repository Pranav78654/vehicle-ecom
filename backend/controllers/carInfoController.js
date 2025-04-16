const { CarInfo } = require('../models');

exports.createCarInfo = async (req, res) => {
  try {
    const carInfo = await CarInfo.create(req.body);
    res.status(201).json({ message: 'Car info added', data: carInfo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create car info', details: err.message });
  }
};

exports.getCarInfoByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const carInfo = await CarInfo.findOne({ where: { carId } });

    if (!carInfo) return res.status(404).json({ error: 'Car info not found' });

    res.json(carInfo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car info' });
  }
};
