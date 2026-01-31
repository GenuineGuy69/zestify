
import { Hono } from 'hono';
import { Bindings, Variables } from '../bindings';
import { authMiddleware } from '../middleware/auth';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// GET /api/recipes - Get all recipes (limit for now)
app.get('/', async (c) => {
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM recipes ORDER BY created_at DESC LIMIT 50').all();

        // Parse JSON fields
        const recipes = results.map((r: any) => ({
            ...r,
            dietary_tags: r.dietary_tags ? JSON.parse(r.dietary_tags) : []
        }));

        return c.json(recipes);
    } catch (error) {
        return c.json({ message: 'Error fetching recipes' }, 500);
    }
});

// GET /api/recipes/:id
app.get('/:id', async (c) => {
    const id = c.req.param('id');
    try {
        const recipe: any = await c.env.DB.prepare('SELECT * FROM recipes WHERE id = ?').bind(id).first();

        if (!recipe) {
            return c.json({ message: 'Recipe not found' }, 404);
        }

        recipe.dietary_tags = recipe.dietary_tags ? JSON.parse(recipe.dietary_tags) : [];

        // Fetch ingredients and instructions
        const { results: ingredients } = await c.env.DB.prepare('SELECT * FROM recipe_ingredients WHERE recipe_id = ? ORDER BY order_index').bind(id).all();
        const { results: instructions } = await c.env.DB.prepare('SELECT * FROM recipe_instructions WHERE recipe_id = ? ORDER BY step_number').bind(id).all();

        return c.json({
            ...recipe,
            ingredients,
            instructions
        });

    } catch (error) {
        return c.json({ message: 'Error fetching recipe' }, 500);
    }
});

// POST /api/recipes - Create recipe (Protected)
app.post('/', authMiddleware, async (c) => {
    try {
        const body: any = await c.req.json();
        const user = c.get('user');

        const id = crypto.randomUUID();
        const now = Math.floor(Date.now() / 1000);

        const {
            title, description, prep_time, cook_time, servings, difficulty,
            calories, ingredients, instructions, dietary_tags, cuisine_type, meal_type,
            protein, carbs, fats
        } = body;

        // Start transaction (D1 supports batching, or we do sequential inserts)
        // Inserting recipe
        await c.env.DB.prepare(`
      INSERT INTO recipes (
        id, title, description, image_url, prep_time, cook_time, total_time, servings, difficulty,
        cuisine_type, meal_type, dietary_tags, calories, protein, carbs, fats, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
            id, title, description, body.image_url || 'https://placehold.co/600x400',
            prep_time, cook_time, (prep_time || 0) + (cook_time || 0), servings, difficulty,
            cuisine_type, meal_type, JSON.stringify(dietary_tags || []), calories, protein, carbs, fats, user.id, now, now
        ).run();

        // Insert Ingredients
        if (ingredients && Array.isArray(ingredients)) {
            const stmt = c.env.DB.prepare(`
        INSERT INTO recipe_ingredients (id, recipe_id, name, quantity, unit, display_text)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
            const batch = ingredients.map((ing: any, idx) => stmt.bind(
                crypto.randomUUID(), id, ing.name || 'Unknown', ing.quantity || 0, ing.unit || '', `${ing.quantity} ${ing.unit} ${ing.name}`
            ));
            await c.env.DB.batch(batch);
        }

        // Insert Instructions
        if (instructions && Array.isArray(instructions)) {
            const stmt = c.env.DB.prepare(`
        INSERT INTO recipe_instructions (id, recipe_id, step_number, instruction)
        VALUES (?, ?, ?, ?)
      `);
            // Instructions can be array of strings or objects. Assuming strings from AI, or objects if detailed.
            // AI response usually strings.
            const batch = instructions.map((inst: any, idx) => {
                const text = typeof inst === 'string' ? inst : inst.instruction;
                return stmt.bind(crypto.randomUUID(), id, idx + 1, text);
            });
            await c.env.DB.batch(batch);
        }

        return c.json({ message: 'Recipe created', id }, 201);
    } catch (error) {
        console.error('Create Recipe Error:', error);
        return c.json({ message: 'Failed to create recipe' }, 500);
    }
});

export default app;
