
import { Hono } from 'hono';
import { Bindings } from '../bindings';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = new Hono<{ Bindings: Bindings }>();

app.post('/generate', async (c) => {
    try {
        const { prompt, dietary_tags, cuisine } = await c.req.json();
        const apiKey = c.env.GEMINI_API_KEY;

        if (!apiKey || apiKey === 'MOCK_KEY') {
            return c.json({
                message: 'Gemini API Key not configured. Using Mock Response.',
                mock: true,
                // Mock data same as before
                title: "Mock Avocado Toast",
                description: "A delicious mock response.",
                prep_time: 10,
                cook_time: 5,
                servings: 1,
                difficulty: "easy",
                calories: 300,
                ingredients: [{ name: "Avocado", quantity: "1" }, { name: "Bread", quantity: "2 slices" }],
                instructions: ["Toast bread", "Mash avocado", "Spread on toast"],
                nutrition: { calories: 300, protein: 10, carbs: 30, fats: 15 }
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const fullPrompt = `
      Create a detailed recipe for a dish based on this description: "${prompt}".
      Cuisine: ${cuisine || 'Any'}.
      Dietary restrictions: ${dietary_tags ? dietary_tags.join(', ') : 'None'}.
      
      Return ONLY valid JSON with this exact schema (no markdown formatting):
      {
          "title": "Recipe Title",
          "description": "Short appetizing description",
          "prep_time": 15, // in minutes (integer)
          "cook_time": 20, // in minutes (integer)
          "servings": 2, // integer
          "difficulty": "medium", // string
          "calories": 450, // integer
          "ingredients": [
              { "name": "Ingredient Name", "quantity": "Quantity (e.g. 1 cup, 200g)", "unit": "" }
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
          },
          "cuisine_type": "Italian",
          "meal_type": "Dinner",
          "dietary_tags": ["Vegetarian"]
      }
    `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const recipeData = JSON.parse(jsonStr);

        return c.json(recipeData);

    } catch (error) {
        console.error('AI Gen Error:', error);
        return c.json({ message: 'Failed to generate recipe' }, 500);
    }
});

export default app;
