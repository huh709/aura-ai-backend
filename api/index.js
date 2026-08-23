const { OpenAI } = require('openai');

// OpenAI setup (API key will be securely fetched from environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function(req, res) {
  // CORS Setup (This allows your HTML file to communicate with this server)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const prompt = req.body.prompt;
    
    // Calling the OpenAI API (Using the gpt-3.5-turbo model)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Error: Could not connect to the backend server or invalid API Key." });
  }
};
