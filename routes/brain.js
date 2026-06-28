const express = require('express');
const router = express.Router();

const intents = {
  weather: ['weather', 'mausam', 'barish', 'temperature', 'garmi', 'sardi'],
  news: ['news', 'khabar', 'headlines', 'samachar', 'today'],
  dictionary: ['meaning', 'matlab', 'definition', 'word', 'synonyms'],
  flashcard: ['flashcard', 'save', 'yaad karo', 'card', 'topic'],
  wikipedia: ['wikipedia', 'kaun hai', 'kya hai', 'history', 'explain'],
  greeting: ['hello', 'hi', 'hey', 'salam', 'namaste', 'assalamualaikum'],
  chat: []
};

function detectIntent(message) {
  const msg = message.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(intents)) {
    for (const keyword of keywords) {
      if (msg.includes(keyword)) {
        return intent;
      }
    }
  }
  
  return 'chat';
}

router.post('/', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  const intent = detectIntent(message);
  
  res.json({ 
    message,
    intent,
    action: `Route to ${intent}`
  });
});

module.exports = router;
