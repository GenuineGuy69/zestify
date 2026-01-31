export type Bindings = {
    DB: D1Database;
    GEMINI_API_KEY: string;
    JWT_SECRET: string;
};

export type Variables = {
    user?: {
        id: string;
        email: string;
    };
};
