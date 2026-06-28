const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://gutendex.com/books?search=${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'NexusAI/1.0' } }
    );
    const books = response.data.results.slice(0, 5).map(book => ({
      id: book.id,
      title: book.title,
      authors: book.authors.map(a => a.name),
      downloadCount: book.download_count
    }));
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Books fetch failed' });
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://gutendex.com/books/${id}`,
      { headers: { 'User-Agent': 'NexusAI/1.0' } }
    );
    const book = response.data;
    res.json({
      id: book.id,
      title: book.title,
      authors: book.authors.map(a => a.name),
      subjects: book.subjects.slice(0, 5),
      downloadCount: book.download_count
    });
  } catch (error) {
    res.status(500).json({ error: 'Book not found' });
  }
});

module.exports = router;