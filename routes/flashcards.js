const express = require('express');
const router = express.Router();

let flashcards = [];
let idCounter = 1;

// Get all flashcards
router.get('/', (req, res) => {
  const { topic } = req.query;
  if (topic) {
    const filtered = flashcards.filter(f => f.topic.toLowerCase() === topic.toLowerCase());
    return res.json(filtered);
  }
  res.json(flashcards);
});

// Add flashcard
router.post('/', (req, res) => {
  const { topic, question, answer } = req.body;
  if (!topic || !question || !answer) {
    return res.status(400).json({ error: 'topic, question and answer required' });
  }
  const card = { id: idCounter++, topic, question, answer };
  flashcards.push(card);
  res.json({ message: 'Flashcard added!', card });
});

// Delete flashcard
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  flashcards = flashcards.filter(f => f.id !== id);
  res.json({ message: 'Flashcard deleted!' });
});

module.exports = router;
