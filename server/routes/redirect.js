import express from 'express';
import Url from '../models/Url.js';

const router = express.Router();

// GET /:shortcode - redirect to original URL
router.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const url = await Url.findOne({ shortCode: shortcode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
