const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const cat = category || 'technology';

    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&max=5&apikey=${process.env.GNEWS_API_KEY}`
    );

    const articles = response.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      publishedAt: a.publishedAt
    }));

    res.json({ category: cat, articles });
  } catch (error) {
    res.status(500).json({ error: 'News fetch failed' });
  }
});

module.exports = router;
