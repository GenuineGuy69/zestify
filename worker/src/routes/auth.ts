
import { Hono } from 'hono';
import { Bindings } from '../bindings';
import { hash, compare } from 'bcryptjs';
import { SignJWT } from 'jose';

const app = new Hono<{ Bindings: Bindings }>();

// Register
app.post('/register', async (c) => {
    const { email, password, firstName, lastName } = await c.req.json();

    if (!email || !password) {
        return c.json({ message: 'Email and password are required' }, 400);
    }

    try {
        // Check if user exists
        const existingUser = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
        if (existingUser) {
            return c.json({ message: 'User already exists' }, 400);
        }

        // Hash password
        const passwordHash = await hash(password, 10);
        const id = crypto.randomUUID();
        const now = Math.floor(Date.now() / 1000);

        // Insert user
        await c.env.DB.prepare(
            'INSERT INTO users (id, email, password_hash, first_name, last_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, email, passwordHash, firstName, lastName, now, now).run();

        // Create Token
        const secret = new TextEncoder().encode(c.env.JWT_SECRET || 'zestify_secret_key_123');
        const token = await new SignJWT({ id, email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(secret);

        return c.json({
            token,
            user: {
                id,
                email,
                firstName,
                lastName
            }
        }, 201);

    } catch (error) {
        console.error('Register error:', error);
        return c.json({ message: 'Server error' }, 500);
    }
});

// Login
app.post('/login', async (c) => {
    const { email, password } = await c.req.json();

    try {
        const user: any = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();

        if (!user) {
            return c.json({ message: 'Invalid credentials' }, 400);
        }

        const isMatch = await compare(password, user.password_hash);
        if (!isMatch) {
            return c.json({ message: 'Invalid credentials' }, 400);
        }

        const secret = new TextEncoder().encode(c.env.JWT_SECRET || 'zestify_secret_key_123');
        const token = await new SignJWT({ id: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(secret);

        return c.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return c.json({ message: 'Server error' }, 500);
    }
});

export default app;
