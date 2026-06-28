const express = require('express');
const router = express.Router();
const axios = require('axios');

const intents = {
  weather: ['weather', 'mausam', 'barish', 'temperature', 'garmi', 'sardi'],
  news: ['news', 'khabar', 'headlines', 'samachar', 'today'],
  dictionary: ['meaning', 'matlab', 'definition', 'word', 'synonyms'],
  flashcard: ['flashcard', 'save', 'yaad karo', 'card', 'topic'],
  wikipedia: ['wikipedia', 'kaun hai', 'kya hai', 'history', 'explain'],
  greeting: ['hello', 'hi', 'hey', 'salam', 'namaste', 'assalamualaikum'],
};

function detectIntent(message) {
  const msg = message.toLowerCase();
  for (const [intent, keywords] of Object.entries(intents)) {
    for (const keyword of keywords) {
      if (msg.includes(keyword)) return intent;
    }
  }
  return 'chat';
}

async function callGroq(message) {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are Jarvis, a helpful assistant. Reply in Hinglish.' },
        { role: 'user', content: message }
      ]
    },
    { headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' } }
  );
  return response.data.choices[0].message.content;
}


async function callGemini(message) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: message }] }] },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data.candidates[0].content.parts[0].text;
}
async function callWikipedia(message) {
  const response = await axios.get(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(message)}`,
    { headers: { 'User-Agent': 'NexusAI/1.0 (rizwan-creates@github)' } }
  );
  return response.data.extract || 'Wikipedia pe nahi mila!';
}

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const intent = detectIntent(message);
    let reply = '';
    if (intent === 'greeting') {
      reply = 'Salam bhai! Main Jarvis hoon, kya kaam hai?';
    } else if (intent === 'wikipedia') {
      const topic = message.replace(/kya hai|kaun hai|wikipedia|explain|history/gi, '').trim();
      reply = await callWikipedia(topic);
    } else if (intent === 'news') {
      reply = 'News ke liye /api/news use karo!';
    } else if (intent === 'dictionary') {
      reply = 'Dictionary ke liye /api/dictionary use karo!';
    } else {
      try {
      reply = await callGroq(message);
    } catch (groqError) {
      console.log('Groq failed, trying Gemini...');
      reply = await callGemini(message);
    }
    }
    res.json({ reply, intent });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
