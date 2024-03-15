import { Client } from "pg";

async function query(querySQL) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    });
    await client.connect();

    const result = await client.query(querySQL);
    await client.end();

    return result;
}

export default {
    query
}