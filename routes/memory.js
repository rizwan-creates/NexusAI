const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model('Memory', memorySchema);

// Save memory
router.post('/', async (req, res) => {
  try {
    const { key, value } = req.body;
    await Memory.findOneAndUpdate({ key }, { value }, { upsert: true });
    res.json({ message: 'Memory saved!', key, value });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save memory' });
  }
});

// Get memory
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json({ memories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get memories' });
  }
});

// Get specific memory
router.get('/:key', async (req, res) => {
  try {
    const memory = await Memory.findOne({ key: req.params.key });
    res.json({ key: memory.key, value: memory.value });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get memory' });
  }
});

// Delete memory
router.delete('/:key', async (req, res) => {
  try {
    await Memory.findOneAndDelete({ key: req.params.key });
    res.json({ message: 'Memory deleted!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete memory' });
  }
});

module.exports = router;