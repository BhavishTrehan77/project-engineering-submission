
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Node fetch for Node <18
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config(); // Load .env

console.log("Loaded API Key:", process.env.OPENROUTER_API_KEY ? " OK" : " MISSING");

const app = express();
const PORT = process.env.PORT || 5000; // Use 5000 to avoid port conflicts

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// Chat route
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ reply: "Messages are required" });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.log("API KEY MISSING");
      return res.status(500).json({ reply: "Server error: API key missing" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "My Chatbot"
      },
      body: JSON.stringify({
         model: 'openai/gpt-4o-mini',
        messages: messages
      })
    });

    const data = await response.json();

    console.log(" Full Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.json({ reply: `API Error: ${data.error.message}` });
    }

    if (!data.choices || data.choices.length === 0) {
      return res.json({ reply: "AI did not respond. Check server logs." });
    }

    const aiReply = data.choices[0]?.message?.content || "AI returned empty response.";

    res.json({ reply: aiReply });

  } catch (error) {
    console.error(" SERVER ERROR:", error);
    res.status(500).json({ reply: "Server crashed. Check backend." });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});