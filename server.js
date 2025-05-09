require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create proxy endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    
    res.json(response);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: error.message });
  }
});

// Make sure all routes go to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});