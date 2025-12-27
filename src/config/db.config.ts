import postgres from 'postgres';

const DATABASE_URL = Bun.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/hono';

const sql = postgres(DATABASE_URL, {
    max: 10,                   // Max number of connections in the pool
    idle_timeout: 20,          // Idle connection timeout in seconds
    connect_timeout: 10,       // Connect timeout in seconds
})

export default sql;