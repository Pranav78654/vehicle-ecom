// routes/carImagesRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { CarImages } = require('../models');

router.post('/upload/:carId', upload.array('images', 5), async (req, res) => {
  const { carId } = req.params;
  const files = req.files;

  if (!files || !files.length) {
    return res.status(400).json({ error: 'No images uploaded' });
  }

  try {
    const imageEntries = files.map(file => ({
      carId: parseInt(carId),
      imageUrl: `/uploads/${file.filename}`,
    }));

    await CarImages.bulkCreate(imageEntries);
    res.status(201).json({ message: 'Images uploaded successfully', data: imageEntries });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

router.get('/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const images = await CarImages.findAll({
      where: { carId: parseInt(carId) },
    });

    if (!images.length) {
      return res.status(404).json({ error: 'No images found for this car' });
    }

    res.status(200).json({ data: images });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images', details: err.message });
  }
});

module.exports = router;
