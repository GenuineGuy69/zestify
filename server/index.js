const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Nutrient API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
