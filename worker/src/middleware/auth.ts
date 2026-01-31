
import { Hono } from 'hono';
import { Variables } from '../bindings';
import { jwtVerify } from 'jose';

export const authMiddleware = async (c: any, next: any) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        return c.json({ message: 'No token provided' }, 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return c.json({ message: 'Invalid token format' }, 401);
    }

    try {
        const secret = new TextEncoder().encode(c.env.JWT_SECRET || 'zestify_secret_key_123');
        const { payload } = await jwtVerify(token, secret);
        c.set('user', { id: payload.id as string, email: payload.email as string });
        await next();
    } catch (err) {
        return c.json({ message: 'Invalid token' }, 401);
    }
};
