const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const cat = category || 'technology';

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=5&apiKey=${process.env.NEWSAPI_KEY}`
    );

    const articles = response.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      publishedAt: a.publishedAt
    }));

    res.json({ category: cat, articles });
  } catch (error) {
    console.error('News error:', error.response?.data || error.message);
    res.status(500).json({ error: 'News fetch failed' });
  }
});

module.exports = router;
