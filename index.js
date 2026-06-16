const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const chatRoute = require('./routes/chat');
app.use('/api/chat', chatRoute);

const dictionaryRoute = require('./routes/dictionary');
app.use('/api/dictionary', dictionaryRoute);

const newsRoute = require('./routes/news');
app.use('/api/news', newsRoute);

const flashcardsRoute = require('./routes/flashcards');
app.use('/api/flashcards', flashcardsRoute);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'NexusAI API is live! 🔥', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`NexusAI running on port ${PORT}`);
});
