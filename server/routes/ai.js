const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MOCK_KEY');

// POST /api/ai/generate
router.post('/generate', async (req, res) => {
    try {
        const { prompt, dietary_tags, cuisine } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(503).json({
                message: 'Gemini API Key not configured. Using Mock Response.',
                mock: true
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const fullPrompt = `
            Create a detailed recipe for a dish based on this description: "${prompt}".
            Cuisine: ${cuisine || 'Any'}.
            Dietary restrictions: ${dietary_tags ? dietary_tags.join(', ') : 'None'}.
            
            Return ONLY valid JSON with this exact schema (no markdown formatting):
            {
                "title": "Recipe Title",
                "description": "Short appetizing description",
                "prep_time": 15,
                "cook_time": 20,
                "servings": 2,
                "difficulty": "medium",
                "calories": 450,
                "ingredients": [
                    { "name": "Ingredient 1", "quantity": "1 cup" },
                    { "name": "Ingredient 2", "quantity": "200g" }
                ],
                "instructions": [
                    "Step 1 description...",
                    "Step 2 description..."
                ],
                "nutrition": {
                    "calories": 450,
                    "protein": 20,
                    "carbs": 30,
                    "fats": 15
                }
            }
        `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const recipeData = JSON.parse(jsonStr);

        // Add UUID
        recipeData.id = "ai-" + Date.now();

        res.json(recipeData);

    } catch (error) {
        console.error('AI Gen Error:', error);
        res.status(500).json({ message: 'Failed to generate recipe' });
    }
});

module.exports = router;
