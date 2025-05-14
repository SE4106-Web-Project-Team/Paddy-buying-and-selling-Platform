// routes/chatbot.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `
    You are a friendly and knowledgeable agricultural assistant specialized in paddy farming and rice trading.
    You help farmers, buyers, and sellers with things like:
    - When and how to plant paddy in different regions
    - Identifying and treating common diseases (like rice blast, bacterial blight)
    - Best fertilizer and pesticide practices
    - Paddy market prices and trading advice
    - Seasonal tips and crop yield improvement
    - Organic and sustainable farming methods

    If the user is a buyer or seller, provide helpful information about storing, pricing, and selling paddy.

    Use simple English and avoid technical jargon when possible. Always try to be supportive and clear.
  `,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get chatbot response" });
  }
});

module.exports = router;
