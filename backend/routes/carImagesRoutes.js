// routes/carImagesRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { CarImages } = require('../models');
const cloudinary = require('../config/cloudinary');

router.post('/upload/:carId', upload.array('images', 5), async (req, res) => {
  const { carId } = req.params;
  const files = req.files;

  if (!files || !files.length) {
    return res.status(400).json({ error: 'No images uploaded' });
  }

  try {
    const imageEntries = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'vehicle-images' }, // optional: put in folder
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );

      // Upload using promise + stream
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'vehicle-images' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(fileBuffer);
        });
      };

      const uploadResult = await streamUpload(file.buffer);

      imageEntries.push({
        carId: parseInt(carId),
        imageUrl: uploadResult.secure_url, // get URL from Cloudinary
      });
    }

    await CarImages.bulkCreate(imageEntries);
    res.status(201).json({ message: 'Images uploaded successfully', data: imageEntries });
  } catch (err) {
    console.error('Upload failed:', err);
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
