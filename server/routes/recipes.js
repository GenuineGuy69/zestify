const express = require('express');
const router = express.Router();

// Mock data for API response until DB is connected
const MOCK_RECIPES = [
    {
        id: "uuid-1234",
        title: "Avocado & Egg Toast",
        description: "A perfect protein-packed start to your vibrant morning.",
        calories: 340,
        difficulty: "easy"
    }
];

// GET /api/recipes
router.get('/', (req, res) => {
    res.json(MOCK_RECIPES);
});

// GET /api/recipes/:id
router.get('/:id', (req, res) => {
    const recipe = MOCK_RECIPES.find(r => r.id === req.params.id);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

module.exports = router;
