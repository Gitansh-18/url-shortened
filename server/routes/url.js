// Import statements
import express from 'express';
import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// Your URL validation function
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

// POST /api/shorten route
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  // Use validation here
  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Your existing logic to check if URL exists, generate shortcode, etc.
  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    }

    const shortCode = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    url = new Url({ originalUrl, shortCode, shortUrl });
    await url.save();

    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
