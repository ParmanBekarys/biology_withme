// api/chat.js
const { OpenAI } = require('openai');

module.exports = async (req, res) => {
  // Handle CORS headers for preflight requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS (preflight) request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { messages } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured' 
      });
    }
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    console.log('Making request to OpenAI with messages:', JSON.stringify(messages));
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    
    console.log('Received response from OpenAI:', JSON.stringify(response));
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};