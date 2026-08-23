const { OpenAI } = require('openai');

// NaraRouter API ka setup
const openai = new OpenAI({
  baseURL: 'https://router.bynara.id/v1', // Photo mein diya gaya API Endpoint
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const prompt = req.body.prompt;
    
    // Qwen model ko call kar rahe hain
    const response = await openai.chat.completions.create({
      model: "qwen-3.8-max-free", // Photo mein diya gaya model
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Error: NaraRouter API se connect nahi ho paya." });
  }
};
