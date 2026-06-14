const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'NexusAI API is live! 🔥', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`NexusAI running on port ${PORT}`);
});
