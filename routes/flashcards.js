const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  topic: String,
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const { topic } = req.query;
    const query = topic ? { topic: new RegExp(topic, 'i') } : {};
    const cards = await Flashcard.find(query);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Add flashcard
router.post('/', async (req, res) => {
  try {
    const { topic, question, answer } = req.body;
    if (!topic || !question || !answer) {
      return res.status(400).json({ error: 'topic, question and answer required' });
    }
    const card = new Flashcard({ topic, question, answer });
    await card.save();
    res.json({ message: 'Flashcard added!', card });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add flashcard' });
  }
});

// Delete flashcard
router.delete('/:id', async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
});

module.exports = router;
