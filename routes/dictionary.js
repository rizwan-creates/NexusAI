const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { word } = req.query;
    
    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }

    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const data = response.data[0];
    const result = {
      word: data.word,
      phonetic: data.phonetic || '',
      meanings: data.meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.slice(0, 2).map(d => d.definition),
        synonyms: m.synonyms.slice(0, 5)
      }))
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Word not found' });
  }
});

module.exports = router;
