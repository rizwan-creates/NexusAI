const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
const chatRoute = require('./routes/chat');
const dictionaryRoute = require('./routes/dictionary');
const newsRoute = require('./routes/news');
const flashcardsRoute = require('./routes/flashcards');
const brainRoute = require('./routes/brain');
const gutenbergRoute = require('./routes/gutenberg');
const memoryRoute = require('./routes/memory');

app.use('/api/chat', chatRoute);
app.use('/api/dictionary', dictionaryRoute);
app.use('/api/news', newsRoute);
app.use('/api/flashcards', flashcardsRoute);
app.use('/api/brain', brainRoute);
app.use('/api/gutenberg', gutenbergRoute);
app.use('/api/memory', memoryRoute);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'NexusAI API is live! 🔥', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`NexusAI running on port ${PORT}`);
});
