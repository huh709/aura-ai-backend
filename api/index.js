const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function(req, res) {
  // CORS Setup (Taaki aapki HTML file isko access kar sake)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const prompt = req.body.prompt;

    // Google AI ko call kar rahe hain (API key securely environment se aayegi)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    res.status(200).json({ answer: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Error: Backend server se connect nahi ho paya." });
  }
};
