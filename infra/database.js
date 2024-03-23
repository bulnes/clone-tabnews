import { Client } from "pg";

async function query(querySQL) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    });
    
    let result;
    
    try {
      await client.connect();
      result = await client.query(querySQL);
    } catch(_unused) {
      result = undefined;
    } finally {
      await client.end();
    }

    return result;
}

export default {
    query
}