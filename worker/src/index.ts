import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { Bindings, Variables } from './bindings';
import auth from './routes/auth';
import recipes from './routes/recipes';
import ai from './routes/ai';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());

// Routes
app.route('/api/auth', auth);
app.route('/api/recipes', recipes);
app.route('/api/ai', ai);

app.get('/api/health', (c) => {
    return c.json({ status: 'ok', message: 'Nutrient Cloudflare Worker API is running' });
});

export default app;
