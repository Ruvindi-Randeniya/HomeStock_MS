// aiRoute.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/recommend', async (req, res) => {
    const { prompt } = req.body;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { "role": "user", "content": prompt },
            ],
        });

        res.json({ message: chatCompletion.choices[0].message.content });
    } catch (err) {
        console.error("AI Error:", err.response?.data || err.message || err);
        res.status(500).json({ message: "AI recommendation failed" });
    }
});

module.exports = router;
